import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import { toast, ToastContainer } from "react-toastify";
import useGetCurrentUser from '../hooks/useGetCurrentUser.js'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home.jsx'
import useGetCity from '../hooks/useGetCity.jsx'
import useGetMyShop from '../hooks/useGetMyShop.jsx'
import CreateEditShop from './pages/CreateEditShop.jsx'
import AddItem from './pages/AddItem.jsx'
import EditItem from './pages/EditItem.jsx'
import useGetShopByCity from '../hooks/useGetShopByCity.jsx'
import useGetItemByCity from '../hooks/useGetItemByCity.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckOut from './pages/CheckOut.jsx'
import OrderPlaced from './pages/OrderPlaced.jsx'
import MyOrders from './pages/MyOrders.jsx'
import useGetMyOrders from '../hooks/useGetMyOrders.jsx'
import useUpdateLocation from '../hooks/useUpdateLocation.jsx'
import TrackOrderPage from './pages/TrackOrderPage.jsx'
import Shop from './pages/Shop.jsx'
import { io } from 'socket.io-client'
import { setSocket } from './redux/userSlice.js'
import Ai from './pages/Ai.jsx'

export const serverUrl = "https://vingo-backend-8c0o.onrender.com"


export default function App() {
  useUpdateLocation()
  useGetCurrentUser()
  useGetCity()
  useGetMyShop()
  useGetShopByCity()
  useGetItemByCity()
  useGetMyOrders()
  const {userData , socket} = useSelector(state=>state.user)
  const dispatch = useDispatch()
useEffect(()=>{
const socketInstance = io(serverUrl,{
  withCredentials:true
})
dispatch(setSocket(socketInstance))
socketInstance.on('connect',(socket)=>{
  if(userData){
    socketInstance.emit('identity',{userId:userData._id})
  }
})
return ()=>{
  socketInstance.disconnect()
}
},[userData?._id])

  
  useEffect(() => {
    if (!socket) return;

    // 🛒 User ne order place kiya -> Owner ko notify
    socket.on("newOrder", (data) => {
      toast.info(`📦 New order received`);
    });

    // 🏷 Owner ne status change kiya -> User aur Delivery Boy dono ko notify
    socket.on("update-status", (data) => {
      toast.info(`Order status updated: ${data.status}`);
    });

    // 🚴 Delivery boy ko assignment gaya
    socket.on("newAssignment", (data) => {
      toast.success(`New assignment from ${data.shopName}`);
    });

    // 🚴 Delivery boy ne order accept kiya
    socket.on("deliveryBoyAssigned", (data) => {
      toast.success(`Delivery boy ${data.fullName || "accepted"} the order`);
    });

    // ✅ Delivery boy ne OTP verify karke deliver kar diya
    socket.on("orderDelivered", (data) => {
      toast.success("🎉 Order delivered successfully!");
    });

    return () => {
      socket.off("newOrder");
      socket.off("update-status");
      socket.off("newAssignment");
      socket.off("deliveryBoyAssigned");
      socket.off("orderDelivered");
    };
  }, [socket]);

  return <>
<ToastContainer
 
  style={{ zIndex: 999999 }}
/>


{/* Delivery Boy accept the order Successfully  */}
  <Routes>

      <Route path='/signup' element={!userData ? <SignUp/> : <Navigate to={"/"}/>}/>
      <Route path='/signin' element={ !userData ? <SignIn/> : <Navigate to={"/"}/>}/>
      <Route path='/forgot-password' element={ !userData ? <ForgotPassword/> : <Navigate to={"/"}/>}/>

       <Route path='/' element={userData ? <Home/> : <Navigate to={"/signin"}/>}/>

      <Route path='/create-edit-shop' element={userData ? <CreateEditShop/> : <Navigate to={"/signin"}/>}/>
       
        <Route path='/add-item' element={userData ? <AddItem/> : <Navigate to={"/signin"}/>}/>
         <Route path='/edit-item/:itemId' element={userData ? <EditItem/> : <Navigate to={"/signin"}/>}/>

           <Route path='/cart' element={userData ? <CartPage/> : <Navigate to={"/signin"}/>}/>

            <Route path='/checkout' element={userData ? <CheckOut/> : <Navigate to={"/signin"}/>}/>

            <Route path='/order-placed' element={userData ? <OrderPlaced/> : <Navigate to={"/signin"}/>}/>

 <Route path='/my-orders' element={userData ? <MyOrders/> : <Navigate to={"/signin"}/>}/>

 <Route path='/track-order/:orderId' element={userData ? <TrackOrderPage/> : <Navigate to={"/signin"}/>}/>

  <Route path='/shop/:shopId' element={userData ? <Shop/> : <Navigate to={"/signin"}/>}/>





  </Routes>

  <Ai/>
 </>

}
