import { UseFormRegister, FieldErrors } from "react-hook-form";

export interface InputFieldProps<TFormSchema extends Record<string, any>> {
  id: string;
  name: keyof TFormSchema;
  type: string;
  label: string;
  register: UseFormRegister<TFormSchema>;
  errors: FieldErrors<TFormSchema>;
}