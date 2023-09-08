import Link from "next/link";

const FormControl = ({ label, type, value }) => (
    <div className="form-control">
        <label className="label">
            <span className="label-text">{label}</span>
        </label>
        <input
            type={type}
            placeholder={label}
            className="input input-bordered"
            value={value}
        />
    </div>
);

export const OrderForm = ({ ...order }) => (
    <section className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
            <FormControl
                label="Nombre"
                type="text"
                value={order.name}
                className={"capitalize"}
            />
            <FormControl label="DNI" type="text" value={order.dni} />
            <FormControl label="CUIT" type="text" value={order.cuit} />
            <FormControl label="Email" type="text" value={order.email} />
            <FormControl
                label="Metodo de pago"
                type="text"
                value={order.selectedPaymentMethod}
            />
            <FormControl label="Estado" type="text" value={order.status} />
            <FormControl label="Total" type="text" value={`$ ${order.total}`} />
        </div>
        <div className="flex flex-row justify-between items-center">
            <Link href={`/orders`}>
                <button className="btn btn-secondary text-white">Volver</button>
            </Link>
        </div>
    </section>
);
