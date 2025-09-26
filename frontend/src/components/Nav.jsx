import React, { useEffect, useState } from "react";
import { IoLocation } from "react-icons/io5";
import { BsSearchHeart } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { serverUrl } from "../App.jsx";
import { CiSquarePlus } from "react-icons/ci";
import axios from "axios";
import { setSearchItems, setUserData } from "../redux/userSlice.js";
import { TbReceipt2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, currentCity, cartItems } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);

  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchItems = async () => {
    if (!query || !query.trim()) {
      dispatch(setSearchItems([]));
      return;
    }
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/search-items?query=${query}&city=${currentCity}`,
        { withCredentials: true }
      );
      dispatch(setSearchItems(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query && query.trim() !== "") {
      handleSearchItems();
    } else {
      dispatch(setSearchItems([]));
    }
  }, [query]);

  return (
    <div className="w-full h-[70px] flex items-center justify-between px-4 md:px-8 fixed top-0 z-[9999] bg-[#fff9f6] shadow-md">
      {/* Mobile Search Bar */}
      {showSearch && userData.role === "user" && (
        <div className="absolute  md:hidden top-[70px] left-0 w-full px-4">
          <div className="w-full flex items-center bg-white shadow-lg rounded-lg px-3 py-2 gap-3">
            {/* Location */}
            <div className="flex items-center gap-2 border-r pr-3 text-gray-600 text-sm font-medium">
              <IoLocation className="w-5 h-5 text-[#ff4d2d]" />
              <span className="truncate max-w-[100px]">{currentCity}</span>
            </div>
            {/* Search */}
            <div className="flex-1 flex  items-center gap-2">
              <BsSearchHeart size={20} className="text-[#ff4d2d]" />
              <input
                type="text"
                placeholder="Search  Food "
                className="flex-1 text-sm text-gray-700 outline-none"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
            </div>
          </div>
        </div>
      )}

      {/* Logo */}
      <h1
        className="text-2xl md:text-3xl font-bold text-[#ff4d2d] cursor-pointer"
        onClick={() => navigate("/")}
      >
        Vingo
      </h1>

      {/* Desktop Search Bar (Users Only) */}
      {userData.role === "user" && (
        <div className="hidden md:flex flex-1 max-w-2xl mx-6 bg-white shadow-lg rounded-lg px-4 py-3 items-center gap-3">
          {/* Location */}
          <div className="flex items-center gap-2 border-r pr-3 text-gray-600 text-sm font-medium">
            <IoLocation className="w-6 h-6 text-[#ff4d2d]" />
            <span className="truncate max-w-[120px] text-[16px]">{currentCity}</span>
          </div>
          {/* Search */}
          <div className="flex-1 flex items-center gap-2">
            <BsSearchHeart size={22} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="Search your Delicious Food"
              className="flex-1 text-[16px] text-gray-700 outline-none"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Mobile search toggle */}
        {userData.role === "user" &&
          (showSearch ? (
            <RxCross2
              size={22}
              className="text-[#ff4d2d] md:hidden cursor-pointer"
              onClick={() => setShowSearch(false)}
            />
          ) : (
            <BsSearchHeart
              size={22}
              className="text-[#ff4d2d] md:hidden cursor-pointer"
              onClick={() => setShowSearch(true)}
            />
          ))}

        {/* Owner Section */}
        {userData.role === "owner" && (
          <div className="flex items-center gap-3">

              {/* City Badge */}
              <div className="flex items-center gap-2 border-r pr-3 text-gray-600 text-sm font-medium">
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg text-[#ff4d2d] font-medium ">
              <IoLocation className="w-5 h-5" />
              <span className="truncate max-w-[120px]">{currentCity}</span>
            </div>
            </div>
            {myShopData && (
              <>
                {/* Add Item */}
                <button
                  className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium cursor-pointer"
                  onClick={() => navigate("/add-item")}
                >
                  <CiSquarePlus size={20} />
                  <span className="text-sm">Add Food Item</span>
                </button>

                <button
                  className="md:hidden flex items-center p-2 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] cursor-pointer"
                  onClick={() => navigate("/add-item")}
                >
                  <CiSquarePlus size={20} />
                </button>
              </>
            )}

        

            {/* Orders */}
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium cursor-pointer"
              onClick={() => navigate("/my-orders")}
            >
              <TbReceipt2 size={18} />
              <span className="hidden md:inline text-sm cursor-pointer">My Orders</span>
            </button>
          </div>
        )}

        {/* User Section */}
        {userData.role === "user" && (
          <div className="flex items-center gap-3">
            {/* Cart */}
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <IoCartOutline size={28} className="text-[#ff4d2d]" />
              <span className="absolute -top-2 -right-2 text-xs font-bold text-[#ff4d2d] text-[14px]">
                {cartItems.length}
              </span>
            </div>

            {/* Orders */}
            <button
              className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium cursor-pointer"
              onClick={() => navigate("/my-orders")}
            >
              My Orders
            </button>
          </div>
        )}

        {/* DeliveryBoy Section */}
        {userData.role === "deliveryBoy" && (
           <div className="flex items-center gap-2 border-r pr-3 text-gray-600 text-sm font-medium">
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg text-[#ff4d2d] font-medium">
            <IoLocation className="w-5 h-5" />
            <span className="truncate max-w-[120px]">{currentCity}</span>
          </div>
</div>

        )}

        {/* Profile */}
        <div
          className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-sm md:text-base font-semibold cursor-pointer"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData?.fullName?.slice(0, 1)}
        </div>
      </div>

      {/* Profile Popup */}
      {showInfo && (
        <div className="absolute top-[75px] right-4 w-44 bg-white shadow-lg rounded-lg p-3 flex flex-col gap-2 z-[99999]">
          <div className="text-sm font-semibold text-gray-800">
            {userData?.fullName}
          </div>

          {userData.role === "user" && (
            <div
              className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer"
              onClick={() => navigate("/my-orders")}
            >
              My Orders
            </div>
          )}

          <div
            className="text-[#ff4d2d] font-semibold cursor-pointer hover:bg-red-50 rounded-lg px-2 py-1"
            onClick={handleLogOut}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

export default Nav;
