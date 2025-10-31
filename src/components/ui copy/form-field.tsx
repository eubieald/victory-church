import { FieldError, UseFormRegister } from 'react-hook-form';

interface FormFieldProps {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
}

const FormField: React.FC<FormFieldProps> = ({ type, placeholder, name, register, error }) => {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full p-3 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {error && (
        <p className="mt-1 text-red-500 text-sm">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormField;
