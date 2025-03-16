"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

type FormType = "signIn" | "signUp";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    username:
      formType === "signUp" ? z.string().min(2).max(50) : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === "signIn" ? "Sign In" : "Sign Up"}
          </h1>
          {type === "signUp" && (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item space-y-2">
                    <FormLabel className="shad-form-label">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Username" {...field} />
                    </FormControl>
                  </div>

                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}

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
    </>
  );
};

export default AuthForm;
