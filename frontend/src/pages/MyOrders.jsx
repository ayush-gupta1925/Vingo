import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
import UserOrderCard from '../components/UserOrderCard.jsx';
import OwnerOrdercard from '../components/OwnerOrdercard.jsx';
import { setMyOrders, updateRealtimeOrderStatus } from '../redux/userSlice.js';
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { toast } from 'react-toastify';

function MyOrders() {
  const navigate = useNavigate();
  const { userData, myOrders, socket } = useSelector(state => state.user);
  const dispatch = useDispatch();

  // 🔹 Page load hote hi API se orders fetch
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/order/my-orders`,
        { withCredentials: true }
      );
      dispatch(setMyOrders(res.data)); // Latest orders set kar diye
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders(); // Page load hote hi orders aayenge

    // 🔹 Realtime socket events
    socket?.on('newOrder', (data) => {
      // Agar owner hai aur uske shop ka order hai
      if (data.shopOrders.owner._id === userData._id) {
        dispatch(setMyOrders([data, ...myOrders]));
      }
 
    });

    // socket?.on('update-status', ({ orderId, shopId, status, userId }) => {
    //   if (userId === userData._id) {
    //     dispatch(updateRealtimeOrderStatus({ orderId, shopId, status }));
    //   }
    
    // });

    return () => {
      socket?.off('newOrder');
      // socket?.off('update-status');
    };
  }, [socket]);

  useEffect(() => {
  if (!socket) return;

  socket.on('update-status', ({ orderId, shopId, status }) => {
    // Realtime update MyOrders page
    dispatch(updateRealtimeOrderStatus({ orderId, shopId, status }));
 
  });

  return () => {
    socket.off('update-status');
  };
}, [socket]);


  return (
    <div className='w-full min-h-screen bg-[#fff9f6] flex justify-center px-4 '>
     <IoIosArrowRoundBack
    size={43}
    className="text-[#ff4d2d] absolute left-3 top-3 cursor-pointer"
    onClick={() => navigate("/")}
  />

      <div className='w-full max-w-[800px] p-4'>

        {/* Header */}
    <div className="relative mb-6 flex items-center justify-center">
  {/* 🔙 Back Arrow - Top Left me Absolute */}
 
  {/* 📝 Centered Text */}
 <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
  My Orders
</h1>

</div>



        {/* Orders List */}
        <div className='space-y-6'>
          {myOrders?.map((order, index) => (
            userData.role === "user" ? (
              <UserOrderCard data={order} key={index} />
            ) : userData.role === "owner" ? (
              <OwnerOrdercard data={order} key={index} />
            ) : null
          ))}
        </div>

      </div>
    </div>
  );
}

export default MyOrders;
