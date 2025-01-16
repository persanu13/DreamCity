"use server";

import { sql } from "@vercel/postgres";

import { News, NewsTable } from "../definitions";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";

const ITEMS_PER_PAGE = 6;

export type State = {
  message?: string | null;
  errors?: {
    [key: string]: string[];
  };
};

const FormSchema = z.object({
  id: z.string(),
  name: z
    .string({ invalid_type_error: "Please enter a news title." })
    .min(1, "News title cannot be empty."),
  imgurl: z
    .string({ invalid_type_error: "Please enter an image URL" })
    .min(1, "URL cannot be empty."),
  description: z
    .string({ invalid_type_error: "Please enter a description." })
    .min(20, "Description must be longer."),
  content: z
    .string({ invalid_type_error: "Please enter content." })
    .min(20, "Content must be longer."),
  date: z.string({ invalid_type_error: "Please enter a date." }),
});

const CreateNews = FormSchema.omit({ id: true });
const UpdateNews = FormSchema.omit({ id: true });

export async function getFilteredNews(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const news = await sql<NewsTable>`
      SELECT
        news.id,
        news.name,
        news.description,
        news.content,
        news.date
      FROM news
      WHERE
        news.name ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return news.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch News.");
  }
}

export async function getNewsById(id: string) {
  try {
    const news = await sql<News>`
      SELECT
        news.id,
        news.name,
        news.imgurl,
        news.description,
        news.content,
        news.date
      FROM news
      WHERE news.id = ${id}
      LIMIT 1
    `;

    return news.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the news.");
  }
}

export async function getNewsPages(query: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM news
      WHERE
        news.name ILIKE ${`%${query}%`}
    `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of news.");
  }
}

export async function deleteNews(
  id: string,
  prevState: State
): Promise<State> {
  try {
    const result = await sql`
      DELETE FROM news 
      WHERE id = ${id}
    `;

    if (result.rowCount === 0) {
      return {
        message: "No news found.",
        errors: {},
      };
    }
    revalidatePath("/admin/news");
    return {
      message: "News deleted successfully.",
      errors: {},
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to delete news.",
      errors: {
        db: ["Failed to delete news"],
      },
    };
  }
}

export async function createNews(prevState: State, formData: FormData) {
  const validatedFields = CreateNews.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    imgurl: formData.get("imgUrl"),
    content: formData.get("content"),
    date: formData.get("date"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create News.",
    };
  }

  const { name, description, imgurl, content, date } = validatedFields.data;

  try {
    await sql`
      INSERT INTO news (name, description, imgurl, content, date)
      VALUES (${name}, ${description}, ${imgurl}, ${content}, ${date})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to add news.",
      errors: {
        db: ["An unexpected error occurred. Please try again."],
      },
    };
  }
  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function editNews(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateNews.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    imgurl: formData.get("imgUrl"),
    content: formData.get("content"),
    date: formData.get("date"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update news.",
    };
  }

  const { name, description, imgurl, content, date } = validatedFields.data;

  try {
    const result = await sql`
      UPDATE news
      SET 
        name = ${name},
        description = ${description},
        imgurl = ${imgurl},
        content = ${content},
        date = ${date}
      WHERE id = ${id}
    `;

    if (result.rowCount === 0) {
      return {
        message: "News not found. Update failed.",
        errors: {},
      };
    }
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to update news.",
      errors: {
        db: ["An unexpected error occurred. Please try again."],
      },
    };
  }

  revalidatePath("/admin/news");
  redirect("/admin/news");
}
