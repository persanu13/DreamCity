"use server";

import { sql } from "@vercel/postgres";

import { Attraction, AttractionTable } from "../definitions";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";

export type State = {
  message?: string | null;
  errors?: {
    [key: string]: string[];
  };
};

const ITEMS_PER_PAGE = 6;

const AttractionFormSchema = z.object({
  id: z.string(),
  name: z
    .string({ invalid_type_error: "Please enter an attraction name." })
    .min(1, "Attraction name cannot be empty."),
  imgurl: z
    .string({ invalid_type_error: "Please enter an URL" })
    .min(1, "URL cannot be empty."),
  description: z
    .string({ invalid_type_error: "Please enter a description." })
    .min(20, "Description must be longer."),
  content: z
    .string({ invalid_type_error: "Please enter content." })
    .min(20, "Content must be longer."),
});

const CreateAttraction = AttractionFormSchema.omit({ id: true });

const UpdateAttraction = AttractionFormSchema.omit({ id: true });

export async function getFilteredAttractions(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const attractions = await sql<AttractionTable>`
      SELECT
        attractions.id,
        attractions.name,
        attractions.description,
        attractions.imgUrl
      FROM attractions
      WHERE
        attractions.name ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return attractions.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Attractions.");
  }
}

export async function getAttractionById(id: string) {
  try {
    const attraction = await sql<Attraction>`
      SELECT
        attractions.id,
        attractions.name,
        attractions.imgUrl,
        attractions.description,
        attractions.content
      FROM attractions
      WHERE attractions.id = ${id}
      LIMIT 1
    `;

    return attraction.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the attraction.");
  }
}

export async function getAttractionsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
      FROM attractions
      WHERE
        attractions.name ILIKE ${`%${query}%`}
    `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of attractions.");
  }
}

export async function deleteAttractions(
  id: string,
  prevState: State
): Promise<State> {
  try {
    const result = await sql`
      DELETE FROM attractions 
      WHERE id = ${id}
    `;

    if (result.rowCount === 0) {
      return {
        message: "No attraction found.",
        errors: {},
      };
    }
    revalidatePath("/admin/attractions");
    return {
      message: "Attraction deleted successfully.",
      errors: {},
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to delete attraction.",
      errors: {
        db: ["Failed to delete attraction"],
      },
    };
  }
}

export async function createAttraction(prevState: State, formData: FormData) {
  const validatedFields = CreateAttraction.safeParse({
    name: formData.get("name"),
    imgurl: formData.get("imgurl"),
    description: formData.get("description"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Attraction.",
    };
  }

  const { name, description, imgurl, content } = validatedFields.data;

  try {
    await sql`
      INSERT INTO attractions (name, description, imgUrl, content)
      VALUES (${name}, ${description}, ${imgurl}, ${content})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to add an attraction.",
      errors: {
        db: ["An unexpected error occurred. Please try again."],
      },
    };
  }
  revalidatePath("/admin/attractions");
  redirect("/admin/attractions");
}

export async function editAttraction(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateAttraction.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    imgurl: formData.get("imgUrl"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update attraction.",
    };
  }

  const { name, description, imgurl, content } = validatedFields.data;

  try {
    const result = await sql`
      UPDATE attractions
      SET 
        name = ${name},
        description = ${description},
        imgurl = ${imgurl},
        content = ${content}
      WHERE id = ${id}
    `;

    if (result.rowCount === 0) {
      return {
        message: "Attraction not found. Update failed.",
        errors: {},
      };
    }
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to update the attraction.",
      errors: {
        db: ["An unexpected error occurred. Please try again."],
      },
    };
  }

  revalidatePath("/admin/attractions");
  redirect("/admin/attractions");
}
