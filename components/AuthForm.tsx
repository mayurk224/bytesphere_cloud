"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OTPModal from "./OTPModal";
import { registerUser } from "@/utils/supabase/auth";

type FormType = "signIn" | "signUp";

const authFormSchema = (formType: FormType) =>
  z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [accountId, setAccountId] = useState<string | null>(null);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
  setLoading(true);
  setErrorMessage("");

  try {
    const response = await registerUser(values.email, values.password);
    
    if (response.success) {
      setShowOTPModal(true);
    } else {
      setErrorMessage(response.error || "Sign-up failed");
    }
  } catch (error) {
    setErrorMessage("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === "signIn" ? "Sign In" : "Sign Up"}
          </h1>

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item space-y-2">
                  <FormLabel className="shad-form-label">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Email" {...field} />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          {/* Username Field (Only for Sign Up) */}
          {type === "signUp" && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item space-y-2">
                    <FormLabel className="shad-form-label">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your Password"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="form-submit-button"
            disabled={loading}
          >
            {type === "signIn" ? "Sign In" : "Sign Up"}
            {loading && (
              <Image
                alt="loading"
                src="/assets/icons/loader.svg"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* Toggle Sign In/Sign Up */}
          <div className="body-2 flex justify-center">
            <p className="tex-light-100">
              {type === "signIn"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "signIn" ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-brand"
            >
              {type === "signIn" ? "Sign up" : "Sign in"}
            </Link>
          </div>
        </form>
      </Form>

      {/* OTP Modal (only shown when needed) */}
      {showOTPModal && (
        <OTPModal open={showOTPModal} email={form.getValues("email")} />
      )}
    </>
  );
};

export default AuthForm;
