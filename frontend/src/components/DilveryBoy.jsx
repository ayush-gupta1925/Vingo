// import React, { useEffect, useState } from 'react'
// import Nav from './Nav'
// import { useSelector } from 'react-redux'
// import axios from 'axios'
// import { serverUrl } from '../App'
// import DileveryBoyTracking from './DileveryBoyTracking'
// import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
// import { ClipLoader } from 'react-spinners'
// import { toast } from 'react-toastify'


// function DilveryBoy() {
//   const { userData , socket } = useSelector(state => state.user)

//   const [currentOrder,setCurrentOrder] = useState()
//   const [showOtpBox , setShowOtpBox] = useState(false)
//   const [availableAssignments, setAvailableAssignments] = useState([]) // ✅ empty array default
//   const [deliveryBoyLocation,setDeliveryBoyLocation] = useState(null)
 
//  const [loading,setLoading] = useState(false)
//  const [message,setMessage] = useState("")

//   const [toDayDeliveries,setToDayDeliveries] = useState([])
//  useEffect(()=>{
//   if(!socket || userData.role !== "deliveryBoy") return
//   let watchId 
//   if(navigator.geolocation){
//    watchId =  navigator.geolocation.watchPosition((position)=>{
//       const lattitude = position.coords.latitude
//       const longitude = position.coords.longitude

//   setDeliveryBoyLocation({lat:lattitude,lon:longitude})
//       socket.emit('updateLocation',{
//         lattitude,longitude,userId:userData._id
//       })

//     }),
//     (error)=>{
//       console.log(error)
//     },{
//       enabeHighAccuracy:true
//     }
//   }





//   return ()=>{
//     if(watchId)navigator.geolocation.clearWatch(watchId)
//   }

//  },[socket , userData]) 


//  const [otp,setOtp] = useState("")

//   const getAssignments = async () => {
//     try {
//       const result = await axios.get(
//         `${serverUrl}/api/order/get-assigments`,
//         { withCredentials: true }
//       )
  
//       setAvailableAssignments(result.data || []) // ✅ safe fallback
//     } catch (error) {
//       console.log(error)
//       setAvailableAssignments([]) // ✅ avoid null
//     }
//   }


//     const acceptOrder = async (assignmentId) => {
//     try {
//       const result = await axios.get(
//         `${serverUrl}/api/order/accept-order/${assignmentId}`,
//         { withCredentials: true }
//       )
    
      
//      await  getCurrentOrder()
  
//     } catch (error) {
//       console.log(error)
    
//     }
//   }

  





//   const getCurrentOrder = async()=>{
//     try {
//       const result = await axios.get(
//         `${serverUrl}/api/order/get-current-order`,
//         { withCredentials: true }
//       )
     
//      setCurrentOrder(result.data)
//     } catch (error) {
//       console.log(error)
    
//     }
//   }

    

//       const sendOtp = async () => {
//         setLoading(true)
//     try {
//       const result = await axios.post(
//         `${serverUrl}/api/order/send-delivery-otp`,{orderId:currentOrder._id,shopOrderId:currentOrder.shopOrder._id},
//         { withCredentials: true }
//       )
//        setLoading(false)
    
//        setShowOtpBox(true)
//        toast.success("OTP has been send Successfully !")

//     } catch (error) {
//       console.log(error)
//     setLoading(false)
//     toast.error("Send OTP Error !")
//     }
//   }

//         const verifyOtp = async () => {
         
//           setLoading(true)
//            setMessage("")
//     try {
//       const result = await axios.post(
//         `${serverUrl}/api/order/verify-delivery-otp`,{orderId:currentOrder._id,shopOrderId:currentOrder.shopOrder._id,otp},
//         { withCredentials: true }
//       )
//     setLoading(false)
     
//       setMessage(result.data)
//       location.reload()
//       toast.success("OTP has been Verified and Order Successfully Placed !")

//     } catch (error) {
//       console.log(error)
//       setLoading(false)
//     toast.error("OTP has been not  Verified  !")
//     }
//   }


