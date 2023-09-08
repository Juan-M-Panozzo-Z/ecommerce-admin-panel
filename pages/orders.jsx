import Layout from "./components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";

const LoadingTd = () => (
    <td className="animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-full"></div>
    </td>
);

const LoadingTr = () => <tr>{Array(10).fill(<LoadingTd />)}</tr>;

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const fetchOrders = async (searchTerm = "") => {
        try {
            await axios
                .get(`/api/orders?page=${currentPage}&search=${searchTerm}`)
                .then((response) => {
                    setOrders(response.data.orders);
                    setTotalPages(response.data.totalPages);
                });
        } catch (error) {
            console.error("Error al obtener las ordenes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchOrders(searchTerm);
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
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
                                handleSearch(e.target.value);
                            }
                        }}
                    />
                    <button
                        className="btn btn-primary text-white"
                        onClick={() => handleSearch(searchTerm)}
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
                                        <th>DNI</th>
                                        <th>CUIT / CUIL</th>
                                        <th>Nombre del comprador</th>
                                        <th>Correo</th>
                                        <th>Fecha de compra</th>
                                        <th>Metodo de pago</th>
                                        <th>Estado</th>
                                        <th>Total</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <>{Array(10).fill(<LoadingTr />)}</>
                                    ) : (
                                        <>
                                            {orders.length > 0 &&
                                                orders.map((order) => (
                                                    <tr key={order._id}>
                                                        <td>{order._id}</td>
                                                        <td>{order.dni}</td>
                                                        <td>{order.cuit}</td>
                                                        <td className="capitalize">
                                                            {order.name}
                                                        </td>
                                                        <td>{order.email}</td>
                                                        <td>
                                                            {
                                                                order.createdAt.split(
                                                                    "T"
                                                                )[0]
                                                            }
                                                        </td>
                                                        <td className="capitalize">
                                                            {
                                                                order.selectedPaymentMethod
                                                            }
                                                        </td>
                                                        <td>{order.status}</td>
                                                        <td>
                                                            {`$ ${order.total}`}
                                                        </td>
                                                        <td>
                                                            <Link
                                                                href={`orders/${order._id}`}
                                                            >
                                                                <button className="btn btn-sm btn-secondary text-white">
                                                                    <HiOutlineArrowTopRightOnSquare />
                                                                    Ver más
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
                </div>
                <div className="join grid grid-cols-2">
                    <button
                        onClick={prevPage}
                        className="join-item btn btn-secondary text-white"
                        disabled={currentPage === 1}
                    >
                        Pagina anterior
                    </button>
                    <button
                        onClick={nextPage}
                        className="join-item btn btn-primary text-white"
                        disabled={currentPage === totalPages}
                    >
                        Pagina siguiente
                    </button>
                </div>
            </section>
        </Layout>
    );
}
