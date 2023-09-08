/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const LoadingTd = () => (
    <td className="animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-full"></div>
    </td>
);

const LoadingTr = () => <tr>{Array(6).fill(<LoadingTd />)}</tr>;

export default function articles() {
    const [searchTerm, setSearchTerm] = useState("");
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticles(currentPage);
    }, [currentPage]);

    const fetchArticles = async (page, searchTerm = "") => {
        try {
            const response = await axios.get(
                `/api/articles?page=${page}&search=${searchTerm}`
            );
            setArticles(response.data.articles);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error al obtener los artículos:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchArticles(currentPage, searchTerm);
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        fetchArticles(currentPage + 1, searchTerm);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
        fetchArticles(currentPage - 1, searchTerm);
    };

    return (
        <Layout>
            <section className="space-y-4">
                <div className="flex flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Buscar artículo..."
                        className="input input-bordered w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyUpCapture={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />
                    <button
                        className="btn btn-primary text-white"
                        onClick={() => handleSearch()}
                    >
                        Buscar
                    </button>
                </div>

                <div>
                    <div className="container mx-auto">
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Codigo de artículo</th>
                                        <th>Descripción</th>
                                        <th>Modelo</th>
                                        <th>EAN</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <>{Array(10).fill(<LoadingTr />)}</>
                                    ) : (
                                        <>
                                            {articles.map((article, index) => (
                                                <tr key={index}>
                                                    <td>{article._id}</td>
                                                    <td>{article.COD_ART}</td>
                                                    <td>
                                                        {article.DESCRIPCION}
                                                    </td>
                                                    <td>{article.MOD}</td>
                                                    <td>{article.EAN}</td>
                                                    <td>
                                                        {" "}
                                                        <Link
                                                            href={`articles/edit/${article._id}`}
                                                        >
                                                            <button className="btn btn-sm btn-primary text-white">
                                                                <HiPencilAlt />
                                                            </button>
                                                        </Link>{" "}
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="join grid grid-cols-2">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="join-item btn btn-secondary text-white"
                        >
                            Pagina anterior
                        </button>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="join-item btn btn-primary text-white"
                        >
                            Pagina siguiente
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
