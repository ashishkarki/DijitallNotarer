import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import log from "loglevel";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import FormFieldBuilder from "@/components/forms/FormFieldBuilder";

// Define the password validation regex
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/; // At least one uppercase and one special character

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase letter and one special character",
      ),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters")
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase letter and one special character",
      ),
    dob: z.string().min(1, "Date of Birth is required"),
    citizenship: z.string().min(1, "Citizenship is required"),
    passportNumber: z.string().min(1, "Passport Number is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: `Passwords don't match`,
    path: ["confirmPassword"], // where will the mismatch error be shown
  });

// Define the form types based on the schema
type FormSchemaType = z.infer<typeof formSchema>;

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      dob: "",
      citizenship: "",
      passportNumber: "",
    },
  });

  const onSubmit = (data: FormSchemaType) => {
    if (data.password !== data.confirmPassword) {
      log.warn("Passwords don't match!!!");
      return;
    }

    log.info(`Form data: ${JSON.stringify(data)}`);
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.800"
    >
      <Box
        as="form"
        bg="white"
        p={8}
        rounded="lg"
        shadow="md"
        w="full"
        maxW="lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading as="h1" size="lg" mb={6}>
          Registration Page
        </Heading>

        {/* Use a VStack for consistent spacing between fields */}
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

        {/* Chakra UI Button */}
        <Button type="submit" colorScheme="blue" size="lg" width="full" mt={6}>
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