//           const handleToDayDeliveries = async () => {
//     try {
//       const result = await axios.get(
//         `${serverUrl}/api/order/get-today-deliveries`,
//         { withCredentials: true }
//       )
    
    
//       setToDayDeliveries(result.data)

//     } catch (error) {
//       return null
    
//     }
//   }




  

//   useEffect(()=>{
//    socket?.on('newAssignment',(data)=>{
//     if(data.sendTo == userData._id){
//       setAvailableAssignments(prev=>[...prev,data])
//     }
    
//    })
//    return ()=>{
//     socket?.off('newAssignment')
//    }
//   },[socket])



//   const ratePerDelivery = 50
//   const totalEarning = toDayDeliveries.reduce((sum,d)=> sum + d.count*ratePerDelivery,0)



//   useEffect(() => {
//     if (userData) {
//       getAssignments()
//         getCurrentOrder()
//         handleToDayDeliveries()
      
//     }
//   }, [userData])



//   useEffect(() => {
//   if (!socket) return;

//   socket.on("deliveryBoyAssigned", (data) => {
  
//     // 👇 UI update karo (delivery boy show karna hai)
//   });

//   socket.on("orderDelivered", (data) => {
   
//     // 👇 UI update karo (status delivered kar do)
//   });

//   return () => {
//     socket.off("deliveryBoyAssigned");
//     socket.off("orderDelivered");
//   };
// }, [socket]);




//   return (
//     <div className='w-full min-h-screen bg-[#fff9f6] flex flex-col items-center overflow-hidden'>
//       <Nav />
//       <div className='w-full max-w-[800px] flex flex-col gap-5 items-center'>
//         <div className='bg-white rounded-2xl shadow-md p-5 flex flex-col justify-start items-center w-[90%] border border-orange-100 text-center gap-2'>
//           <h1 className='text-xl font-bold text-[#ff4d2d]'>
//             Welcome {userData.fullName}
//           </h1>
//           <p>
//             <span className='font-semibold'>Latitude : </span>
//             {deliveryBoyLocation?.lat || userData.location.coordinates[1]} ,{' '}
//             <span className='font-semibold'>Longitude : </span>
//             {deliveryBoyLocation?.lon || userData.location.coordinates[0]}
//           </p>
//         </div>


//  <div className='bg-white rounded-2xl shadow-2xl p-5 w-[90%] mb-6 border border-orange-100 '>
// <h1 className='text--lg font-bold mb-3 text-[#ff4d2d]'>Today Deliveries</h1>
// <ResponsiveContainer width="100%" height={200}>

// <BarChart data={toDayDeliveries}>
// <CartesianGrid strokeDasharray="3 3"/>
// <XAxis dataKey="hour" tickFormatter={(h)=>`${h}:00`}/>
// <YAxis  allowDecimals={false}/>
// <Tooltip formatter={(value)=>[value,"orders"]} labelFormatter={(label) => `${label}:00`}/>
// <Bar dataKey="count" fill='#ff4d2d'/>
// </BarChart>


// </ResponsiveContainer>


// <div className='max-w-sm mx-auto mt-6 p-6 bg-white rounded-2xl shadow-lg  text-center'>
// <h1 className='text-xl font-semibold text-gray-800 mb-2'>Total's Earning</h1>
// <span className='text-3xl font-bold  text-green-600'>₹ {totalEarning}</span>
// </div>


//  </div>


//         {!currentOrder &&      <div className='bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-100'>
//           <h1 className='text-lg font-bold mb-4 flex items-center gap-2'>
//             Available Orders
//           </h1>

          

//           <div className='space-y-4'>
//             {availableAssignments.length > 0 ? (
//               availableAssignments.map((a, index) => (
//                 <div
//                   className='border rounded-lg p-4 flex justify-between items-center'
//                   key={index}
//                 >
//       <div>
//         <p className='text-sm font-semibold'>{a?.shopName}</p>
//         <p className='text-sm  text-gray-500'><span className='font-semibold'>Delivery Address :</span>{a?.deliveryAddress.text}</p>
//         <p className='text-sm  text-gray-400'>{a.items.length} item | {a.subTotal}</p>
//       </div>

