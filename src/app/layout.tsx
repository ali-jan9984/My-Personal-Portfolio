'use client'
import './globals.css';
import localFont from 'next/font/local';
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

// Load the custom font
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",  
  variable: "--font-geist-sans",
  weight: "100 900",
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <AuthProvider>
            {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}