import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import log from "loglevel";
import Layout from "@/components/layouts/Layout";
import RegisterForm from "@/components/forms/RegisterForm";

// Define the password validation regex
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/; // At least one uppercase and one special character

const formSchema = z.object({
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
});

type FormSchemaType = z.infer<typeof formSchema>;

const RegisterUser = () => {
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
    <Layout maxWidth="56rem">
      <RegisterForm
        control={control}
        errors={errors}
        clearErrors={clearErrors}
        handleSubmit={handleSubmit(onSubmit)}
      />
    </Layout>
  );
};

export default RegisterUser;
