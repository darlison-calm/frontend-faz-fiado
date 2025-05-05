import { InputFieldProps } from "@/types/formTypes";
import { TCreateUserSchema } from "@/types/userTypes";

export default function InputField({ id, name, type, label, register, errors }: InputFieldProps<TCreateUserSchema>) {
  return (
    <div className="relative">
      <div className="relative z-0">
        <input
          {...register(name)}
          type={type}
          id={id}
          className={`block px-3 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-md border appearance-none focus:outline-none focus:ring-1 peer dark:text-white dark:border-gray-500 placeholder-transparent`}
          placeholder=" "
        />
        <label
          htmlFor={id}
          className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2'text-gray-500 peer-focus:text-blue-500'
          peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-85 peer-focus:-translate-y-4 left-1 dark:bg-gray-900 dark:text-gray-400`}
        >
          {label}
        </label>
      </div>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          <span></span> {errors[name]?.message}
        </p>
      )}
    </div>
  );
}