import React, { useEffect } from 'react'
import { serverUrl } from '../src/App'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../src/redux/userSlice'
import { setMyShopData } from '../src/redux/ownerSlice.js'

function useGetMyShop() {
 
const dispatch = useDispatch()
const {userData} = useSelector(state=>state.user)
  useEffect(()=>{
     const fetchShop = async()=>{


      try {
         const result = await axios.get(`${serverUrl}/api/shop/get-my`,{withCredentials:true})
         dispatch(setMyShopData(result.data))
      } catch (error) {
        return null
      }
     
     
     }
     fetchShop()
  },[userData])
}

export default useGetMyShop