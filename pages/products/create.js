import Layout from "../components/Layout";
import ProductForm from "../components/ProductForm";

export default function Create() {
    return (
        <Layout>
            <h3 className="text-xl">Nuevo producto</h3>
            <ProductForm />
        </Layout>
    );
}
