export interface User {
  id: string;
  name: string;
  email: string;
  role: "client" | "admin";
  createdAt: Date;
}

export type UserFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
