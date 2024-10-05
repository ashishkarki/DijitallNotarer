import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import log from "loglevel";
import FormFieldBuilder from "@/components/forms/FormFieldBuilder";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z
    .string()
    .min(8, "Confirm Password must be at least 8 characters"),
  dob: z.string().min(1, "Date of Birth is required"),
  citizenship: z.string().min(1, "Citizenship is required"),
  passportNumber: z.string().min(1, "Passport Number is required"),
});

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    if (data.password !== data.confirmPassword) {
      log.warn("Passwords don't match!!!");
      return;
    }

    log.info(`Form data: ${JSON.stringify(data)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold mb-6">Registration Page</h1>

        {/* Reuse the cleaned-up FormFieldBuilder */}
        <FormFieldBuilder
          name="name"
          label="Name"
          control={control}
          errors={errors}
        />
        <FormFieldBuilder
          name="email"
          label="Email"
          type="email"
          control={control}
          errors={errors}
        />
        <FormFieldBuilder
          name="password"
          label="Password"
          type="password"
          control={control}
          errors={errors}
        />
        <FormFieldBuilder
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          control={control}
          errors={errors}
        />
        <FormFieldBuilder
          name="dob"
          label="Date of Birth"
          type="date"
          control={control}
          errors={errors}
        />
        <FormFieldBuilder
          name="citizenship"
          label="Citizenship"
          control={control}
          errors={errors}
        />
        <FormFieldBuilder
          name="passportNumber"
          label="Passport Number"
          control={control}
          errors={errors}
        />

        {/*  Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
