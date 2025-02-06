"use server";

import { sql } from "@vercel/postgres";

import { UsersTable } from "../definitions";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";

export type State = {
  message?: string | null;
  errors?: {
    [key: string]: string[];
  };
};

const ITEMS_PER_PAGE = 6;

const RegisterSchema = z
  .object({
    name: z
      .string({ invalid_type_error: "Please enter a username." })
      .min(1, "Username cannot be empty."), // Validare pentru string gol
    email: z
      .string({ invalid_type_error: "Please enter an email." })
      .min(1, "Email cannot be empty.")
      .email("Please enter a valid email."),
    // Validare pentru string gol
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.") // Lungime minimă
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.") // Cel puțin o literă mare
      .regex(/[0-9]/, "Password must contain at least one number.") // Cel puțin o cifră
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character."
      ), // Cel puțin un simbol special
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export async function registerUser(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.rows.length > 0) {
      return {
        message: "Registration failed",
        errors: {
          email: ["User with this email already exists"],
        },
      };
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Insert new user
    await sql`
      INSERT INTO users (name, email, password, role)
      VALUES (${name}, ${email}, ${hashedPassword}, 'user')
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to register user.",
      errors: {
        db: ["An unexpected error occurred. Please try again."],
      },
    };
  }
  revalidatePath("/admin/users");
  redirect("/login");
}

export async function getUserId(
  name: string,
  email: string
): Promise<string | null> {
  try {
    const result = await sql<{ id: string }>`
      SELECT id FROM users WHERE name = ${name} AND email = ${email} LIMIT 1
    `;

    if (result.rows.length === 0) {
      return null; // Return null if no user is found
    }

    return result.rows[0].id; // Return the user ID
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user ID.");
  }
}

export async function getFilteredUsers(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const users = await sql<UsersTable>`
      SELECT
        users.id,
        users.name,
        users.email,
        users.role
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
    throw new Error("Failed to fetch total number of users.");
  }
}

export async function deleteUsers(
  id: string,
  prevState: State
): Promise<State> {
  try {
    const result = await sql`
      DELETE FROM users 
      WHERE id = ${id} AND role = 'user'
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
