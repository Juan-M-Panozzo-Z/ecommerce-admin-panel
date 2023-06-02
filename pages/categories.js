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
            <h3 className="text-xl">Categorías</h3>
            <form onSubmit={saveCategory} className="form-control mt-4">
                <label className="label">
                    <span className="label-text">Nueva categoria</span>
                </label>
                <label className="input-group">
                    <input
                        type="text"
                        placeholder="Ingresar nombre de la categoria"
                        className="input input-bordered"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button type="submit" className="btn btn-primary">
                        Crear
                    </button>
                </label>
            </form>
            <div className="overflow-x-auto mt-4 border-2 rounded-box">
                <table className="table">
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
                                            Editar
                                        </button>
                                        <button className="btn btn-sm btn-error">
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
