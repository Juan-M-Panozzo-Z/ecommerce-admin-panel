/* eslint-disable @next/next/no-img-element */
import Layout from "./components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
    return (
        <Layout>
            <div className="flex justify-between items-center cursor-default">
                <h1 className="text-2xl">
                    Hola, {useSession().data?.user?.name}
                </h1>
                <img
                    className="mask mask-squircle h-20"
                    src={useSession().data?.user?.image}
                    alt="Picture of the author"
                />
            </div>
        </Layout>
    );
}
