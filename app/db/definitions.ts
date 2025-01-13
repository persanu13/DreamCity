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
