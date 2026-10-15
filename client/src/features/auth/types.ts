export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: string;
}

export type UserInput = Omit<User, "_id" | "createdAt">;

export type Credentials = Pick<User, "email" | "password">;
