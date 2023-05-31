import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "./Nav";

export default function Layout({children}) {
    const { data: session } = useSession();
    if (!session) {
        return (
            <div className="bg-base-100 text-primary">
                <button onClick={() => signIn("google")} className="btn">
                    Login with Google
                </button>
            </div>
        );
    }
    return (
        <div className="bg-base-100 text-primary flex gap-2 items-start">
            <Nav />
            <button className="flex-grow m-2 text-left">
                {children}
            </button>
        </div>
    );
}
