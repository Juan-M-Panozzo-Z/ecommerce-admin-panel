import Layout from "@/pages/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProduct() {
    const router = useRouter();
    const [product, setProduct] = useState();
    const { id } = router.query;
    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get("/api/products?id=" + id).then((res) => {
                setProduct(res.data);
            });
        }
    }, [id]);
    function goBack() {
        router.back();
    }
    async function deleteProduct() {
        await axios.delete("/api/products?id=" + id).then((res) => {
            goBack();
        });
    }
    return (
        <Layout>
            <div className="flex min-h-screen justify-center items-center cursor-default">
                <div className="flex flex-col gap-4 justify-center">
                    <h1 className="text-3xl">
                        ¿Desea eliminar <strong>{product?.title}</strong>?
                    </h1>
                    <div className=" flex gap-4 justify-center">
                        <button onClick={goBack} className="btn btn-secondary">
                            No
                        </button>
                        <button
                            onClick={deleteProduct}
                            className="btn btn-error"
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
