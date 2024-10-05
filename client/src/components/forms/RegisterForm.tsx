import React from "react";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { Control, FieldErrors } from "react-hook-form";
import { FormFieldNames } from "@/types/FormFieldNames";
import FormFieldBuilder from "@/components/forms/FormFieldBuilder"; // Import FormFieldNames

interface RegisterFormProps {
  control: Control<any>;
  errors: FieldErrors;
  clearErrors: (name: FormFieldNames) => void; // Updated clearErrors type to use FormFieldNames
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  control,
  errors,
  clearErrors,
  handleSubmit,
}) => {
  return (
    <Box
      as="form"
      bg="white"
      p={8}
      rounded="lg"
      shadow="md"
      onSubmit={handleSubmit}
    >
      <Heading as="h1" size="lg" mb={6} textAlign="center" color="brand.500">
        Register
      </Heading>

      <VStack spacing={4} align="stretch">
        <FormFieldBuilder
          name="name"
          label="Name"
          control={control}
          errors={errors}
          clearError={clearErrors}
        />
        <FormFieldBuilder
          name="email"
          label="Email"
          type="email"
          control={control}
          errors={errors}
          clearError={clearErrors}
        />
        <FormFieldBuilder
          name="password"
          label="Password"
          type="password"
          control={control}
          errors={errors}
          clearError={clearErrors}
        />
        <FormFieldBuilder
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          control={control}
          errors={errors}
          clearError={clearErrors}
        />
        <FormFieldBuilder
          name="dob"
          label="Date of Birth"
          type="date"
          control={control}
          errors={errors}
          clearError={clearErrors}
        />
        <FormFieldBuilder
          name="citizenship"
          label="Citizenship"
          control={control}
          errors={errors}
          clearError={clearErrors}
        />
        <FormFieldBuilder
          name="passportNumber"
          label="Passport Number"
          control={control}
          errors={errors}
          clearError={clearErrors}
        />
      </VStack>

      <Button type="submit" colorScheme="brand" size="lg" width="full" mt={6}>
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
