import React, { useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App.jsx';
import axios from 'axios';
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
function ForgotPassword() {
  const [step,setStep] = useState(1)
  const [email,setEmail]  = useState("")
  const navigate  = useNavigate()
  const [otp,setOtp] = useState("")
  const [newPassword,setNewPassword] = useState("")
   const [confirmPassword,setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false);


  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/send-otp",
        { email },
        { withCredentials: true }
      );

      setLoading(false);
      setStep(2);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const verifyOTp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/verify-otp",
        { email, otp },
        { withCredentials: true }
      );

      setLoading(false);
      setStep(3);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (newPassword != confirmPassword) {
        return toast.error("Password is not Match");
      }

      const result = await axios.post(
        serverUrl + "/api/auth/reset-password",
        { email, password: newPassword },
        { withCredentials: true }
      );

      setLoading(false);
      navigate("/signin");
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };




  
  return (
    <div className='flex items-center justify-center min-h-screen p-4 w-full bg-[#fff9f6]'>
    <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>

    <div className='flex items-center gap-4 mb-4'>

    <IoArrowBack className='text-[#ff4d2d] cursor-pointer'  size={20} onClick={()=>navigate("/signin")}/>
         <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
    </div>
    {
      step == 1 && <div>
       {/* email  */}
<div className='mb-6'>
   <label htmlFor='email' className='block text-gray-700 font-medium mb-1'>Email</label>
   <input type='email' className='w-full  rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[1px] border-gray-200' placeholder='Enter your Email ' onChange={(e)=>setEmail(e.target.value)} value={email}/>
</div>


<button className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer` }    disabled={loading}
            onClick={sendOtp}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}</button>


      </div>

    }




 {
      step == 2 && <div>
       {/* email  */}
<div className='mb-6'>
   <label htmlFor='email' className='block text-gray-700 font-medium mb-1'> OTP</label>
   <input type='text' className='w-full  rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[1px] border-gray-200' placeholder='Enter Otp ' onChange={(e)=>setOtp(e.target.value)} value={otp}/>
</div>



<button className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer` }   disabled={loading} onClick={verifyOTp}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "  Verify OTP"}</button>


      </div>

    }



{
      step == 3 && <div>
       {/* email  */}
<div className='mb-6'>
   <label htmlFor='newPassword' className='block text-gray-700 font-medium mb-1'> New Password</label>
   <input type='text' className='w-full  rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[1px] border-gray-200' placeholder='Enter New Password ' onChange={(e)=>setNewPassword(e.target.value)} value={newPassword}/>
</div>
<div className='mb-6'>
   <label htmlFor='confirmPassword' className='block text-gray-700 font-medium mb-1'> Confirm Password</label>
   <input type='password' className='w-full  rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[1px] border-gray-200' placeholder='Enter Otp ' onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}/>
</div>


<button className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer` }     disabled={loading} onClick={resetPassword}
          >
            {loading ? (
              <ClipLoader size={30} color="white" />
            ) : (
              " Reset Password"
            )}</button>


      </div>

    }
   



   
    </div>

    </div>
  )
}

export default ForgotPassword