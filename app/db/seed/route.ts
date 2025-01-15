import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { users, events, attractions, news } from "../placeholeder-data";

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('admin', 'user'))
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
      INSERT INTO users (id, name, email, password, role)
      VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role})
      ON CONFLICT (id) DO NOTHING;
    `;
    })
  );
  return insertedUsers;
}

async function seedAttractions() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS attractions (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      imgUrl TEXT NOT NULL,
      description TEXT NOT NULL,
      content TEXT NOT NULL
    );
  `;

  const insertedAttractions = await Promise.all(
    attractions.map(async (attraction) => {
      return client.sql`
      INSERT INTO attractions (id, name, imgUrl, description, content)
      VALUES (${attraction.id}, ${attraction.name}, ${attraction.imgUrl}, ${attraction.description}, ${attraction.content})
      ON CONFLICT (id) DO NOTHING;
    `;
    })
  );
  return insertedAttractions;
}

async function seedEvents() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS events (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      imgUrl TEXT NOT NULL,
      description TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT NOT NULL
    );
  `;

  const insertedEvents = await Promise.all(
    events.map(async (event) => {
      return client.sql`
      INSERT INTO events (id, name, imgUrl, description, content, date)
      VALUES (${event.id}, ${event.name}, ${event.imgUrl}, ${event.description}, ${event.content}, ${event.date})
      ON CONFLICT (id) DO NOTHING;
    `;
    })
  );
  return insertedEvents;
}

async function seedNews() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS news (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      imgUrl TEXT NOT NULL,
      description TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT NOT NULL
    );
  `;

  const insertedNews = await Promise.all(
    news.map(async (article) => {
      return client.sql`
      INSERT INTO news (id, name, imgUrl, description, content, date)
      VALUES (${article.id}, ${article.name}, ${article.imgUrl}, ${article.description}, ${article.content}, ${article.date})
      ON CONFLICT (id) DO NOTHING;
    `;
    })
  );
  return insertedNews;
}


export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedEvents();
    await seedAttractions();
    await seedNews();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
