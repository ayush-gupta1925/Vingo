import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUtensils } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { setMyShopData } from '../redux/ownerSlice.js';
import { ClipLoader } from "react-spinners";
import { toast } from 'react-toastify';
function AddItem() {
const navigate = useNavigate()
     const {myShopData} = useSelector(state=>state.owner)
    
     const [name,setName] = useState("")
      const [price,setPrice] = useState("")
    
  const [loading, setLoading] = useState(false);
       const [frontendImage,setFrontendImage] = useState(null)
       const [backendImage,setBackendImage] = useState(null)
       const dispatch= useDispatch()

       const categories = ["Snacks","Main Course","Desserts","Pizza","Burgers","Sandwiches","South Indian","North Indian","Chinese","Fast Food" ,"Others"]

       const [category,setCategory] = useState("");
       const [foodType,setFoodType] = useState("veg")


       // const handleImage = (e)=>{
       //     e.preventDefault()
       //     const file = e.target.files[0]
       //     setBackendImage(file)
       //     setFrontendImage(URL.createObjectURL(file))
       // }

     const handleImage = (e) => {
  e.preventDefault();
  const file = e.target.files[0];
  if (!file) return; // ← check added
  setBackendImage(file);
  setFrontendImage(URL.createObjectURL(file));
};


 const handleSubmit = async(e)=>{
 e.preventDefault()
  try {
  const formData = new FormData()
  formData.append("name",name)
  formData.append("category",category)
  formData.append("foodType",foodType)

  formData.append("price",price)

 
  if(backendImage){
formData.append("image",backendImage)
  }
  setLoading(true)
  const result = await axios.post(`${serverUrl}/api/item/add-item`,formData,{withCredentials:true})
  dispatch(setMyShopData(result.data))
  setLoading(false)
  console.log(result.data)
  navigate("/")
  toast.success("Create Item Successfully !")
  
} catch (error) {
  console.log(error)
   setLoading(false)
    toast.error("Create Item Error !")
}
 }

  return (
    <div className='flex justify-center flex-xol items-center p-6 bg-gradient-to-br from-orange-50 to-white min-h-screen'>
         <div className='absolute top-[20px] left-[20px] z-[10] mb-[10px] cursor-pointer'>
          <IoIosArrowRoundBack size={35} className='text-[#ff4d2d]'  onClick={()=>navigate("/")}/>
         </div>
         {/* edit  */}
         <div className='max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100'>
          <div className='flex flex-col items-center mb-6'>
{/* icon  */}
     <div className='bg-orange-100 p-4 rounded-full mb-4 '>
      <FaUtensils className='text-[#ff4d2d] w-16 h-16'/>
     </div>

     {/* create shop  */}
      <div className='text-3xl font-extrabold text-gray-900'>
  Add Food Item
      </div>

          </div>


  <form className='space-y-5' onSubmit={handleSubmit}>
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
      <input type='text' placeholder='Enter Food Name' className='w-full px-4 py-2 border rounded-lg  focus:outline-none focus:ring-orange-400 focus:ring-2' onChange={(e)=>setName(e.target.value)}  value={name}/>
    </div>

<div>
      <label className='block text-sm font-medium text-gray-700 mb-1'>Food Image</label>
      <input type='file'   accept='image/*' placeholder='Enter Shop Name' className='w-full px-4 py-2 border rounded-lg  focus:outline-none focus:ring-orange-400 focus:ring-2' onChange={handleImage} />


{frontendImage &&  <div className='mt-4'>

  <img src={frontendImage} className='w-full h-48 object-cover rounded-lg border'/>
</div>}


    </div>

        <div>
      <label className='block text-sm font-medium text-gray-700 mb-1'>Price</label>
      <input type='number' placeholder='0' className='w-full px-4 py-2 border rounded-lg  focus:outline-none focus:ring-orange-400 focus:ring-2' onChange={(e)=>setPrice(e.target.value)}  value={price}/>
    </div>

 <div>
      <label className='block text-sm font-medium text-gray-700 mb-1'>Select Category</label>
      <select className='w-full px-4 py-2 border rounded-lg  focus:outline-none focus:ring-orange-400 focus:ring-2' onChange={(e)=>setCategory(e.target.value)}  value={category} >

    <option value="">Select Categroies</option>
    {categories.map((cate,index)=>(
      <option value={cate} key={index}>{cate}</option>
    ))}
      </select>
    </div>

     <div>
      <label className='block text-sm font-medium text-gray-700 mb-1'>Select Food Type</label>
      <select className='w-full px-4 py-2 border rounded-lg  focus:outline-none focus:ring-orange-400 focus:ring-2' onChange={(e)=>setFoodType(e.target.value)}  value={foodType} >


       <option value="veg">Veg</option>
       <option value="non veg">Non-Veg</option>
      </select>
    </div>


 <button className='w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 cursor-pointer'  
disabled={loading}>    {loading ? <ClipLoader size={30} color="white" /> : "Save"}
 </button>
  



  </form>

         </div>
    </div>
  )
}

export default AddItem
