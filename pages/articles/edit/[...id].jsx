import Layout from "@/pages/components/Layout";
import ArticleForm from "@/pages/components/ArticleForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
    const [article, setArticle] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (!id) return;
        axios.get("/api/articles?id=" + id).then((res) => {
            setArticle(res.data);
        });
    }, [id]);
    return (
        <Layout>
            <h3 className="text-xl">Editar Articulo</h3>
            {article && <ArticleForm {...article} />}
        </Layout>
    );
}
