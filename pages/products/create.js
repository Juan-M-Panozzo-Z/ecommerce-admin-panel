import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Create() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();


    async function createProduct(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            price
        }
        await axios.post("/api/products", data)
        setGoToProducts(true);
    }
    if (goToProducts) {
        router.push("/products")
    }
    return (
        <Layout>
            <form onSubmit={createProduct} className="flex flex-col gap-4">
                <h3 className="text-xl">Nuevo producto</h3>
                <input
                    type="text"
                    placeholder="Product name"
                    className="input input-bordered input-primary w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="textarea textarea-primary textarea-bordered w-full"
                    placeholder="Desctiption"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <input
                    type="number"
                    placeholder="Price"
                    className="input input-bordered input-primary w-full"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </Layout>
    );
}
