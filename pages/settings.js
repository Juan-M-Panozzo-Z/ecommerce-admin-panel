import Layout from "./components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Settings() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get("/api/marquee?active=true")
            .then(({ data }) => {
                const { message } = data;
                setMessage(message);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/api/marquee", { message })
            .then(({ data }) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Layout>
            <div className="container mx-auto">
                <h1 className="text-2xl">Configurar Mensaje en marquesina</h1>
                <div className="flex flex-col p-10">
                        <div className=" flex flex-col justify-center gap-4 md:flex-row md:items-center">
                            <input
                                className="input input-bordered w-full"
                                type="text"
                                placeholder="Mensaje"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button 
                            onClick={handleSubmit}
                            className="btn btn-primary">Guardar</button>
                        </div>
                </div>
            </div>
        </Layout>
    );
}
