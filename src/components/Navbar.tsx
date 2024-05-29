import { Link } from "react-router-dom";
import { Product } from "../types";
import { useState } from "react";

export default function Navbar({ cartItems }: { cartItems: Product[] }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="flex flex-col md:flex-row items-center bg-blue-700 shadow-md">
            <div className="flex w-full lg:w-fit md:w-fit justify-between items-center px-4 md:px-10 py-4">
                <Link to="/home">
                    <button>
                        <p className="font-['Freeman'] text-white font-bold text-2xl">
                            SneakStore.
                        </p>
                    </button>
                </Link>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div
                className={`${isMenuOpen ? "block" : "hidden"
                    } md:flex md:items-center md:w-auto w-full text-white`}
            >
                <ul className="md:flex md:gap-12 md:items-center md:justify-end md:text-white md:w-full md:pr-10 text-center">
                    <Link to="home">
                        <li className="text-lg font-medium text-white py-2 md:py-0">Home</li>
                    </Link>
                    <Link to="shop">
                        <li className="text-lg font-medium text-white py-2 md:py-0">Shop</li>
                    </Link>
                    <Link to="cart">
                        <li className="text-lg lg:rounded-lg md:rounded-lg h-fit font-medium bg-red-600 p-2">
                            <p>Cart Items: {cartItems.length}</p>
                        </li>
                    </Link>
                </ul>
            </div>
        </nav>
    );
}