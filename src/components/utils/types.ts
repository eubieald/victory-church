import { FieldError, UseFormRegister } from "react-hook-form";

export type HeroProps = {
  element?: React.ReactNode;
};

export type MenuItem = {
  id: string;
  title: string;
  link?: string | null;
  subItems?: MenuItem[];
};

// types.ts
export type FormData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames =
  | "email"
  | "confirmPassword"
  | "username"
  | "password";