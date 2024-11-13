'use client';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation'; // Updated import for App Router
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounceCallback } from 'usehooks-ts';
import axios, { AxiosError } from 'axios';

const Page = () => {
  const [userName, setUserName] = useState("");
  const [userNameMessage, setUserNameMessage] = useState("");
  const [isCheckingUserName, setIsCheckingUserName] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounceUser = useDebounceCallback(setUserName, 500);
  const { toast } = useToast();
  const router = useRouter(); // useRouter from 'next/navigation'

  const form = useForm();

  useEffect(() => {
    const checkUserName = async () => {
      if (userName) {
        setIsCheckingUserName(true);
        setUserNameMessage("");
        try {
          const response = await axios.get(`/api/check-userName-unique?userName=${userName}`);
          setUserNameMessage(response.data.message);
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          setUserNameMessage(err.response?.data.message ?? "Something went wrong");
        } finally {
          setIsCheckingUserName(false);
        }
      }
    };
    checkUserName();
  }, [userName]);

  const onSubmit = async (data: any) => {
    const { userName } = data;
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/sign-up`, data);
      setIsSubmitting(false);
      toast({
        title: "Success",
        description: response.data.message,
        variant: "destructive",
        duration: 3000,
      });
      router.replace(`/verify/${userName}`); // Correct usage of router
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<any, { message: string }>;
        const errorMessage = err.response?.data.message || "Something went wrong";
        toast({
          title: "Sign-up failed",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        console.error("Non-Axios error", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Create Your Account</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Username</label>
            <input
              {...form.register("userName")}
              value={userName}
              onChange={(e) => debounceUser(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
            />
            {isCheckingUserName ? <p>Checking...</p> : <p>{userNameMessage}</p>}
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );  
};

export default Page;

