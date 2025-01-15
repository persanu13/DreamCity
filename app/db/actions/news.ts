"use server";

import { sql } from "@vercel/postgres";

import { NewsTable } from "../definitions";
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

  export async function getFilteredNews(query: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
    try {
      const news = await sql<NewsTable>`
        SELECT
          news.id,
          news.name,
          news.description,
          news.content
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
  
  export async function getNewsPages(query: string) {
    try {
      const count = await sql`SELECT COUNT(*)
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