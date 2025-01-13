"use server";

import { sql } from "@vercel/postgres";

import { UsersTable } from "../definitions";
import { revalidatePath } from "next/cache";

export type State = {
  message: string | null;
  errors: {
    [key: string]: string[];
  };
};

const ITEMS_PER_PAGE = 6;

export async function getFilteredUsers(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const users = await sql<UsersTable>`
      SELECT
        users.id,
        users.name,
        users.email,
        users.type
      FROM users
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return users.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users.");
  }
}

export async function getUsersPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM users
    WHERE
      users.name ILIKE ${`%${query}%`} OR
      users.email ILIKE ${`%${query}%`}
  `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function deleteUsers(
  id: string,
  prevState: State
): Promise<State> {
  try {
    console.log(id);
    const result = await sql`
      DELETE FROM users 
      WHERE id = ${id} AND type = 'user'
    `;

    if (result.rowCount === 0) {
      return {
        message: "No user found or user is not of type 'user'.",
        errors: {},
      };
    }
    revalidatePath("/admin/users");
    return {
      message: "User deleted successfully.",
      errors: {},
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to delete user.",
      errors: {
        db: ["Failed to delete user"],
      },
    };
  }
}
