import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

import { useState } from "react";
import { Link } from "react-router";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUpNewUser() {
    console.log("signUpNewUser pressed");

    const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isSubmitting },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
      setUsername(data?.username);
      setEmail(data.email);
      setPassword(data.password);

      signUpNewUser();
    };

    // console.log(watch("example")); // watch input value by passing the name of it

    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-200">
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 w-96 p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                {...register("username", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-100 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.username && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
            </div>

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
                  This field is required
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
                {...register("password", { required: true, minLength: 6 })}
                className="mt-1 block w-full px-4 py-2 border border-gray-100 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.password && (
                <span className="text-red-600 text-sm">
                  Password must be at least 6 characters long
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
                {isSubmitting ? "submitting" : "Sign Up"}
              </button>
            </div>
          </form>
          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    );
  }
}
