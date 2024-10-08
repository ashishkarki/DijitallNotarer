import React, { useEffect } from "react";
import { Box, Button, Heading, Spinner, VStack } from "@chakra-ui/react";
import { Control, FieldErrors } from "react-hook-form";
import { FormFieldNames } from "@/types/FormFieldNames";
import FormFieldBuilder from "@/components/forms/FormFieldBuilder";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { startLoading, stopLoading } from "@/store/uiSlice";
import log from "loglevel";

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
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);

  // TODO: Debugging only, remove later
  useEffect(() => {
    console.log(`RegisterForm, isLoading: ${isLoading}`);
  }, [isLoading]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(startLoading());

    try {
      // handleSubmit(event);
      // Simulating an async operation with a delay
      // setTimeout(() => {
      await handleSubmit(event);
      // dispatch(stopLoading());
      // }, 2000); // 2-second delay to see the spinner
    } catch (e: any) {
      log.error(`Error during Register Form submission, ${e.message}`);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <Box
      as="form"
      bg="white"
      p={8}
      rounded="lg"
      shadow="md"
      onSubmit={onSubmit}
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
          name="citizenshipNumber"
          label="Citizenship Number"
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
        {isLoading ? <Spinner /> : "Register"}
      </Button>
    </Box>
  );
};

export default RegisterForm;
