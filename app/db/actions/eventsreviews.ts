"use server";

import { sql } from '@vercel/postgres';
import { EventReview } from '@/app/db/definitions';
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
  event_id: z.string().uuid(),
  rating: z.number().min(1).max(5),
  content: z.string().min(1, "Review content cannot be empty"),
});

export async function getReviewsByEventId(eventId: string): Promise<EventReview[]> {
  try {
    const result = await sql<EventReview>`
      SELECT er.*, u.name as user_name
      FROM event_reviews er
      JOIN users u ON er.user_id = u.id
      WHERE er.event_id = ${eventId};
    `;
    return result.rows;
  } catch (error) {
    console.error('Failed to fetch event reviews:', error);
    throw new Error('Failed to fetch event reviews.');
  }
}

export async function deleteEventReview(
  reviewId: string,
  prevState: State
): Promise<State> {
  try {
    const result = await sql`
      DELETE FROM event_reviews
      WHERE id = ${reviewId}
    `;

    if (result.rowCount === 0) {
      return {
        message: "No review found.",
        errors: {},
      };
    }

    // Optional revalidation and redirect
    revalidatePath(`/user/events/${reviewId}`);

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

export async function createEventReview(prevState: any, formData: FormData) {
  // Validate form data
  const validatedFields = CreateReviewSchema.safeParse({
    user_id: formData.get("user_id"),
    event_id: formData.get("event_id"),
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
  const { user_id, event_id, rating, content } = validatedFields.data;

  // Insert into the database
  try {
    await sql`
      INSERT INTO event_reviews (user_id, event_id, rating, content)
      VALUES (${user_id}, ${event_id}, ${rating}, ${content})
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
