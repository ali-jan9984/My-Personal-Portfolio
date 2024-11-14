'use client';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounceCallback } from 'usehooks-ts';
import axios, { AxiosError } from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Page = () => {
  const [userName, setUserName] = useState("");
  const [userNameMessage, setUserNameMessage] = useState("");
  const [isCheckingUserName, setIsCheckingUserName] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const debounceUser = useDebounceCallback(setUserName, 500);
  const { toast } = useToast();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/sign-up`, data);
      setIsSubmitting(false);
      toast({
        title: "Success",
        description: response.data.message
      });
      router.replace(`/verify/${data.userName}`);
    } catch (error) {
      const errorMessage = axios.isAxiosError(error) ? error.response?.data.message || "Something went wrong" : "Unexpected error occurred";
      toast({
        title: "Sign-up failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Create Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium">Username</label>
            <input
              {...register("userName", { required: "Username is required", minLength: 3 })}
              value={userName}
              onChange={(e) => debounceUser(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg ${errors.userName ? 'border-red-500' : 'border-gray-300'}`}
              type="text"
            />
            {isCheckingUserName ? <p className="text-blue-600">Checking...</p> : <p className="text-sm text-gray-600">{userNameMessage}</p>}
            {errors.userName && <p className="text-sm text-red-500">{errors.userName.message as string}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
              className={`w-full px-4 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              type="email"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message as string}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                className={`w-full px-4 py-2 border rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password.message as string}</p>}
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-semibold rounded-lg transition duration-300 ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex justify-center items-center space-x-2">
                <span className="loader inline-block w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"></span>
                <span>Signing up...</span>
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
