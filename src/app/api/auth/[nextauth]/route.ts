import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import userModel from "@/models/user.model";
import { User } from "next-auth";
import { MongoClient } from "mongodb";

if(!process.env.MONGODB_URI){
  throw new Error("MONGODB_URI is not defined");
}
const client = new MongoClient(process.env.MONGODB_URI || "",{
  serverSelectionTimeoutMS: 30000,
});
const clientPromise = client.connect();

// Define the NextAuth configuration
export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
       authorize: async function(credentials,req): Promise<User> {
        await dbConnect();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password are required");
        }

        const user = await userModel.findOne({ email: credentials.email });

        if (
          !user ||
          !user.password ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user._id?.toString() || "",
          email: user.email,
          userName: user.userName,
        };
      },
    }),
    GithubProvider({
      clientId: "Ov23liU0oIm7wfXe32E2",
      clientSecret:"d73015154c6a7a58ce6ed800ca65fcad90dd6eee",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || "",
      clientSecret: process.env.FACEBOOK_SECRET || "",
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST || "",
        port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
        auth: {
          user: process.env.EMAIL_SERVER_USER || "",
          pass: process.env.EMAIL_SERVER_PASSWORD || "",
        },
      },
      from: process.env.EMAIL_FROM || "",
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          _id: token._id || "",
          name: token.name,
          isVerified: token.isVerified,
          email: token.email,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id; // Ensure you use `id` here from the `authorize` return object
        token.name = user.name;
        token.isVerified = user.isVerified || false;
        token.email = user.email;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "",
};

// Wrap the NextAuth function to handle HTTP requests
const handler = NextAuth(AuthOptions);

export const POST = handler;
export const GET = handler; // Required for `GET` requests to NextAuth endpoints


