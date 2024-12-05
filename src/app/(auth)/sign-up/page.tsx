'use client';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounceCallback } from 'usehooks-ts';
import axios, { AxiosError } from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SignUpPage = () => {
  const [userName, setUserName] = useState("");
  const [userNameMessage, setUserNameMessage] = useState("");
  const [isCheckingUserName, setIsCheckingUserName] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const debounceUser = useDebounceCallback(setUserName, 500);
  const { toast } = useToast();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  useEffect(() => {
    const checkUserName = async () => {
      if (userName) {
        setIsCheckingUserName(true);
        setUserNameMessage("");
        try {
          const response = await axios.get(`/api/check-username?username=${userName}`);
          setUserNameMessage(response.data.message || "Username is available");
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
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.push(`/sign-in`);
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data.message || "Something went wrong"
        : "Unexpected error occurred";
      toast({
        title: "Sign-up failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">Sign Up</h1>
        <p className="text-center text-gray-600 mb-6">Create an account to get started</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block font-medium text-gray-700">Username</label>
            <input
              {...register("username", { required: "Username is required", minLength: 3 })}
              value={userName}
              onChange={(e) => debounceUser(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md ${errors.username ? "border-red-500" : "border-gray-300"}`}
            />
            <p className={`text-sm ${isCheckingUserName ? "text-blue-600" : "text-gray-500"}`}>
              {isCheckingUserName ? "Checking availability..." : userNameMessage}
            </p>
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
              })}
              type="email"
              className={`w-full px-4 py-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                type={showPassword ? "text" : "password"}
                className={`w-full px-4 py-2 border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"}`}
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-semibold rounded-lg ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <span className="loader inline-block w-5 h-5 border-2 border-t-transparent rounded-full animate-spin mr-2"></span>
                Signing Up...
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

