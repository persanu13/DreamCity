"use server";

import { sql } from "@vercel/postgres";
import { AttractionReview } from "@/app/db/definitions";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
  message?: string | null;
  errors?: {
    [key: string]: string[];
  };
};

// Define Zod schema for validation
const CreateReviewSchema = z.object({
  user_id: z.string().uuid(),
  attraction_id: z.string().uuid(),
  rating: z.number().min(1).max(5),
  content: z.string().min(1, "Review content cannot be empty"),
});

export async function getReviewsByAttractionId(
  attractionId: string
): Promise<AttractionReview[]> {
  try {
    const result = await sql<AttractionReview>`
     SELECT ar.*, u.name as user_name
     FROM attraction_reviews ar
     JOIN users u ON ar.user_id = u.id
     WHERE ar.attraction_id = ${attractionId};
    `;
    return result.rows;
  } catch (error) {
    console.error("Failed to fetch attraction reviews:", error);
    throw new Error("Failed to fetch attraction reviews.");
  }
}

export async function deleteAttractionReview(
  reviewId: string,
  prevState: State
): Promise<State> {
  try {
    const result = await sql`
      DELETE FROM attraction_reviews
      WHERE id = ${reviewId}
    `;

    if (result.rowCount === 0) {
      return {
        message: "No review found.",
        errors: {},
      };
    }

    // Optional revalidation and redirect
    revalidatePath(`/user/attractions/${reviewId}`);

    return {
      message: "Review deleted successfully.",
      errors: {},
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to delete review.",
      errors: {
        db: ["Failed to delete review"],
      },
    };
  }
}

export async function createReview(prevState: any, formData: FormData) {
  // Validate form data
  const validatedFields = CreateReviewSchema.safeParse({
    user_id: formData.get("user_id"),
    attraction_id: formData.get("attraction_id"),
    rating: Number(formData.get("rating")),
    content: formData.get("content"),
  });

  // If validation fails, return errors early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid input. Failed to create review.",
    };
  }

  // Extract validated data
  const { user_id, attraction_id, rating, content } = validatedFields.data;

  // Insert into the database
  try {
    await sql`
        INSERT INTO attraction_reviews (user_id, attraction_id, rating, content)
        VALUES (${user_id}, ${attraction_id}, ${rating}, ${content})
      `;
  } catch (error) {
    return {
      message: "Database Error: Failed to add review.",
      errors: {
        db: ["An unexpected error occurred. Please try again."],
      },
    };
  }
}