//       <button className='bg-orange-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-orange-600 cursor-pointer' onClick={()=>acceptOrder(a.assignmentId)}>Accept</button>
//     </div>
//               ))
//             ) : (
//               <p>No Available Orders</p>
//             )}
//           </div>


//         </div> }

// {currentOrder && <div className='bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-100'>

// <h2 className='text-lg font-bold mb-3'>📦 Current Order</h2>
// <div className='border rounded-lg p-4 mb-3'>
//   <p className='font-semibold text-sm'>
//     {currentOrder?.shopOrder?.shop?.name || "Loading shop..."}
//   </p>
//   <p className='text-sm text-gray-500 '>
//     {currentOrder?.deliveryAddress?.text || "Loading address..."}
//   </p>
//   <p className='text-sm text-gray-400'>
//     {currentOrder?.shopOrder?.shopOrderItems?.length || 0} item | ₹{currentOrder?.shopOrder?.subTotal || 0}
//   </p>
// </div>


// <DileveryBoyTracking data={{deliveryBoyLocation: deliveryBoyLocation || {
     
//     lat:userData.location.coordinates[1],
//     lon:userData.location.coordinates[0]
//   },
//    customerLocation:{
//     lat:currentOrder.deliveryAddress.lattitude,
//     lon:currentOrder.deliveryAddress.longitude
//    }}}/>


// {/* 
// {!showOtpBox ? <button className='mt-4 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-green-600 active:scale-95 transition-all duration-200 cursor-pointer' onClick={sendOtp} disabled={loading}>    {loading ? <ClipLoader size={30} color="white" /> : "Mark as Delivered"}</button> : <div className='mt-4 p-4 border rounded-xl bg-gray-50'>
//   <p className='text-xl font-semibold mb-2'>Enter Otp send to <span className='text-orange-500'>{currentOrder.user.fullName}</span></p>
//   <input type='text' className='w-full border px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400
//   ' placeholder='Enter Otp' onChange={(e) => setOtp(e.target.value)}
//               value={otp}/>

// {message && <p className='text-center text-green-400'>{message}</p>}


//   <button className='w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all cursor-pointer' onClick={verifyOtp} disabled={loading}>    {loading ? <ClipLoader size={30} color="white" /> : "Submit Otp"}</button>
// </div>}
//   */}


//   {!showOtpBox ? (
//   <button
//     className="mt-4 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-green-600 active:scale-95 transition-all duration-200 cursor-pointer"
//     onClick={sendOtp}
//     disabled={loading}
//   >
//     {loading ? <ClipLoader size={30} color="white" /> : "Mark as Delivered"}
//   </button>
// ) : (
//   <div className="mt-4 p-4 border rounded-xl bg-gray-50">
//     <p className="text-xl font-semibold mb-2">
//       Enter Otp sent to{" "}
//       <span className="text-orange-500">{currentOrder.user.fullName}</span>
//     </p>

//     <input
//       type="text"
//       className="w-full border px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
//       placeholder="Enter Otp"
//       onChange={(e) => setOtp(e.target.value)}
//       value={otp}
//     />

//     {message && <p className="text-center text-green-400">{message}</p>}
   

//     <button
//       className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all cursor-pointer"
//       onClick={async () => {
//         setLoading(true);
//         try {
//           const verified = await verifyOtp(); // ✅ verifyOtp function true/false return kare
//           if (!verified) {
//             // ✅ OTP galat hua to fir se OTP send kar do
//             await sendOtp();
            
//           } else {
//             setMessage("OTP verified successfully ✅");
           
//             // yaha pe tu order ko delivered mark kar sakta h
//           }
//         } catch (err) {
//           console.error(err);
          
//         } finally {
//           setLoading(false);
//         }
//       }}
//       disabled={loading}
//     >
//       {loading ? <ClipLoader size={30} color="white" /> : "Submit Otp"}
//     </button>
//   </div>
// )}


// </div>
// }
    


