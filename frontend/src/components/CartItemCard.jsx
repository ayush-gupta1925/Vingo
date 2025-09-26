// import React from 'react'
// import { FaMinus } from "react-icons/fa6";
// import { FaPlus } from "react-icons/fa6";
// import { MdDelete } from "react-icons/md";
// import { useDispatch } from 'react-redux';
// import { removeCartItem, updateQuantity } from '../redux/userSlice';
// function CartItemCard({data}) {
// const dispatch = useDispatch()
// const handleIncrease = (id,currentQty)=>{
// dispatch(updateQuantity({id,quantity:currentQty+1}))
// }
// const handleDecrese = (id,currentQty)=>{
//   if(currentQty > 1){
// dispatch(updateQuantity({id,quantity:currentQty-1}))
//   }

// } 

 

//   return (
//     <div className='flex items-center justify-between bg-white p-4 rounded-xl shadow border  '>

//     {/* left side  */}
//   <div className='flex items-center gap-4'>
//   <img src={data.image} className='w-20 h-20 object-cover rounded-lg border'/>
//   <div >
//     <h1 className='font-medium text-gray-800'>{data.name}</h1>
//  <p className='text-sm text-gray-500'>₹ {data.price} ⨯ {data.quantity}</p>
//  <p className='font-bold text-gray-900'>₹ {data.price*data.quantity}</p>
//   </div>
//   </div>

//   {/* right side  */}
//   <div className='flex items-center gap-3'>
// <button className=' p-2 hover:bg-gray-200 bg-gray-100 rounded-full cursor-pointer' onClick={()=>handleDecrese(data.id,data.quantity)} ><FaMinus size={12} /></button>
// <span>{data.quantity}</span>
// <button className=' p-2 hover:bg-gray-200 bg-gray-100 rounded-full cursor-pointer' onClick={()=>handleIncrease(data.id,data.quantity)} ><FaPlus  size={12}/></button>
// <button className='p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 cursor-pointer'   onClick={()=>dispatch(removeCartItem(data.id))}><MdDelete size={16}  />
// </button>
//   </div>
//     </div>
//   )
// }

// export default CartItemCard




import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeCartItem, updateQuantity } from "../redux/userSlice.js";

function CartItemCard({ data }) {
  const dispatch = useDispatch();

  const handleIncrease = (id, currentQty) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-3 sm:p-4 rounded-xl shadow border gap-3">
      {/* Left Side */}
      <div className="flex items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
        <img
          src={data.image}
          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border"
          alt={data.name}
        />
        <div className="flex flex-col">
          <h1 className="font-medium text-gray-800 text-sm sm:text-base">
            {data.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            ₹ {data.price} ⨯ {data.quantity}
          </p>
          <p className="font-bold text-gray-900 text-sm sm:text-base">
            ₹ {data.price * data.quantity}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
        <button
          className="p-1.5 sm:p-2 hover:bg-gray-200 bg-gray-100 rounded-full cursor-pointer"
          onClick={() => handleDecrease(data.id, data.quantity)}
        >
          <FaMinus size={10} className="sm:size-[12px]" />
        </button>

        <span className="text-sm sm:text-base">{data.quantity}</span>

        <button
          className="p-1.5 sm:p-2 hover:bg-gray-200 bg-gray-100 rounded-full cursor-pointer"
          onClick={() => handleIncrease(data.id, data.quantity)}
        >
          <FaPlus size={10} className="sm:size-[12px]" />
        </button>

        <button
          className="p-1.5 sm:p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 cursor-pointer"
          onClick={() => dispatch(removeCartItem(data.id))}
        >
          <MdDelete size={14} className="sm:size-[16px]" />
        </button>
      </div>
    </div>
  );
}

export default CartItemCard;
