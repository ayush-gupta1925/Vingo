import React from 'react'
import Nav from './Nav.jsx'
import { useSelector } from 'react-redux'
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaPenNib } from "react-icons/fa";
import OwnerItemCard from './OwnerItemCard.jsx';
function OwnerDashboard() {
const navigate  = useNavigate()
        const {myShopData} = useSelector(state=>state.owner)

   
  return (
        <div className='w-full min-h-screen bg-[#fff9f6] flex flex-col items-center overflow-hidden'>
      <Nav/>

<div>
  {
    !myShopData && 
    <div className='flex justify-center items-center p-4 sm:p-6 '>
       <div className='w-full max-w-md  bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
           <div className='flex flex-col items-center text-center'>
               <FaUtensils  className='text-[#ff4d2d] w-16 h-16 sm:w-20 sm:h-20 mb-4'/>
               <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2'>Add your Resaurant</h2>
               <p className='text-gray-600  mb-4 text-sm sm:text-base'>Join our food delivery platform and react thousands of hungry customers every day.</p>
               <button className='bg-[#ff4d2d] text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors duration-200 cursor-pointer' onClick={()=>navigate("/create-edit-shop")}>Get Started</button>
           </div>
       </div>
    </div>
  }

{/* show the shop image and data  */}
{myShopData && <div className='w-full flex flex-col items-center gap-6 px-4 sm:px-6'>

</div>}

{myShopData &&  <div className='w-full flex flex-col items-center gap-6 sm:px-6'>
<h1 className='text-2xl sm:text-3xl text-gray-900 flex items-center gap-3 mt-8 text-center'>     <FaUtensils  className='text-[#ff4d2d] w-12 h-12 '/>Welcome  to {myShopData.name}</h1>

<div className='bg-white shadow-lg rounded-xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative'>
<div className='absolute top-2 right-2 bg-[#f16e57] text-[#30054e] p-2 rounded-full shadow-md hover:bg-orange-600 transition-colors cursor-pointer' onClick={()=>navigate("/create-edit-shop")}>
  <FaPenNib  size={17}/>
</div>
   <img src={myShopData.image} className='w-full h-48 sm:h-64 object-cover'/>
   <div className='p-4 sm:p-6'>
  <h1 className='text-xl sm:text-2xl font-bold  text-gray-800 mb-2'>{myShopData.name}</h1>
  <p className='text-gray-500 '>{myShopData.city}</p>
   <p className='text-gray-500 '>{myShopData.address}</p>
</div>
</div>

{
  myShopData.items.length == 0 && 
            <div className='flex justify-center items-center p-4 sm:p-6 '>
       <div className='w-full max-w-md  bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
           <div className='flex flex-col items-center text-center'>
               <FaUtensils  className='text-[#ff4d2d] w-16 h-16 sm:w-20 sm:h-20 mb-4'/>
               <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2'>Add your Food Item</h2>
               <p className='text-gray-600  mb-4 text-sm sm:text-base'>Share your delicious creations with our customers by adding then to the menu.</p>
               <button className='bg-[#ff4d2d] text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors duration-200 cursor-pointer' onClick={()=>navigate("/add-item")}>Add Food</button>
           </div>
       </div>
   
  </div>
}


{myShopData.items.length>0 && <div className='flex flex-col items-center gap-4 w-full max-w-3xl'>
    {myShopData.items.map((item,index)=>(
      <OwnerItemCard data={item} key={index}/>
    ))}
</div>}


</div>}

</div>

    </div>
  ) 
}

export default OwnerDashboard