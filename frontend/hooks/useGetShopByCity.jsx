import React, { useEffect } from 'react'
import { serverUrl } from '../src/App'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setShopsInMyCity, setUserData } from '../src/redux/userSlice'
function useGetShopByCity() {
const dispatch = useDispatch()
const {currentCity} = useSelector(state=>state.user)
  useEffect(()=>{
     const fetchShop = async()=>{


      try {
         const result = await axios.get(`${serverUrl}/api/shop/get-by-city/${currentCity}`,{withCredentials:true})
         dispatch(setShopsInMyCity(result.data))
         
      } catch (error) {
         return null
      }
     
     
     }
     fetchShop()
  },[currentCity])
}

export default useGetShopByCity