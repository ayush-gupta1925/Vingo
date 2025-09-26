import React from 'react'
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App.jsx';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setMyShopData } from '../redux/ownerSlice.js';
import { toast } from 'react-toastify';
function OwnerItemCard({data}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
        const handleDeleteItem  = async()=>{
        try {
          const result = await axios.get(`${serverUrl}/api/item/delete/${data._id}` , {withCredentials:true})
          dispatch(setMyShopData(result.data))
          toast.success("Item has been Deleted Successfully !")
        } catch (error) {
          console.log(error)
          toast.error("Item  Deleted Error !")
        }
        }
        
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d] flex w-full max-w-2xl '>
    <div className='w-38  flex-shrink-0 bg-gray-50 '>
        <img src={data.image} className='w-full h-full object-center'/>
        </div>
        <div className='flex flex-col justify-between pl-[13px] flex-1'>
          <div className=''>
           <h2 className='text-base font-sembold text-[#ff4d2d] text-[17px]'>{data.name}</h2>
           <p className='text-[14px]'><span className='font-medium text-gray-70 text-[14px]'>Category : </span>{data.category} </p>
           <p className='text-[14px]'><span className='font-medium text-gray-70 text-[14px]'>Food Type : </span>{data.foodType}</p>
          </div>

          <div className='flex items-center justify-between'>
          <div className='text-[#ff4d2d] font-bold'>{data.price}</div>

          <div className='flex items-center gap-2'> 
          <div className='p-2 rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d] cursor-pointer ' onClick={()=>navigate(`/edit-item/${data._id}`)}>
<MdEdit size={16} />
          </div>
          <div className='p-2 rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d] cursor-pointer' onClick={handleDeleteItem}>
  
          <RiDeleteBin6Fill  size={16} />
          </div>
        </div>

          </div>
        </div>
    </div>
  )
}

export default OwnerItemCard