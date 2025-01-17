"use server";

import { sql } from "@vercel/postgres";

import { MyEvent, MyEventTable } from "../definitions";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";
import { Comic_Neue } from "next/font/google";

export type State = {
    message?: string | null;
    errors?: {
      [key: string]: string[];
    };
  };
  
  const ITEMS_PER_PAGE = 6;

  const FormSchema = z.object({
    id: z.string(),
    name: z
      .string({ invalid_type_error: "Please enter an event name." })
      .min(1, "Event name cannot be empty."),
    imgUrl: z
      .string({ invalid_type_error: "Please enter an URL" })
      .min(1, "URL cannot be empty."),
    description: z
      .string({ invalid_type_error: "Please enter a description." })
      .min(20, "Description must be longer."),
    content: z
      .string({ invalid_type_error: "Please enter content." })
      .min(20, "Content must be longer."),
    date: z.string({invalid_type_error: "Please enter a date."})
  });
  
  const CreateEvent = FormSchema.omit({ id: true});
  
  const UpdateEvent = FormSchema.omit({ id: true});

  export async function getFilteredEventsTable(query: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
    try {
      const events = await sql<MyEventTable>`
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

  export async function getFilteredEvents(query: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
    try {
      const events = await sql<MyEvent>`
        SELECT
          events.id,
          events.name,
          events.imgurl,
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

  export async function getEventById(id: string) {
    try {
      const event = await sql<MyEvent>`
        SELECT
          events.id,
          events.name,
          events.imgurl,
          events.description,
          events.content,
          events.date
        FROM events
        WHERE events.id = ${id}
        LIMIT 1
      `;
  
      return event.rows[0];
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch the event.");
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

  export async function createEvent(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateEvent.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      imgUrl: formData.get("imgUrl"),
      content: formData.get("content"),
      date: formData.get("date")
    });
  
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Create Event.",
      };
    }
  
    // Prepare data for insertion into the database
    const  {name, description, imgUrl, content, date } = validatedFields.data;
  
    // Insert data into the database
      try {
        await sql`
          INSERT INTO events (name, description, imgUrl, content, date)
          VALUES (${name}, ${description}, ${imgUrl}, ${content}, ${date})
        `;
      } catch (error) {
        return {
          message: "Database Error: Failed to add an event.",
          errors: {
            db: ["An unexpected error occurred. Please try again."],
          },
        };
      }
      revalidatePath("/admin/events");
      redirect("/admin/events");
    }
  
    export async function editEvent( id: string, prevState: State, formData: FormData) {
      // Validate form using Zod
      const validatedFields = UpdateEvent.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        imgUrl: formData.get("imgUrl"),
        content: formData.get("content"),
        date: formData.get("date"),
      });
    
      // If form validation fails, return errors early. Otherwise, continue.
      if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: "Missing or invalid fields. Failed to update event.",
        };
      }
    
      // Prepare data for updating in the database
      const { name, description, imgUrl, content, date } = validatedFields.data;
    
      // Update the event in the database
      try {
        const result = await sql`
          UPDATE events
          SET 
            name = ${name},
            description = ${description},
            imgUrl = ${imgUrl},
            content = ${content},
            date = ${date}
          WHERE id = ${id}
        `;
    
        if (result.rowCount === 0) {
          return {
            message: "Event not found. Update failed.",
            errors: {},
          };
        }
      } catch (error) {
        console.error("Database Error:", error);
        return {
          message: "Database Error: Failed to update the event.",
          errors: {
            db: ["An unexpected error occurred. Please try again."],
          },
        };
      }
    
      revalidatePath("/admin/events");
      redirect("/admin/events");
    }
    
  