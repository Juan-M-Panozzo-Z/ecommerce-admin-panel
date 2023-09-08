import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/pages/components/Layout";
import OrderForm from "@/pages/components/OrderForm";

export default function OrderPage() {
    const [order, setOrder] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (!id) return;
        axios.get("/api/orders?id=" + id).then((res) => {
            setOrder(res.data);
        });
    }, [id]);

    console.log(order);
    return (
        <Layout>
            <div className="flex flex-row justify-between items-center">
                <h3 className="text-xl">Orden de compra</h3>
            </div>
            {order && (
                <section className="">
                    <OrderForm {...order} />
                </section>
            )}
        </Layout>
    );
}
