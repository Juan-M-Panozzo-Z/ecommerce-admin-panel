import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images,
}) {
    const [title, setTitle] = useState(existingTitle || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [price, setPrice] = useState(existingPrice || "");
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();

    async function saveProduct(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            price,
        };
        if (_id) {
            await axios.put("/api/products", { ...data, _id });
        } else {
            await axios.post("/api/products", data);
        }
        setGoToProducts(true);
    }
    if (goToProducts) {
        router.push("/products");
    }
    async function uploadPhotos(e) {
        const files = e.target?.files;
        if (files?.length > 0) {
            console.log("files", files);
            const data = new FormData();
            for (const file of files) {
                data.append("file", file);
            }
            const res = await axios.post("/api/upload", data);
            console.log(res.data);
        }
    }
    return (
        <form
            onSubmit={saveProduct}
            className="form-control flex flex-col gap-4 mt-6"
        >
            <label>
                <span className="label-text">Nombre del articulo</span>
                <input
                    type="text"
                    placeholder="Product name"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label>
                <span className="label-text">Descripción</span>
                <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Desctiption"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </label>
            <label className="flex flex-col gap-4">
                <div>
                    <span className="label-text">Foto(s)</span>
                </div>
                <label className="btn btn-secondary mx-auto btn-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                        />
                    </svg>
                    <input
                        type="file"
                        onChange={uploadPhotos}
                        accept="image/*"
                        className="hidden"
                        multiple
                    />
                </label>
                {!images?.length && (
                    <div className="w-full">
                        <span>No se encuentran fotos en este articulo</span>
                    </div>
                )}
            </label>
            <label>
                <span className="label-text">Precio</span>
                <input
                    type="number"
                    placeholder="Price"
                    className="input input-bordered w-full"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </label>
            <button
                type="submit"
                className="btn btn-primary btn-xs sm:btn-sm md:btn-md"
            >
                Save
            </button>
        </form>
    );
}
