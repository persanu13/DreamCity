"use server";

import { sql } from "@vercel/postgres";

import { EventTable } from "../definitions";
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

  export async function getFilteredEvents(query: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
    try {
      const events = await sql<EventTable>`
        SELECT
          events.id,
          events.name,
          events.description,
          events.content,
          events.date
        FROM events
        WHERE
          events.name ILIKE ${`%${query}%`}
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      return events.rows;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch Events.");
    }
  }
  
  export async function getEventsPages(query: string) {
    try {
      const count = await sql`SELECT COUNT(*)
      FROM events
      WHERE
        events.name ILIKE ${`%${query}%`}
    `;
      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch total number of events.");
    }
  }

  export async function deleteEvents(
    id: string,
    prevState: State
  ): Promise<State> {
    try {
      const result = await sql`
        DELETE FROM events 
        WHERE id = ${id}
      `;
  
      if (result.rowCount === 0) {
        return {
          message: "No event found.",
          errors: {},
        };
      }
      revalidatePath("/admin/events");
      return {
        message: "Event deleted successfully.",
        errors: {},
      };
    } catch (error) {
      console.error("Database Error:", error);
      return {
        message: "Database Error: Failed to delete event.",
        errors: {
          db: ["Failed to delete event"],
        },
      };
    }
  }
  