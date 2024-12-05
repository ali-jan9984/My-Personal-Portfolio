'use client';
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { signIn } from "next-auth/react";

const Page = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: form.getValues("email"),
        password: form.getValues("password"),
      });

      if (result?.error) {
        toast({
          title: "Login failed",
          description:
            result.error === "CredentialsSignin"
              ? "Incorrect email or password"
              : result.error,
          variant: "destructive",
        });
      } else if (result?.url) {
        const router = useRouter();
        router.replace(result.url || "/dashboard");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsSubmitting(true);
    try {
      const result = await signIn(provider, { callbackUrl: "/dashboard" });
      if (result?.error) {
        toast({
          title: "Login failed",
          description: result.error,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg transform transition-all hover:scale-105">
        <div className="space-y-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Welcome Back!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Sign in to your account to continue
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 text-left"
            >
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password
                    </FormLabel>
                    <FormControl>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                {isSubmitting ? "Logging in..." : "Sign In"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 space-y-2">
            <Button
              onClick={() => signIn("google")}
              className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
            >
              <FaGoogle /> Continue with Google
            </Button>
            <Button
              onClick={() => signIn("github")}
              className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition"
            >
              <FaGithub /> Continue with GitHub
            </Button>
            <Button
              onClick={() => handleSocialLogin("facebook")}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <FaFacebook /> Continue with Facebook
            </Button>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
            Don't have an account?{" "}
            <Link href="/sign-up">
              <Button variant="link" className="text-purple-600 hover:underline">
                Sign up
              </Button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
