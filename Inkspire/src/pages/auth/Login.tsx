import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import { Auth } from "@supabase/auth-ui-react";
import supabase from "../../config/supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Link, Router, useNavigate } from "react-router";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type Inputs = z.infer<typeof schema>;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // async function signInUser() {
  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email: email,
  //     password: password,
  //   });
  //   console.log(data, error);
  // }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { data: supabaseData, error: supabaseError } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (supabaseError) {
        // Handle specific Supabase errors here
        if (supabaseError.message.includes("Invalid email")) {
          setError("email", {
            type: "error",
            message: supabaseError.message,
          });
        } else if (supabaseError.message.includes("Incorrect password")) {
          setError("password", {
            type: "error",
            message: "Incorrect password",
          });
        } else {
          setError("root", {
            message: supabaseError.message,
          });
        }
      } else {
        navigate("/");
        console.log(data);
        console.log("data and error:", supabaseData, supabaseError);
      }
    } catch (error) {
      // Handle other unexpected errors
      setError("root", {
        message: "An unexpected error occurred",
      });
    }
  };

  // try {
  //   const { data: supabaseData, error: supabaseError } =
  //     await supabase.auth.signInWithPassword({
  //       email: data.email,
  //       password: data.password,
  //     });
  //   throw new Error();

  //   console.log(supabaseData, data);
  // } catch (error) {
  //   setError("root", {
  //     message:
  //       error instanceof Error ? error.message : "An unknown error occurred",
  //   });
  // }
  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">
      <div className="bg-white shadow-sm rounded-lg border border-gray-100 w-96 p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Sign In
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username Input */}

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="mt-1 block w-full px-4 py-2 border border-gray-100 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <span className="text-red-600 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
              className="mt-1 block w-full px-4 py-2 border border-gray-100 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <span className="text-red-600 text-sm">
                Password must be at least 8 characters long
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? (
                <Spinner
                  color="warning"
                  aria-label="Warning spinner example"
                  size="md"
                />
              ) : (
                "Sign In"
              )}
            </button>
            {errors.root && (
              <span className="text-red-600 text-sm">
                {errors?.root.message}
              </span>
            )}
          </div>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          <Link to="/login" className="text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </p>
        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account yet?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
