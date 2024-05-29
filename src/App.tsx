import './App.css'
import { useState } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { Product } from './types'

function App() {
  const [cartItems, setCartItems] = useState<Product[]>([])

  return (
    <>
      <Navbar cartItems={cartItems}></Navbar>
      <Outlet context={[cartItems, setCartItems]}></Outlet>
    </>
  )
}

export default App
