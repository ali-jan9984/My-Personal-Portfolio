'use client';
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ContactPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  // Loading state while session is being fetched
  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  // Authenticated users can access the contact page
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-6">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Contact Me
      </motion.h1>
      {/* Additional contact page content */}
    </div>
  );
}
