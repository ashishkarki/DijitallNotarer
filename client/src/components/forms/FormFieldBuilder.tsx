import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FormFieldNames } from "@/types/FormFieldNames";

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
      {" "}
      {/* Chakra's spacing scale (16px) */}
      <FormLabel color="brand.500">{label}</FormLabel> {/* Set label color */}
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
            focusBorderColor="brand.500"
            _hover={{ borderColor: "gray.400" }}
            color="gray.800"
          />
        )}
      />
      {errors[name] && (
        <FormErrorMessage color="danger.500">
          {(errors[name] as FieldError)?.message ?? "Unknown error"}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default FormFieldBuilder;
