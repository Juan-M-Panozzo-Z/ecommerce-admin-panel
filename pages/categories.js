import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";

export default function Categories() {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        axios.get("/api/categories").then((res) => {
            setCategories(res.data);
        });
    }

    async function saveCategory(e) {
        e.preventDefault();
        await axios.post("/api/categories", { name });
        setName("");
        fetchCategories();
    }
    return (
        <Layout>
            <form onSubmit={saveCategory} className="form-control mt-4">
                <label className="label">
                    <span className="label-text text-2xl">Nueva categoria</span>
                </label>
                <label className="flex flex-col items-stretch md:flex-row gap-1 justify-center">
                    <input
                        type="text"
                        placeholder="Ingresar nombre de la categoria"
                        className="input input-bordered"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {/* select */}
                    <select className="select select-bordered w-full md:max-w-xs">
                        <option disabled selected>
                            Categoria padre
                        </option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                    </select>
                    <button type="submit" className="btn btn-primary">
                        Crear
                    </button>
                </label>
            </form>
            <hr className="my-4" />
            <div className="overflow-x-auto mt-4 border-2 rounded-box">
                <table className="table cursor-default">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th className="text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 &&
                            categories.map((category) => (
                                <tr key={category._id}>
                                    <td className="text-lg capitalize">
                                        {category.name}
                                    </td>
                                    <td className="flex justify-end gap-1">
                                        <button className="btn btn-sm btn-secondary">
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
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                />
                                            </svg>
                                            Editar
                                        </button>
                                        <button className="btn btn-sm btn-error">
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
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
