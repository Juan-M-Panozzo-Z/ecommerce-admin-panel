import Layout from "@/pages/components/Layout";
import ProductForm from "@/pages/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
    const [product, setProduct] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (!id) return;
        axios.get("/api/products?id=" + id).then((res) => {
            setProduct(res.data);
        });
    }, [id]);
    return (
        <Layout>
            <h3 className="text-xl">Editar producto</h3>
            {product && <ProductForm {...product} />}
        </Layout>
    );
}
