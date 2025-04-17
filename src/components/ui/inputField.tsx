import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormFields } from "@/app/signup/registerForm"

interface InputFieldProps {
  id: string;
  name: keyof FormFields;
  type: string;
  label: string;
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
}

export default function InputField({ id, name, type, label, register, errors }: InputFieldProps) {
    return (
      <div className="space-y-1">
        <label
          htmlFor={id}
          className="block text-sm text-black-500 font-semibold"
        >
          {label}
        </label>
        <input
          {...register(name)}
          type={type}
          id={id}
          className="block px-2 py-2 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors[name] && (
          <p className="text-sm text-red-600">
            {errors[name]?.message}
          </p>
        )}
      </div>
    );
}