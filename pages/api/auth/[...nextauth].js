import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// .env
const adminEmails = ['jmpz.94@gmai.com', 'sistemas@rigelec.com.ar']

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        session: ({ session, token, profile }) => {
            if (
                session?.user?.email &&
                adminEmails.includes(session.user.email)
            ) {
                return session;
            } else {
                return false;
            }
        },
    },
});
