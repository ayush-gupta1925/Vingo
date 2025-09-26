
import React, { useEffect } from 'react'
import { serverUrl } from '../src/App'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAddress, setCurrentCity, setCurrentState } from '../src/redux/userSlice'
import { setAddress, setLocation } from '../src/redux/mapSlice'



function useGetCity() {
  const apiKey = import.meta.env.VITE_GEOAPIKEY
    const {userData} = useSelector(state=>state.user)
const dispatch = useDispatch()
  useEffect(()=>{
      navigator.geolocation.getCurrentPosition(async (position)=>{
        // console.log(position)
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        dispatch(setLocation({lat:latitude,lon:longitude}))
      
 
        const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`)



  
         // ✅ fallback: state_district → city
      const locationName = result?.data.results[0].state_district || result?.data.results[0].city;

        dispatch(setCurrentCity(locationName));
        dispatch(setCurrentState(result?.data.results[0].state))
        dispatch(setCurrentAddress(result?.data.results[0].address_line2 || result?.data.results[0].address_line1))

        dispatch(setAddress(result?.data.results[0].address_line2))
      })
  },[userData])
}

export default useGetCity