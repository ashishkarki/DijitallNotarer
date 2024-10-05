import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
    <FormField
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Controller
              name={name}
              control={control}
              render={({ field }) => <Input type={type} {...field} />}
            />
          </FormControl>

          {errors[name] && (
            <FormMessage>
              {(errors[name] as FieldError)?.message ?? "Unknown error!!!"}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};

export default FormFieldBuilder;
