import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="flex pl-10 gap-10 items-center h-20 bg-blue-700 shadow-md">
            <Link to="/home">
                <button>
                    <p className="font-['Freeman'] text-white font-bold text-2xl">SneakStore.</p>
                </button>
                </Link>
            <ul className="flex gap-6 items-center text-white">
                <Link to='home'><li className="text-lg font-medium">Home</li></Link>
                <Link to='shop'><li className="text-lg font-medium">Shop</li></Link>
                <Link to='cart'><li className="text-lg font-medium">Cart</li></Link>
            </ul>
        </nav>
    )
}