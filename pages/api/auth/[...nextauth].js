import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "password",
                },
            },
            authorize(credentials) {
                if (
                    credentials.email === "admin@rigelec.com.ar" &&
                    credentials.password === "admin"
                ) {
                    return { email: "admin@rigelec.com.ar", name: "Admin" };
                } else {
                    return null;
                }
            },
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    }
});
