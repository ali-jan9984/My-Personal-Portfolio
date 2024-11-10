import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from 'bcryptjs';
import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user.model";
import EmailProvider from "next-auth/providers/email";

export const AuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials:any): Promise<any> {
                await dbConnect();

                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await userModel.findOne({ email: credentials.email });

                if (!user || !user.password || !(await bcrypt.compare(credentials.password, user.password))) {
                    throw new Error('Invalid email or password');
                }

                return { 
                    _id: user._id, 
                    email: user.email, 
                    name: user.name, 
                    isVerified: user.isVerified, 
                    expires: '' 
                };
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID || '',
            clientSecret: process.env.FACEBOOK_SECRET || '',
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST || '',
                port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
                auth: {
                    user: process.env.EMAIL_SERVER_USER || '',
                    pass: process.env.EMAIL_SERVER_PASSWORD || '',
                },
            },
            from: process.env.EMAIL_FROM || '',
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user = {
                    _id: token._id,
                    name: token.userName,
                    isVerified: token.isVerified,
                    email: token.email,
                } as {
                    _id: string;
                    name: string;
                    isVerified: boolean;
                    email: string;
                };
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token._id = user.id;
                token.name = user.name;
                token.isVerified = user.isVerified;
                token.email = user.email;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(AuthOptions);
