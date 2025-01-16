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
