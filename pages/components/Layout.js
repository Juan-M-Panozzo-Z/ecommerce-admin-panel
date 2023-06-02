import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "./Nav";

export default function Layout({children}) {
    const { data: session } = useSession();
    if (!session) {
        return (
            <div className="min-h-screen bg-base-100 text-primary flex justify-center items-center">
                <button onClick={() => signIn("google")} className="btn">
                    Login with Google
                </button>
            </div>
        );
    }
    return (
        <div className="mt-20 container mx-auto">
            <Nav>
            <button className="flex-grow m-2 text-left">
                {children}
            </button>
            </Nav>
        </div>
    );
}
