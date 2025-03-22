import React, { useEffect, useState } from 'react'
import add from "../img/add.png"
import basket from "../img/cart.png"
import remove from "../img/delete.png"

const API = "https://fakestoreapi.com/products"
import { Link } from "react-router"
import {
    Drawer,
    Typography,
} from "@material-tailwind/react";

const Home = () => {
    const [cart, setCart] = useState([])
    const [products, setProducts] = useState()
    const getData = async () => {
        const req = await fetch(API)
        const data = await req.json()
        setProducts(data)
    }
    useEffect(() => {
        getData()
    }, [])
    const addToCart = (el) => {
        const isThere = cart.find((prod) => prod.id == el.id)
        if (!isThere) {
            setCart([...cart, el])
        }
        else {
            alert("Bu maxsulot allaqchon bor")
        }
    }
    const removeFromCart = (elId)=>{
        setCart(cart.filter((cartEl)=> cartEl.id != elId))
    }
    const [open, setOpen] = React.useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    return (
        <>
        <header className='bg-blue-600 text-white py-4'>
    <div className="w-full max-w-6xl  mx-auto px-5 flex justify-between items-center" >
      <Link to="/"><h1 className='font-bold text-3xl'>FakeStore</h1></Link>
      <button onClick={openDrawer} className='flex relative '><img src={basket}  className='w-8 h-8'/><p className='absolute right-[-25px] bottom-[-10px] px-2 rounded-full bg-white text-blue-600'>{cart.length}</p></button>
    </div>
  </header>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex flex-col items-center justify-between">
          <Typography variant="h5" color="blue-gray" className='mb-4'>
            Selected Products
          </Typography>
      <ul className='flex flex-col gap-6'>
            {
                cart && cart.map((cartEl)=> {
                    return(
                        <li key={cartEl.id} className='flex justify-between border-2 border-black/20 w-full'>
                            <img src={cartEl.image} alt="something went wrong" className='w-24 h-24'/>
                            <div className="px-2 py-3 w-ful flex flex-col gap-4">
                                <h3 className='font-semibold'>{cartEl.title.split(" ").slice(0,3).join(" ")}</h3>
                                <div className="flex justify-end">
                                <button onClick={()=> removeFromCart(cartEl.id)} className='px-1 py-1 bg-red-600 text-white rounded-full'><img src={remove} alt="something went wrong" /></button>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
         </ul>
        </div>
      </Drawer>
    
        <div className='w-full max-w-6xl mx-auto px-5 py-8'>
            <h2 className='text-4xl text-center mb-6 text-blue-600'>Products:</h2>
            <ul className='grid grid-cols-1 lg:grid-cols-4  gap-7'>
                {
                    products && products.map((product) => {
                        return (
                            <li key={product.id} className='border-2 border-black/20 rounded-lg'>
                                <img src={product.image} alt="something went wrong" className='w-full h-64' />
                                <div className="p-5 flex flex-col justify-between h-auto">
                                    <h3 className='font-semibold mb-2'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                                    <p><span className='font-semibold mb-2'>Price:</span>{product.price}$</p>
                                    <div className="flex justify-end items-end">
                                        <button onClick={() => addToCart(product)} className='py-2 px-4 bg-blue-600 text-white rounded-full'><img src={add} alt="something went wrong" /></button>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    </>
    )
}

export default Home
