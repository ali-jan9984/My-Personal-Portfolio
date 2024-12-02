'use client'
export const dynamic = 'force-dynamic'
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
  FormMessage 
} from "@/components/ui/form";
import Link from "next/link";
import { signIn } from "next-auth/react";

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: form.getValues('email'),
        password: form.getValues('password')
      });

      if (result?.error) {
        toast({
          title: "Login failed",
          description: result.error === "CredentialsSignin"
            ? "Incorrect email or password"
            : result.error,
          variant: "destructive"
        });
      } else if (result?.url) {
        router.replace(result.url || '/dashboard');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsSubmitting(true);
    try {
      const result = await signIn(provider, { callbackUrl: '/dashboard' });
      if (result?.error) {
        toast({
          title: "Login failed",
          description: result.error,
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Login</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Enter your credentials to access your account
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-900 dark:text-white">Email</FormLabel>
                    <FormControl>
                      <input
                        type="email"
                        placeholder="Email"
                        {...field}
                        className="input-class"
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
                    <FormLabel className="text-sm font-medium text-gray-900 dark:text-white">Password</FormLabel>
                    <FormControl>
                      <input
                        type="password"
                        placeholder="Password"
                        {...field}
                        className="input-class"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Form>

          <div className="mt-4 space-y-2">
            <Button
              onClick={() => handleSocialLogin('google')}
              className="w-full flex items-center justify-center gap-2"
            >
              <FaGoogle /> Continue with Google
            </Button>
            <Button
              onClick={() => handleSocialLogin('github')}
              className="w-full flex items-center justify-center gap-2"
            >
              <FaGithub /> Continue with GitHub
            </Button>
            <Button
              onClick={() => handleSocialLogin('facebook')}
              className="w-full flex items-center justify-center gap-2"
            >
              <FaFacebook /> Continue with Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
