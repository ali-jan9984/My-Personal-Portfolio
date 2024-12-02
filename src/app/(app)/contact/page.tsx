'use client';
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Sidebar } from "lucide-react";
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

  if (status === 'authenticated'){
    return (
      <div className="container">
       <Sidebar>
         hello side bar
       </Sidebar>
      </div>
     );
   }
  }
  // Authenticated users can access the contact page

