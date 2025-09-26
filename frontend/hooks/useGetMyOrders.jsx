import React, { useEffect } from 'react'
import { serverUrl } from '../src/App'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setMyOrders, setUserData } from '../src/redux/userSlice'
import { setMyShopData } from '../src/redux/ownerSlice.js'

function useGetMyOrders() {
 const dispatch = useDispatch()
const {userData} = useSelector(state=>state.user)
  useEffect(()=>{
     const fetchOrders = async()=>{


      try {
         const result = await axios.get(`${serverUrl}/api/order/my-orders`,{withCredentials:true})
         dispatch(setMyOrders(result.data))
         
      } catch (error) { 
        return null
      }
     
     
     }
     fetchOrders()
  },[userData])
}

export default useGetMyOrders