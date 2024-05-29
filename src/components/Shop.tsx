import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom";
import {ContextType, Product } from "../types";

function Item({ id, imgUrl, title, price }: { id: number, imgUrl: string, title: string, price: number }) {
    const [count, setCount] = useState<number>(1)
    const [cartItems, setCartItems] = useOutletContext() as ContextType

    function decrement() {
        if (count !== 1) {
            setCount(count => count - 1)
        }
    }

    function increment() {
        setCount(count => count + 1)
    }

    function placeInCart() {
        const item = { id: id, count: count, title: title, price: price, imgUrl: imgUrl };
    
        const itemIndex = cartItems.findIndex(cartItem => cartItem.id === id);
    
        if (itemIndex !== -1) {
            // Item with the same id found, update its count
            const updatedCartItems = [...cartItems];
            updatedCartItems[itemIndex] = {
                ...updatedCartItems[itemIndex],
                count: count
            };
            setCartItems(updatedCartItems);
        } else {
            // Item with id not found in cartItems, add it
            setCartItems(prevItems => [...prevItems, item]);
        }
    }

    return (
        <div className="flex flex-col justify-center h-[500px] w-[350px] shadow-lg border-2 border-blue-700 rounded-lg">
            <div className="flex h-[65%] w-full justify-center items-center">
                <img src={imgUrl} className="h-[100%] w-[100%]" />
            </div>
            <div className="flex p-2 justify-center flex-col gap-1 h-[35%]">
                <p className="truncate w-full text-lg">{title}</p>
                <p className="text-2xl">{`$${price}`}</p>
                <div className="flex items-center max-w-[7rem]">
                    <button onClick={decrement} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-blue-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                        </svg>
                    </button>
                    <p id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-blue-700 border-x-0 border-gray-300 h-11 text-center text-md focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{count}</p>
                    <button onClick={increment} type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-blue-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </button>
                </div>
                <button onClick={placeInCart} className="max-w-[7rem] border-1 p-2 bg-yellow-400 text-black rounded-lg">Add to cart</button>
            </div>
        </div>
    )
}


export default function Shop() {
    const [data, setData] = useState<Product[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<string | boolean>(true)

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('https://api.escuelajs.co/api/v1/categories/4/products')

                if (!response.ok) {
                    throw new Error("Server error")
                } else {
                    let result = await response.json()
                    let final = []

                    for (let i = 0; i < result.length - 1; i++) {
                        final.push({
                            id: result[i].id,
                            title: result[i].title,
                            price: result[i].price,
                            imgUrl: result[i].images[0]
                        })
                    }

                    if (final.length === 0) {
                        throw new Error("No data retrieved.")
                    }

                    setData(final)
                }
            } catch (error) {
                setError((error as Error).message)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        <div className="flex flex-wrap gap-10 items-center justify-center h-fit p-10 mb-10">
            {
                error &&
                <p>There was an error retrieving data: {error}</p>
            }
            {
                loading &&
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            }
            {
                data && data.map((item: Product) => {
                    return <Item key={item.id} id={item.id} imgUrl={item.imgUrl} title={item.title} price={item.price}></Item>
                })
            }
        </div>
    )
}