import React, { useEffect, useState } from 'react'
import { serverUrl } from '../App.jsx'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import { FaStore } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaUtensils } from "react-icons/fa";
import FoodCard from '../components/FoodCard.jsx'
import { IoMdArrowRoundBack } from "react-icons/io";
function Shop() {
  const navigate = useNavigate()
  const {shopId} = useParams()
  const [items,setItems] = useState([])
  const [shop,setShop] = useState([])
  const handleShop = async()=>{
    try {
      const result = await axios.get(`${serverUrl}/api/item/get-by-shop/${shopId}`,{withCredentials:true})
      setShop(result.data.shop)
      setItems(result.data.items)
    } catch (error) {
      console.log(error)
    } 
  }
  useEffect(()=>{
handleShop()
  },[shopId])
  return (
    <div className=',in-h-screen bg-gray-50 flex items-center justify-center flex-col'>
          <Nav/>

          <button className='absolute top-23 left-4 z-20 flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white px-3 py-2 rounded-full shadow-transition cursor-pointer' onClick={() => navigate("/")}><IoMdArrowRoundBack /><span>Black</span></button>

          {shop && <div className='relative w-full h-64 md:h-80 lg:h-130'>
              <img src={shop.image} className='w-full h-full object-cover'/>
              <div className='absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 flex flex-col justify-center items-center text-center px-4'><FaStore className='text-white text-4xl mb-3 drop-shadow-md' />
              <h1 className='text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg'>{shop.name}</h1>
              <div className='flex items-center gap-[10px] mt-[10px] '>
              <FaLocationDot size={20} color='red' />
                <p className='text-lg font-medium text-gray-200 '>{shop.address}</p> 
                </div> 
              </div>
  
          </div>}

 <div className='max-w-7xl mx-auto px-6 py-10'>
 <h2 className='flex items-center justify-center gap-3 text-3xl font-bold mb-10 text-gray-800'><FaUtensils  color='red'/> Our Menu</h2>
   {items.length > 0 ? (
     <div className='flex flex-wrap justify-center gap-8'>
       {items.map((item)=>(
        <FoodCard data={item}/>
       ))}
     </div>
   ) : <p className='text-center text-gay-500 text-lg'>No Item Available</p>}
 </div>

    </div>
  )
}

export default Shop