import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    HiArrowRightOnRectangle,
    HiOutlineCog6Tooth,
    HiOutlineArchiveBox,
    HiOutlineHome,
    HiOutlineInbox,
} from "react-icons/hi2";

export default function Nav({ children }) {
    const inactiveLink = "hover:bg-primary hover:text-white";
    const activeLink = "bg-primary text-white";
    const router = useRouter();
    const { pathname } = router;

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className="z-10 w-full navbar bg-base-300 top-0 left-0 fixed">
                    <div className="flex-none lg:hidden">
                        <label
                            for="my-drawer-3"
                            className="btn btn-square btn-ghost"
                        >
                            <HiOutlineHome className="w-6 h-6" />
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2">
                        Panel de administración
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal gap-2">
                            <li>
                                <Link
                                    href={"/"}
                                    className={
                                        pathname === "/"
                                            ? activeLink
                                            : inactiveLink
                                    }
                                >
                                    <HiOutlineHome className="w-6 h-6" />
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/articles"}
                                    className={
                                        pathname.includes("/articles")
                                            ? activeLink
                                            : inactiveLink
                                    }
                                >
                                    <HiOutlineArchiveBox className="w-6 h-6" />
                                    <span>Articulos</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/orders"}
                                    className={
                                        pathname.includes("/orders")
                                            ? activeLink
                                            : inactiveLink
                                    }
                                >
                                    <HiOutlineInbox className="w-6 h-6" />
                                    <span>Ordenes de compra</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/settings"}
                                    className={
                                        pathname.includes("/settings")
                                            ? activeLink
                                            : inactiveLink
                                    }
                                >
                                    <HiOutlineCog6Tooth className="w-6 h-6" />
                                    <span>Configuraciones</span>
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        signOut();
                                    }}
                                    className="btn-error"
                                >
                                    <HiArrowRightOnRectangle className="w-6 h-6" />
                                    Cerrar sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                {children}
            </div>
            <div className="drawer-side">
                <label for="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 w-60 h-full bg-base-200 gap-2 mt-16">
                    <li>
                        <Link
                            href={"/"}
                            className={
                                pathname === "/" ? activeLink : inactiveLink
                            }
                        >
                            <HiOutlineHome className="w-6 h-6" />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={"/articles"}
                            className={
                                pathname.includes("/articles")
                                    ? activeLink
                                    : inactiveLink
                            }
                        >
                            <HiOutlineArchiveBox className="w-6 h-6" />
                            <span>Articulos</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={"/orders"}
                            className={
                                pathname.includes("/orders")
                                    ? activeLink
                                    : inactiveLink
                            }
                        >
                            <HiOutlineInbox className="w-6 h-6" />
                            <span>Ordenes de compra</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={"/settings"}
                            className={
                                pathname.includes("/settings")
                                    ? activeLink
                                    : inactiveLink
                            }
                        >
                            <HiOutlineCog6Tooth className="w-6 h-6" />
                            <span>Configuraciones</span>
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                signOut();
                            }}
                            className="btn-error"
                        >
                            <HiArrowRightOnRectangle className="w-6 h-6" />
                            Cerrar sesión
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
