/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ReactSortable } from "react-sortablejs";
import Link from "next/link";

const Label = ({ ...props }) => {
    return (
        <label>
            <span className="label-text">{props.title}</span>
            <input
                type="text"
                placeholder={props.placeholder}
                className="input input-bordered w-full"
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </label>
    );
};

export default function ArticleForm({
    _id,
    DESCRIPCION: existingDESCRIPCION,
    COD_ART: existingCOD_ART,
    EAN: existingEAN,
    MOD: existingMOD,
    MED: existingMED,
    URL_ARCHIVO: existingURL_ARCHIVO,
    images: existingImages,
}) {
    const [DESCRIPCION, setDESCRIPCION] = useState(existingDESCRIPCION || "");
    const [COD_ART, setCOD_ART] = useState(existingCOD_ART || "");
    const [EAN, setEAN] = useState(existingEAN || "");
    const [MOD, setMOD] = useState(existingMOD || "");
    const [MED, setMED] = useState(existingMED || "");
    const [URL_ARCHIVO, setURL_ARCHIVO] = useState(existingURL_ARCHIVO || "");
    const [images, setImages] = useState(existingImages || []);
    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();

    async function saveProduct(e) {
        e.preventDefault();
        const data = {
            DESCRIPCION,
            COD_ART,
            EAN,
            MOD,
            MED,
            URL_ARCHIVO,
            images,
        };
        if (_id) {
            await axios.put("/api/articles", { ...data, _id });
        } else {
            await axios.post("/api/articles", data);
        }
        setGoToProducts(true);
    }
    if (goToProducts) {
        router.push("/articles");
    }
    const uploadPhotos = async (e) => {
        const files = e.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append("file", file);
            }
            const res = await axios.post("/api/upload", data);
            console.log(res.data.links);
            setImages((oldImages) => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    };
    const updateImagesOrder = (images) => {
        setImages(images);
    };

    const deleteImagesArray = (e) => {
        const index = e.target.value;
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    return (
        <form
            onSubmit={saveProduct}
            className="form-control flex flex-col gap-4 mt-6"
        >
            <Label
                title="Nombre del articulo"
                placeholder="Descripción"
                value={DESCRIPCION}
                onChange={setDESCRIPCION}
            />
            <Label
                title="Codigo del articulo"
                placeholder="Codigo"
                value={COD_ART}
                onChange={setCOD_ART}
            />
            <Label
                title="EAN"
                placeholder="EAN"
                value={EAN}
                onChange={setEAN}
            />
            <Label
                title="Modelo"
                placeholder="Modelo"
                value={MOD}
                onChange={setMOD}
            />
            <Label
                title="Medida"
                placeholder="Medida"
                value={MED}
                onChange={setMED}
            />
            <Label
                title="URL del archivo"
                placeholder="URL"
                value={URL_ARCHIVO}
                onChange={setURL_ARCHIVO}
            />
            <label className="flex flex-col gap-4">
                <div>
                    <span className="label-text">Foto(s)</span>
                </div>
                <label className="btn btn-secondary mx-auto btn-lg">
                    {!isUploading ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                            />
                        </svg>
                    ) : (
                        <span className="loading loading-spinner loading-md text-neutral"></span>
                    )}
                    <input
                        type="file"
                        onChange={uploadPhotos}
                        accept="image/*"
                        className="hidden"
                        multiple
                    />
                </label>
            </label>
            <ReactSortable
                list={images}
                className="mt-4 flex flex-wrap gap-4 justify-center items-center md:justify-start"
                setList={updateImagesOrder}
            >
                {!!images?.length &&
                    images.map((link, index) => (
                        <div key={link} className="indicator">
                            <button
                                type="button"
                                value={index}
                                onClick={deleteImagesArray}
                                className="indicator-item badge text-white badge-primary"
                            >
                                X
                            </button>
                            <img
                                width={200}
                                height={200}
                                src={link}
                                alt={link}
                                className=" object-cover rounded-box aspect-square"
                            />
                        </div>
                    ))}
            </ReactSortable>
            <div
            className="grid md:grid-cols-2 gap-4"
            >
                <button
                    type="submit"
                    className="btn btn-primary text-white"
                >
                    Guardar
                </button>
                <Link href="/articles">
                    <button className="btn btn-secondary w-full">Volver atrás</button>
                </Link>
            </div>
        </form>
    );
}
