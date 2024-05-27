import { Link } from 'react-router-dom'
import mainImg from '../assets/main-content-image.jpg'
import mainImgTwo from '../assets/main-content-image-two.jpg'
import mainImgThree from '../assets/main-content-image-three.jpg'

export default function Main() {
    return (
        <main className="flex flex-col mt-5 md:mt-0 lg:mt-0 md:flex-row lg:flex-row md:justify-center lg:justify-center h-[90%] items-center gap-6">
            <div className='flex items-center md:items-start lg:items-start flex-col w-full  lg:w-[750px] md:w-[750px] gap-8'>
                <p className='text-4xl font-extrabold'>SNEAKSTORE.</p>
                <p className='text-lg text-center lg:text-start md:text-start'>
                Discover the latest in stylish and comfortable footwear. 
                From classic kicks to limited editions, 
                our curated collection has something for every sneaker enthusiast. 
                Shop top brands and exclusive releases with us today, 
                and step up your sneaker game!
                </p>
                <Link to="/shop">
                    <button type="button" 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                    focus:ring-blue-300 font-bold rounded-lg text-sm px-5 
                    py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
                    focus:outline-none dark:focus:ring-blue-800 w-[200px]">
                        SHOP NOW
                    </button>
                </Link>
            </div>
            <div className='w-[300px]'>
                <img className='shadow-lg h-auto w-full rounded-lg border-2 border-blue-700' src={mainImg} alt="main-content-img" />
            </div>
            <div className='w-[400px]'>
                <img className='shadow-lg h-auto w-full rounded-lg border-2 border-blue-700' src={mainImgThree} alt="main-content-img" />
            </div>
            <div className='w-[300px]'>
                <img className='shadow-lg h-auto w-full rounded-lg border-2 border-blue-700' src={mainImgTwo} alt="main-content-img" />
            </div>
        </main>
    )
}