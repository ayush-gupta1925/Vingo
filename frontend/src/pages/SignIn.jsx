import React from 'react'
import { useState } from 'react'
import { IoEye } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App.jsx';
import { ClipLoader } from "react-spinners";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase.js';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';
function SignIn() {
const primaryColor = "#ff4d2d" 
  const hoverColor = "#e64323"
  const bgColor = "#fff9f6"
  const borderColor = "#ddd"
  const [showPassword,setShowPassword] = useState(false)

  const navigate = useNavigate()

 const dispatch = useDispatch()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
 
    const [loading, setLoading] = useState(false);

   const handleSignIn = async()=>{
    setLoading(true)
      try {
         const result = await axios.post(`${serverUrl}/api/auth/signin`,{email,password}, {withCredentials:true})
         setLoading(false)
          
         setEmail("")
         setPassword("")
       
         dispatch(setUserData(result.data))
         toast.success("Login Successfully");
      } catch (error) {
        setLoading(false)
         toast.error(error.response?.data?.message || "Login failed!");
      }
   }




const handleGoogleAuth = async () => {


  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

  
    const email = result.user.email;

    const { data } = await axios.post(
      `${serverUrl}/api/auth/google-auth`,
      {
       
        email,
       
      },
      { withCredentials: true }
    );

    dispatch(setUserData(data))
    toast.success("Signed up with Google successfully!");
    navigate("/"); // redirect to home or dashboard
  } catch (error) {
    console.error("Google Auth Error:", error);
    toast.error("Google authentication failed!");
  }
};

  return (
    <div className='min-h-screen flex items-center justify-center p-4 w-full' style={{backgroundColor:bgColor}}>

     <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px] border-[${borderColor}]`} style={{
      border:`1px solid ${borderColor}`
     }}>
        <h1 className={`text-3xl font-bold mb-2 `} style={{color:primaryColor}}>Vingo</h1>
        <p className='text-gray-600 mb-8'>SignIn your account to get started with delicious food deliveries</p>



{/* email  */}
<div className='mb-4'>
   <label htmlFor='email' className='block text-gray-700 font-medium mb-1'>Email</label>
   <input type='email' className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter your email' style={{
      border:`1px solid ${borderColor}`
     }} onChange={(e)=>setEmail(e.target.value)} value={email}/>
</div>



{/* password  */}
<div className='mb-4'>
   <label htmlFor='password' className='block text-gray-700 font-medium mb-1'>Password</label>
<div className='relative'>
   <input type={`${showPassword ? "text" :"password"}`} className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter your Password' style={{
      border:`1px solid ${borderColor}`
     }} onChange={(e)=>setPassword(e.target.value)} value={password }/>
     <button className='absolute right-3 top-[15px] text-gray-500 ' onClick={()=>setShowPassword(prev => !prev)}>{!showPassword ? <IoEye /> : <IoEyeOffOutline  />
}</button>
</div>
</div>


<div className='text-right mb-4 text-[#ff4d2d] font-medium hover:underline cursor-pointer' onClick={()=>navigate("/forgot-password")}>Forgot Password</div>


<button className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer` } onClick={handleSignIn} disabled={loading}>    {loading ? <ClipLoader size={30} color="white" /> : "Sign In"}</button>

<button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100 cursor-pointer' onClick={handleGoogleAuth}><FcGoogle  size={20}/>
<span>SignIn with Google</span></button>

<p className='text-center mt-6 '>Create a new account <span className='text-[#ff4d2d] cursor-pointer hover:underline' onClick={()=>navigate("/signup")}>Sign Up</span></p>
     </div>
    </div>
  )
}

export default SignIn