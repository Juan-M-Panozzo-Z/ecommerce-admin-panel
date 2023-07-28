export default function Order({ ...props }) {
    return (
        <div className="md:col-span-1 card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title font-normal capitalize">
                    <span className="font-semibold">Comprador</span>{" "}
                    {props.name || "Anónimo"}
                </h2>
                <hr className="card-line" />
                <div className="flex flex-col gap-2">
                    <span>
                        Fecha de compra:{" "}
                        {new Date(props.createdAt).toLocaleDateString()}
                    </span>
                    <span>
                        Estado del pago:
                        {props.paid ? (
                            <span className="text-green-500"> Pagado</span>
                        ) : (
                            <span className="text-red-500"> Pendiente</span>
                        )}
                    </span>
                    <span>Total orden de compra: ${props.total}</span>
                    <span className="italic text-sm">ID: {props._id}</span>
                </div>
            </div>
        </div>
    );
}
