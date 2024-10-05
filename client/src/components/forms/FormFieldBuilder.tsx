import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

// Define the form field names type in this file
type FormFieldNames =
  | "name"
  | "email"
  | "password"
  | "confirmPassword"
  | "dob"
  | "citizenship"
  | "passportNumber";

interface FormFieldBuilderProps {
  name: FormFieldNames;
  label: string;
  type?: string;
  control: Control<any>;
  errors: FieldErrors;
  clearError: (name: FormFieldNames) => void;
}

const FormFieldBuilder: React.FC<FormFieldBuilderProps> = ({
  name,
  label,
  type = "text",
  control,
  errors,
  clearError,
}) => {
  return (
    <FormControl isInvalid={!!errors[name]} mb="4">
      <FormLabel color="gray.700">{label}</FormLabel> {/* Set label color */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            type={type}
            {...field}
            onBlur={() => clearError(name)} // Clear error on blur
            backgroundColor="white"
            borderColor="gray.300"
            focusBorderColor="blue.500"
            _hover={{ borderColor: "gray.400" }}
            color="gray.800"
          />
        )}
      />
      {errors[name] && (
        <FormErrorMessage>
          {(errors[name] as FieldError)?.message ?? "Unknown error"}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default FormFieldBuilder;
