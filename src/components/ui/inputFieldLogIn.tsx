import { InputFieldProps } from "@/types/formTypes";
import { TAuthUSer} from "@/users/types/userTypes";


export default function InputField({ id, name, type, label, register, errors }: InputFieldProps<TAuthUSer>) {
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
          className="block px-2 py-2 w-full text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors[name] && (
          <p className="text-sm text-red-600">
            {errors[name]?.message}
          </p>
        )}
      </div>
    );
}