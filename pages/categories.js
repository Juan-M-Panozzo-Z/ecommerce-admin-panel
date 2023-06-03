import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
    const [editedCategory, setEditedCategory] = useState(null);
    const [name, setName] = useState("");
    const [parentCategory, setParentCategory] = useState("");
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
        const data = { name, parentCategory };
        if (editedCategory) {
            data._id = editedCategory._id;
            await axios.put("/api/categories", data);
            setEditedCategory(null);
        } else {
            await axios.post("/api/categories", data);
        }
        setName("");
        fetchCategories();
    }

    async function editCategory(category) {
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
    }

    async function deleteCategory(category) {
        swal.fire({
            title: `¿Deseas eliminar la categoría ${category.name}?`,
            text: "Esta acción no puede deshacerse",
            icon: "warning",
            showCancelButton: true,
            CancelButtonText: "Cancelar",
            confirmButtonText: "Eliminar",
            confirmButtonColor: "#dc2626",
            reverseButtons: true,
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const { _id } = category;
                    await axios.delete(`/api/categories?_id=${_id}`);
                    fetchCategories();
                }
            })
            .catch((error) => {
                // when promise rejected...
            });
    }

    return (
        <Layout>
            <form onSubmit={saveCategory} className="form-control mt-4">
                <label className="label">
                    <span className="label-text text-2xl">
                        {editedCategory
                            ? "Editar categoria"
                            : "Crear categoria"}
                    </span>
                </label>
                <label className="flex flex-col items-stretch md:flex-row gap-1 justify-center">
                    <input
                        type="text"
                        placeholder={
                            editedCategory ? editedCategory.name : "Nombre"
                        }
                        className="input input-bordered"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <select
                        value={parentCategory}
                        onChange={(e) => setParentCategory(e.target.value)}
                        className="select select-bordered w-full md:max-w-xs"
                    >
                        <option value={null}>Sin categoria padre</option>
                        {categories.length > 0 &&
                            categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
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
                            <th>Padre</th>
                            <th className="text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 &&
                            categories.map((category) => (
                                <tr key={category._id}>
                                    <td className="md:text-lg capitalize">
                                        {category.name}
                                    </td>
                                    <td className="md:text-lg capitalize">
                                        {category.parent
                                            ? category.parent.name
                                            : "Sin categoria padre"}
                                    </td>
                                    <td className="flex justify-end gap-1">
                                        <button
                                            onClick={() => {
                                                editCategory(category);
                                            }}
                                            className="btn btn-xs sm:btn-sm md:btn-md btn-secondary"
                                        >
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
                                        </button>
                                        <button
                                            onClick={() =>
                                                deleteCategory(category)
                                            }
                                            className="btn btn-xs sm:btn-sm md:btn-md btn-error"
                                        >
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

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
