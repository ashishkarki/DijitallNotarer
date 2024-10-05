import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import React from "react";

interface FormFieldBuilderProps {
  name: string;
  label: string;
  type?: string;
  control: Control<any>;
  errors: FieldErrors;
}

const FormFieldBuilder: React.FC<FormFieldBuilderProps> = ({
  name,
  label,
  type = "text",
  control,
  errors,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type={type}
            {...field}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        )}
      />
      {errors[name] && (
        <p className="text-red-600 text-sm">
          {(errors[name] as FieldError)?.message ?? "Unknown error"}
        </p>
      )}
    </div>
  );
};

export default FormFieldBuilder;
