import React, { useEffect } from 'react'
import { serverUrl } from '../src/App'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from '../src/redux/userSlice'

function useGetCurrentUser() {
  
const dispatch = useDispatch()
  useEffect(()=>{
     const fetchUser = async()=>{


      try {
         const result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
         dispatch(setUserData(result.data))
      } catch (error) {
        return null 
      }
     
     
     }
     fetchUser()
  },[])
}

export default useGetCurrentUser