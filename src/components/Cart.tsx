import { useOutletContext } from "react-router-dom"
import { ContextType, objArray } from "../types";

function ItemInCart({ title, price, count, imgUrl, removeItem, increment, decrement }
    : { title: string, price: number, count: number, imgUrl: string, removeItem: () => void, increment: () => void, decrement: () => void }) {
    return (
        <div className="flex h-fit w-full shadow-sm">
            <div className="h-full w-[15%]">
                <img src={imgUrl} className="h-full w-full" alt="" />
            </div>
            <div className="flex flex-col justify-evenly h-full w-full p-3 bg-gray-200">
                <p className="text-lg">{title}</p>
                <p>{`${count} * ${price} = ${count * price}`}</p>
                {/* <p>{`Quantity: ${count}`}</p> */}
                <div className="flex items-center gap-3">
                    <p>Quantity: </p>
                    <div className="flex items-center max-w-[7rem]">
                        <button onClick={decrement} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-blue-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-8 w-16 flex items-center justify-center focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                            </svg>
                        </button>
                        <p id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-blue-700 border-x-0 border-gray-300 h-8 w-20 text-center text-md flex items-center justify-center dark:border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {`${count}`}
                        </p>
                        <button onClick={increment} type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-blue-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-8 w-16 flex items-center justify-center focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                <button onClick={removeItem} className="bg-red-500 p-1 rounded-lg w-fit text-sm text-white font-semibold">Remove</button>
            </div>
        </div>
    )
}

export default function Cart() {
    const [cartItems, setCartItems] = useOutletContext() as ContextType

    function removeItem(id: number) {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems)
    }

    function increment(id: number) {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, count: item.count + 1 }
            } else {
                return item
            }
        })

        setCartItems(updatedCartItems as objArray[])
    }

    function decrement(id: number) {
        const prevCartItems = [...cartItems]
        const updatedCartItems = prevCartItems.map(item => {
            if (item.id === id) {
                if (item.count === 1) {
                    return null
                } else {
                    return { ...item, count: item.count - 1 }
                }
            } else {
                return item
            }
        }).filter(item => item !== null) as objArray[];

        setCartItems(updatedCartItems as objArray[])
    }

    function calcTotalAmount() {
        let total = 0

        for (let i = 0; i < cartItems.length; i++) {
            total+= cartItems[i].count * cartItems[i].price
        }

        return total
    }

    return (
        <div className="flex flex-col gap-3 items-center justify-center h-[90%] w-full">
            <div className="flex h-[75%] w-[60%] shadow-lg border-2 border-blue-700 rounded-lg">
                <div className="flex overflow-y-auto flex-col gap-5 p-10 h-full w-full bg-white">
                    {
                        cartItems.length === 0 &&
                        <p className="self-center">
                            Cart is looking lonely...
                        </p>
                    }
                    {
                        cartItems !== null &&
                        cartItems.map((item) => {
                            return (
                                <>
                                    <ItemInCart
                                        title={item.title}
                                        price={item.price}
                                        count={item.count}
                                        imgUrl={item.imgUrl}
                                        removeItem={() => removeItem(item.id)}
                                        increment={() => increment(item.id)}
                                        decrement={() => decrement(item.id)}
                                    >
                                    </ItemInCart>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <p className="text-lg">Total Amount: ${calcTotalAmount()}</p>
            <button className="bg-yellow-500 p-2 rounded-lg">Proceed to checkout</button>
        </div>
    )
}