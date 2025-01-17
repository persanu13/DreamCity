export type MyUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

export type UsersTable = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

export type MyEvent = {
  id: string;
  name: string;
  imgurl: string;
  description: string;
  content: string;
  date: string;
  reviews?: EventReview[]; // Relationship to EventReview
};

export type MyEventTable = {
  id: string;
  name: string;
  description: string;
  date: string;
};

export type Attraction = {
  id: string;
  name: string;
  imgurl: string;
  description: string;
  content: string;
  reviews?: AttractionReview[]; // Relationship to AttractionReview
};

export type AttractionTable = {
  id: string;
  name: string;
  description: string;
};

export type News = {
  id: string;
  name: string;
  imgurl: string;
  description: string;
  content: string;
  date: string;
};

export type NewsTable = {
  id: string;
  name: string;
  description: string;
  date: string;
};

export type EventReview = {
  id: string;
  user_id: string;
  event_id: string;
  rating: number;
  content: string;
  user_name?: { name: string };
};

export type AttractionReview = {
  id: string;
  user_id: string;
  attraction_id: string;
  rating: number;
  content: string;
  user_name?: { name: string };
};