import { FormFieldProps } from "~/lib/types";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-lg bg-slate-200 p-3 text-slate-700 hover:bg-slate-300 hover:ring-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
      {...register(name, { valueAsNumber })}
    />
    {error && (
      <span className="error-message text-sm text-red-500">
        {error.message}
      </span>
    )}
  </>
);
export default FormField;
