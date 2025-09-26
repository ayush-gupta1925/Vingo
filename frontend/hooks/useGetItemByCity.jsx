import React, { useEffect } from 'react'
import { serverUrl } from '../src/App'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setItemInMyCity, setShopsInMyCity, setUserData } from '../src/redux/userSlice'

function useGetItemByCity() {
const dispatch = useDispatch()
const {currentCity} = useSelector(state=>state.user)
  useEffect(()=>{
     const fetchItems = async()=>{


      try {
         const result = await axios.get(`${serverUrl}/api/item/get-by-city/${currentCity}`,{withCredentials:true})
         dispatch(setItemInMyCity(result.data))
         
      } catch (error) {
        return null
      }
     
     
     }
     fetchItems()
  },[currentCity])
}

export default useGetItemByCity