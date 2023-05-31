import Layout from "./components/Layout";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
    return (
        <Layout>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl">
                    Hola, {useSession().data?.user?.name}
                </h1>
                <img
                    className="rounded-full w-10 h-10"
                    src={useSession().data?.user?.image}
                    alt="Picture of the author"
                />
            </div>
        </Layout>
    );
}
