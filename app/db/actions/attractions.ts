"use server";

import { sql } from "@vercel/postgres";

import { AttractionTable } from "../definitions";
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

  export async function getFilteredAttractions(query: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
    try {
      const attractions = await sql<AttractionTable>`
        SELECT
          attractions.id,
          attractions.name,
          attractions.description,
          attractions.content
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