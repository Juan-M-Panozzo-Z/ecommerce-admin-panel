import Layout from "./components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import Order from "./components/Order";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/api/orders")
            .then((res) => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <Layout>
            <section className="grid md:grid-cols-3 gap-4">
            {loading ? (
                <span>Loading...</span>
            ) : (
                orders.map((order) => (
                    <Order key={order._id} {...order} />
                ))
            )}
            </section>
        </Layout>
    );
}
