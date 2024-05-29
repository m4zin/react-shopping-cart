import { Link } from "react-router-dom"
import { Product } from "../types"

export default function Navbar({ cartItems }: { cartItems: Product[] }) {

    return (
        <nav className="flex pl-10 items-center h-[10%] bg-blue-700 shadow-md">
            <Link to="/home">
                <button>
                    <p className="font-['Freeman'] text-white font-bold text-2xl">SneakStore.</p>
                </button>
            </Link>
            <ul className="flex gap-12 items-center justify-end text-white w-full pr-10">
                <Link to='home'><li className="text-lg font-medium">Home</li></Link>
                <Link to='shop'><li className="text-lg font-medium">Shop</li></Link>
                <Link to='cart'>
                    <li className="text-lg font-medium bg-red-600 p-2 rounded-lg">
                        <p>Cart Items: {cartItems.length}</p>
                    </li>
                </Link>
            </ul>
        </nav>
    )
}