//       </div>
//     </div>
//   )
// }

// export default DilveryBoy




import React, { useEffect, useState } from 'react'
import Nav from './Nav.jsx'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App.jsx'
import DileveryBoyTracking from './DileveryBoyTracking.jsx'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'

function DilveryBoy() {
  const { userData , socket } = useSelector(state => state.user)

  const [currentOrder,setCurrentOrder] = useState()
  const [showOtpBox , setShowOtpBox] = useState(false)
  const [availableAssignments, setAvailableAssignments] = useState([])
  const [deliveryBoyLocation,setDeliveryBoyLocation] = useState(null)
 

const [otpVerified, setOtpVerified] = useState(false) // ✅ new state

  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState("")
  const [otp,setOtp] = useState("")
  const [toDayDeliveries,setToDayDeliveries] = useState([])

  useEffect(()=>{
    if(!socket || userData.role !== "deliveryBoy") return
    let watchId 
    if(navigator.geolocation){
      watchId =  navigator.geolocation.watchPosition((position)=>{
        const lattitude = position.coords.latitude
        const longitude = position.coords.longitude
        setDeliveryBoyLocation({lat:lattitude,lon:longitude})
        socket.emit('updateLocation',{ lattitude,longitude,userId:userData._id })
      }),
      (error)=>{ console.log(error) },
      { enabeHighAccuracy:true }
    }
    return ()=>{ if(watchId)navigator.geolocation.clearWatch(watchId) }
  },[socket , userData]) 

  const getAssignments = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-assigments`,{ withCredentials: true })
      setAvailableAssignments(result.data || [])
    } catch (error) {
      console.log(error)
      setAvailableAssignments([])
    }
  }

  const acceptOrder = async (assignmentId) => {
    try {

    setAvailableAssignments(prev =>
      prev.filter(a => a.assignmentId !== assignmentId)
    );

      await axios.get(`${serverUrl}/api/order/accept-order/${assignmentId}`,{ withCredentials: true })
      await getCurrentOrder()
    } catch (error) {
      console.log(error)
    }
  }

  const getCurrentOrder = async()=>{
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-current-order`,{ withCredentials: true })
      setCurrentOrder(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const sendOtp = async () => {
    setLoading(true)
    try {
      await axios.post(`${serverUrl}/api/order/send-delivery-otp`,
        { orderId:currentOrder._id,shopOrderId:currentOrder.shopOrder._id },
        { withCredentials: true }
      )
      setLoading(false)
      setShowOtpBox(true)
      toast.success("OTP has been sent successfully !")
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error("Send OTP Error !")
    }
  }

  // ✅ verifyOtp ab true/false return karega
  // const verifyOtp = async () => {
  //   setLoading(true)
  //   setMessage("")
  //   try {
  //     const result = await axios.post(
  //       `${serverUrl}/api/order/verify-delivery-otp`,
  //       { orderId:currentOrder._id, shopOrderId:currentOrder.shopOrder._id, otp },
  //       { withCredentials: true }
  //     )
  //     setLoading(false)
  //     setMessage(result.data)
     
  //     location.reload()
  //     toast.success("✅ OTP Verified & Order Placed Successfully!")
  //     return true   // OTP sahi h
  //   } catch (error) {
  //     console.log(error)
  //     setLoading(false)
  //     toast.error("❌ OTP Verification Failed!")
  //     return false  // OTP galat h
  //   }
  // }



  // verifyOtp function
const verifyOtp = async () => {
  setLoading(true)
  setMessage("")
  try {
    const result = await axios.post(
      `${serverUrl}/api/order/verify-delivery-otp`,
      { orderId: currentOrder._id, shopOrderId: currentOrder.shopOrder._id, otp },
      { withCredentials: true }
    )
    setLoading(false)
    setMessage(result.data)

    setOtpVerified(true)   // ✅ ab reload nahi, flag ko true karo
    return true
  } catch (error) {
    console.log(error)
    setLoading(false)
    toast.error("❌ OTP Verification Failed!")
    return false
  }
}

  const handleToDayDeliveries = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-today-deliveries`,{ withCredentials: true })
      setToDayDeliveries(result.data)
    } catch (error) {
      return null
    }
  }

  // useEffect(()=>{
  //   socket?.on('newAssignment',(data)=>{
  //     if(data.sendTo == userData._id){
  //       setAvailableAssignments(prev=>[...prev,data])
  //     }
  //   })
  //   return ()=>{ socket?.off('newAssignment') }
  // },[socket])




  useEffect(() => {
  if (!socket || userData.role !== "deliveryBoy") return;

  socket.on("newAssignment", (data) => {
    if (data.sendTo == userData._id) {
      setAvailableAssignments(prev => [...prev, data]);
    }
  });

  // ✅ New event for removing assignments
  socket.on("assignmentRemoved", ({ assignmentId }) => {
    setAvailableAssignments(prev =>
      prev.filter(a => a.assignmentId !== assignmentId)
    );
  });

  return () => {
    socket.off("newAssignment");
    socket.off("assignmentRemoved");
  };
}, [socket, userData]);


  const ratePerDelivery = 50
  const totalEarning = toDayDeliveries.reduce((sum,d)=> sum + d.count*ratePerDelivery,0)

  useEffect(() => {
    if (userData) {
      getAssignments()
      getCurrentOrder()
      handleToDayDeliveries()
    }
  }, [userData])

  return (
    <div className='w-full min-h-screen bg-[#fff9f6] flex flex-col items-center overflow-hidden'>
      <Nav />
      <div className='w-full max-w-[800px] flex flex-col gap-5 items-center'>

        {/* Delivery Boy Info */}
        <div className='bg-white rounded-2xl shadow-md p-5 flex flex-col justify-start items-center w-[90%] border border-orange-100 text-center gap-2'>
          <h1 className='text-xl font-bold text-[#ff4d2d]'>
            Welcome {userData.fullName}
          </h1>
          <p>
            <span className='font-semibold'>Latitude : </span>
            {deliveryBoyLocation?.lat || userData.location.coordinates[1]} ,{' '}
            <span className='font-semibold'>Longitude : </span>
            {deliveryBoyLocation?.lon || userData.location.coordinates[0]}
          </p>
        </div>

        {/* Today Deliveries */}
        <div className='bg-white rounded-2xl shadow-2xl p-5 w-[90%] mb-6 border border-orange-100 '>
          <h1 className='text--lg font-bold mb-3 text-[#ff4d2d]'>Today Deliveries</h1>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={toDayDeliveries}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="hour" tickFormatter={(h)=>`${h}:00`}/>
              <YAxis allowDecimals={false}/>
              <Tooltip formatter={(value)=>[value,"orders"]} labelFormatter={(label) => `${label}:00`}/>
              <Bar dataKey="count" fill='#ff4d2d'/>
            </BarChart>
          </ResponsiveContainer>
          <div className='max-w-sm mx-auto mt-6 p-6 bg-white rounded-2xl shadow-lg  text-center'>
            <h1 className='text-xl font-semibold text-gray-800 mb-2'>Total's Earning</h1>
            <span className='text-3xl font-bold  text-green-600'>₹ {totalEarning}</span>
          </div>
        </div>

        {/* Available Orders */}
        {!currentOrder && <div className='bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-100'>
          <h1 className='text-lg font-bold mb-4 flex items-center gap-2'>Available Orders</h1>
          <div className='space-y-4'>
            {availableAssignments.length > 0 ? (
              availableAssignments.map((a, index) => (
                <div className='border rounded-lg p-4 flex justify-between items-center' key={index}>
                  <div>
                    <p className='text-sm font-semibold'>{a?.shopName}</p>
                    <p className='text-sm  text-gray-500'><span className='font-semibold'>Delivery Address :</span>{a?.deliveryAddress.text}</p>
                    <p className='text-sm  text-gray-400'>{a.items.length} item | {a.subTotal}</p>
                  </div>
                  <button className='bg-orange-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-orange-600 cursor-pointer' onClick={()=>acceptOrder(a.assignmentId)}>Accept</button>
                </div>
              ))
            ) : (
              <p>No Available Orders</p>
            )}
          </div>
        </div> }

        {/* Current Order */}
        {currentOrder && <div className='bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-100'>
          <h2 className='text-lg font-bold mb-3'>📦 Current Order</h2>
          <div className='border rounded-lg p-4 mb-3'>
            <p className='font-semibold text-sm'>{currentOrder?.shopOrder?.shop?.name || "Loading shop..."}</p>
            <p className='text-sm text-gray-500 '>{currentOrder?.deliveryAddress?.text || "Loading address..."}</p>
            <p className='text-sm text-gray-400'>
              {currentOrder?.shopOrder?.shopOrderItems?.length || 0} item | ₹{currentOrder?.shopOrder?.subTotal || 0}
            </p>
          </div>

          {/* Map Tracking */}
          <DileveryBoyTracking data={{
            deliveryBoyLocation: deliveryBoyLocation || { lat:userData.location.coordinates[1], lon:userData.location.coordinates[0] },
            customerLocation:{ lat:currentOrder.deliveryAddress.lattitude, lon:currentOrder.deliveryAddress.longitude }
          }}/>

          {/* OTP Section */}
          {/* {!showOtpBox ? (
            <button
              className="mt-4 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-green-600 active:scale-95 transition-all duration-200 cursor-pointer"
              onClick={sendOtp}
              disabled={loading}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Mark as Delivered"}
            </button>
          ) : (
            <div className="mt-4 p-4 border rounded-xl bg-gray-50">
              <p className="text-xl font-semibold mb-2">
                Enter Otp sent to{" "}
                <span className="text-orange-500">{currentOrder.user.fullName}</span>
              </p>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter Otp"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
              {message && <p className="text-center text-green-400">{message.message}</p>}

              <button
                className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all cursor-pointer"
                onClick={async () => {
                  setLoading(true)
                  try {
                    const verified = await verifyOtp()
                    if (!verified) {
                      // ❌ OTP galat hua => dobara OTP send hoga
                      await sendOtp()
                    }
                  } catch (err) {
                    console.error(err)
                  } finally {
                    setLoading(false)
                  }
                }}
                disabled={loading}
              >
                {loading ? <ClipLoader size={30} color="white" /> : "Submit Otp"}
              </button>
            </div>
          )} */}
                

          {!showOtpBox ? (
  <button
    className="mt-4 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-green-600 active:scale-95 transition-all duration-200 cursor-pointer"
    onClick={sendOtp}
    disabled={loading}
  >
    {loading ? <ClipLoader size={30} color="white" /> : "Mark as Delivered"}
  </button>
) : (
  <div className="mt-4 p-4 border rounded-xl bg-gray-50">
    {!otpVerified ? (
      <>
        <p className="text-xl font-semibold mb-2">
          Enter Otp sent to{" "}
          <span className="text-orange-500">{currentOrder.user.fullName}</span>
        </p>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Enter Otp"
          onChange={(e) => setOtp(e.target.value)}
          value={otp}
        />
        {message && (
          <p className="text-center text-green-400">
            {typeof message === "object" ? message.message : message}
          </p>
        )}

        <button
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all cursor-pointer"
          onClick={async () => {
            setLoading(true)
            try {
              const verified = await verifyOtp()
              if (!verified) {
                // ❌ OTP galat hua => dobara OTP send hoga
                await sendOtp()
              }
            } catch (err) {
              console.error(err)
            } finally {
              setLoading(false)
            }
          }}
          disabled={loading}
        >
          {loading ? <ClipLoader size={30} color="white" /> : "Submit Otp"}
        </button>
      </>
    ) : (
      // ✅ OTP Verified hone ke baad Place Order Button
      <button
        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all cursor-pointer"
        onClick={() => {

          location.reload() // ✅ ab yaha reload karna
        }}
      >
        Place Order
      </button>
    )}
  </div>
)}










        </div>}
      </div>
    </div>
  )
}

export default DilveryBoy
