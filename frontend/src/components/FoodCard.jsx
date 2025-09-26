import React from 'react'
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import { FiStar } from "react-icons/fi";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity } from '../redux/userSlice.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function FoodCard({ data }) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.user);
    const navigate = useNavigate()
  // 👇 Cart me agar ye item already hai toh uski quantity lelo
  const existingItem = cartItems.find((i) => i.id === data._id);
  const quantity = existingItem ? existingItem.quantity : 0;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <GoStarFill key={i} className="text-yellow-500 text-sm sm:text-base" />
        ) : (
          <FiStar key={i} className="text-yellow-500 text-sm sm:text-base" />
        )
      );
    }
    return stars;
  };

  const handleIncrease = () => {
    if (existingItem) {
      dispatch(updateQuantity({ id: data._id, quantity: quantity + 1 }));
    }
  };

  const handleDecrease = () => {
    if (existingItem && quantity > 1) {
      dispatch(updateQuantity({ id: data._id, quantity: quantity - 1 }));
    }
  };

  const handleAddToCart = () => {
    
    if (!existingItem) {
      dispatch(
        addToCart({
          id: data._id,
          name: data.name,
          price: data.price,
          image: data.image,
          shop: data.shop,
          quantity: 1,
          foodType: data.foodType,
        })
      );
      
      toast.success("Item has been added into Cart page");
    }
    
    
  };

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[220px] rounded-2xl border-2 border-[#ff4d2d] bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* image section */}
      <div className="relative w-full h-[120px] sm:h-[140px] md:h-[160px] flex justify-center items-center bg-white">
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white rounded-full p-1 shadow">
          {data.foodType === "veg" ? (
            <FaLeaf className="text-green-600 text-sm sm:text-base md:text-lg" />
          ) : (
            <FaDrumstickBite className="text-red-600 text-sm sm:text-base md:text-lg" />
          )}
        </div>

        <img
          src={data.image}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          alt={data.name}
        />
      </div>

      {/* content */}
      <div className="flex-1 flex flex-col p-2">
        <h1 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg truncate">
          {data.name}
        </h1>
        <div className="flex items-center gap-1 mt-1">
          {renderStars(data.rating?.average || 0)}
          <span className="text-[10px] sm:text-xs md:text-sm text-gray-500">
            {data.rating?.count || 0}
          </span>
        </div>
      </div>

      {/* price + actions */}
      <div className="flex items-center justify-between mt-[-6px] sm:mt-[-8px] p-2">
        <span className="font-bold text-gray-900 text-sm sm:text-base md:text-lg">
          ₹ {data.price}
        </span>

        {/* right side */}
        <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
          {existingItem ? (
            <>
              <button
                className="px-2 py-1 sm:py-2   md:py-2 hover:bg-gray-100 transition cursor-pointer"
                onClick={handleDecrease}
              >
                <FaMinus size={16} className="sm:size-[14px] md:size-[16px]" />
              </button>
              <span className="text-sm sm:text-sm md:text-base">{quantity}</span>
              <button
                className="px-2 py-1 hover:bg-gray-100 transition cursor-pointer"
                onClick={handleIncrease}
              >
                <FaPlus size={16} className="sm:size-[14px] md:size-[15px]" />
              </button>
            </>
          ) : (
            <button
              className="bg-[#ff4d2d] text-white px-3 sm:px-3 py-2 sm:py-2 transition-colors cursor-pointer"
                onClick={() => {
    handleAddToCart(); 
    
  }}
            >
              <FaCartShopping className="size-3 sm:size-4 md:size-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
