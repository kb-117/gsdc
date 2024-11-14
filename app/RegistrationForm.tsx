"use client";

import { CallOutError, ErrorMessage, Spinner } from "@/app/components";
import Input from "@/app/components/Input";
import { Button } from "@radix-ui/themes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const userRegistrationSchema = z.object({
  name: z.string().min(3, "Name is required and must be above 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
});

type UserRegistrationData = z.infer<typeof userRegistrationSchema>;

const UserRegistration = () => {
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
    setValue,
    reset,
  } = useForm<UserRegistrationData>({
    resolver: zodResolver(userRegistrationSchema),
  });

  const onSubmit: SubmitHandler<UserRegistrationData> = async (data) => {
    try {
      const response = await axios.post("/api/register", data);

      if (response.data.error) {
        setError("email", { message: response.data.error });
        return;
      }

      reset();
      router.push("/api/auth/signin");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        setError("root", {
          message: "Something went wrong. Please try again.",
        });
      }
    }
  };

  return (
    <div className="max-w-xl">
      {<CallOutError>{errors.root?.message}</CallOutError>}
      <h1 className="text-xl font-bold m-4">Register New User</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          name="name"
          label="Full Name"
          setValue={setValue}
          control={control}
        />
        <Input
          name="email"
          label="Email"
          setValue={setValue}
          control={control}
        />
        {<ErrorMessage>{errors.email?.message}</ErrorMessage>}

        <Input
          name="password"
          label="Password"
          setValue={setValue}
          control={control}
        />
        {<ErrorMessage>{errors.password?.message}</ErrorMessage>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              Registering <Spinner />
            </>
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </div>
  );
};

export default UserRegistration;
