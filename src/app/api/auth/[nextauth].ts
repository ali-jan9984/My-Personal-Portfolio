import NextAuth, { NextAuthOptions } from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user.model";
import Email from "next-auth/providers/email";

export const AuthOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            Credentials:{
                name:"name",
                email:'email',
                password:'password',
            }
        })
    ]
}
