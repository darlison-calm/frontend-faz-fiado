import { UseFormRegister, FieldErrors } from "react-hook-form";


interface BaseFormSchema {
  [key: string]: string 
}

export interface InputFieldProps<TFormSchema extends BaseFormSchema> {
  id: string;
  name: keyof TFormSchema;
  type: string;
  label: string;
  register: UseFormRegister<TFormSchema>;
  errors: FieldErrors<TFormSchema>;
}