import axios from "axios";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Link from "next/link";

export default function products() {
    useEffect(async () => {
        await axios.get('/api/products').then(response => {
            console.log(response.data)
        })
    }, [])
    return (
        <Layout>
            <Link href={"/products/create"} className="btn btn-primary">
                Create Product
            </Link>
        </Layout>
    );
}
