import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import Nav from "./Nav";

export default function Layout({ children }) {
    const { data: session } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(false);
        signIn("credentials", {
            email,
            password,
            callbackUrl: `${window.location.origin}`,
        });
    };

    if (!session) {
        return (
            <main className="min-h-screen grid place-items-center cursor-default">
                <form className="p-4 flex flex-col gap-4 md:w-1/3 mx-auto rounded-box shadow-lg">
                    <div className="form-control w-full">
                        <div className="label">
                            <span for="email" className="label-text">
                                Email
                            </span>
                        </div>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            type="email"
                            placeholder="correo@correo.com"
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control w-full">
                        <div className="label">
                            <span className="label-text" for="password">
                                Contraseña
                            </span>
                        </div>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            type="password"
                            placeholder="********"
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={handleSubmit}
                            className="btn btn-md btn-primary text-white"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <span>Iniciar sesión</span>
                            )}
                        </button>
                    </div>
                </form>
            </main>
        );
    }
    return (
        <div className="mt-20 container mx-auto">
            <Nav>
                <button className="flex-grow m-2 text-left">{children}</button>
            </Nav>
        </div>
    );
}
