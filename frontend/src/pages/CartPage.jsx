import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard.jsx";

function CartPage() {
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-[#fff9f6] flex justify-center p-4 sm:p-6">
      {/* Back Arrow */}
      <div className="absolute left-3 top-3 cursor-pointer hidden md:block" onClick={() => navigate("/")}>
  <IoIosArrowRoundBack
    size={45}
    className="text-[#ff4d2d]"
    
  />
</div>

      <div className="w-full max-w-[800px]">
        {/* Page Heading */}


<div className=" flex  justify-center mb-6 gap-2">
<div className="cursor-pointer md:hidden" onClick={() => navigate("/")}>
  <IoIosArrowRoundBack
    size={40} 
    className="text-[#ff4d2d]"
    
  />
</div>

        <div className="relative flex items-center mb-4">
          <h1 className="mx-auto text-3xl sm:text-4xl font-bold text-center">
            Your Cart Page
          </h1>
        </div>
</div>
        {/* Empty Cart */}
        {cartItems?.length === 0 ? (
          <p className="text-gray-500 text-lg sm:text-2xl text-center">
            Your Cart is Empty !
          </p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems?.map((item, index) => (
                <CartItemCard data={item} key={index} />
              ))}
            </div>

            {/* Total Amount */}
            <div className="mt-6 bg-white p-3 sm:p-4 rounded-xl shadow flex justify-between items-center border">
              <h1 className="text-base sm:text-lg font-semibold">
                Total Amount
              </h1>
              <span className="text-lg sm:text-xl font-bold text-[#ff4d2d]">
                ₹ {totalAmount}
              </span>
            </div>

            {/* Checkout Button */}
            <div className="mt-4 flex justify-end">
              <button
                className="bg-[#ff4d2d] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-lg font-medium hover:bg-[#e64526] transition cursor-pointer"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
