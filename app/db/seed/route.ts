import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { users, events, attractions, news, attractionsReviews, eventsReviews } from "../placeholeder-data";

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
async function seedAttractionsReviews() {
  // Create the attractions_reviews table
  await client.sql`
    CREATE TABLE IF NOT EXISTS attraction_reviews (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,  -- Changed to user_id
      attraction_id UUID NOT NULL,  -- Changed to attraction_id
      rating INTEGER NOT NULL,
      content TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),  -- Updated foreign key to user_id
      FOREIGN KEY (attraction_id) REFERENCES attractions(id)  -- Updated foreign key to attraction_id
    );
  `;

  // Insert the reviews into the attractions_reviews table
  const insertedAttractionsReviews = await Promise.all(
    attractionsReviews.map(async (review) => {
      return client.sql`
        INSERT INTO attraction_reviews (id, user_id, attraction_id, rating, content)
        VALUES (${review.id}, ${review.user_id}, ${review.attraction_id}, ${review.rating}, ${review.content})
        ON CONFLICT (id) DO NOTHING;  -- Prevent inserting duplicates
      `;
    })
  );

  return insertedAttractionsReviews;
}

async function seedEventsReviews() {
  // Create the event_reviews table
  await client.sql`
    CREATE TABLE IF NOT EXISTS event_reviews (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      event_id UUID NOT NULL,
      rating INTEGER NOT NULL,
      content TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (event_id) REFERENCES events(id)
    );
  `;

  // Insert the reviews into the event_reviews table
  const insertedEventsReviews = await Promise.all(
    eventsReviews.map(async (review) => {
      return client.sql`
        INSERT INTO event_reviews (id, user_id, event_id, rating, content)
        VALUES (${review.id}, ${review.user_id}, ${review.event_id}, ${review.rating}, ${review.content})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedEventsReviews;
}


async function seedEvents() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS events (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      imgurl TEXT NOT NULL,
      description TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT NOT NULL
    );
  `;

  const insertedEvents = await Promise.all(
    events.map(async (event) => {
      return client.sql`
      INSERT INTO events (id, name, imgurl, description, content, date)
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
    await seedEventsReviews();
    await seedAttractions();
    await seedAttractionsReviews()
    await seedNews();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
