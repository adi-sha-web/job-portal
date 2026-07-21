import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/db";
import User from "@/models/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                await connectDB();

                console.log("Credentials:", credentials);

                const user = await User.findOne({
                    email: credentials.email,
                });

                console.log("User Found:", user);

                if (!user) {
                    throw new Error("User not found");
                }

                const isMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                console.log("Password Match:", isMatch);

                if (!isMatch) {
                    throw new Error("Password is incorrect");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }

            return token;
        },

        async session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;

            return session;
        },
    },

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },
});