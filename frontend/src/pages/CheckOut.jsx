// import React, { useEffect, useState } from 'react'
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { IoLocation } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom';
// import { FaSearchLocation } from "react-icons/fa";
// import { BiCurrentLocation } from "react-icons/bi";
// import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
// import { MdDeliveryDining } from "react-icons/md";
// import { useDispatch, useSelector } from 'react-redux';
// import "leaflet/dist/leaflet.css"
// import { setAddress, setLocation } from '../redux/mapSlice';
// import { FaMobileAlt } from "react-icons/fa";
// import { FaRegCreditCard } from "react-icons/fa";
// import axios from 'axios';
// import { serverUrl } from '../App';
// import { addMyOrder, clearCart } from '../redux/userSlice';
// import { toast } from 'react-toastify';
// function CheckOut() {
//   const {location,address} = useSelector(state=>state.map)
//   const {cartItems , totalAmount,userData} = useSelector(state=>state.user)



//   const dispatch = useDispatch()
//   const [paymentMethod,setPaymentMethod] = useState("cod")
//   const [addressInput,setAddressInput] = useState("")
//   const apiKey = import.meta.env.VITE_GEOAPIKEY
//   const deliveryFee = totalAmount>500?0:40
// const AmountWithDeliveryFee = totalAmount+deliveryFee


// function RecenterMap (){
//   if(location.lat && location.lon){
//   const map = useMap()
//      map.setView([location.lat,location.lon],16,{animate:true})
//   }
// return null
// }

//   const onDragEnd = (e)=>{
//     const {lat,lng} = e.target._latlng
//      dispatch(setLocation({lat,lon:lng})) 
//      getAddressByLatLang(lat,lng)
   
//   }
//   const navigate = useNavigate()

//   const getCurrentLocation=()=>{
   
//     const latitude = userData.location.coordinates[1]
//     const longitude = userData.location.coordinates[0]

//           dispatch(setLocation({lat:latitude,lon:longitude}))
//           getAddressByLatLang(latitude,longitude)
  
//   }

//   const getAddressByLatLang = async(lat,lng)=>{
//        try {
        
//            const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`)
          
//            dispatch(setAddress(result?.data.results[0].address_line2))
//        } catch (error) {
//          console.log(error)
//        }
//   }

//   const getLatLngByAddress = async()=>{
// try {
//   const result = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${apiKey}`)
//    const {lat,lon} = result.data.features[0].properties
//    dispatch(setLocation({lat,lon}))
// } catch (error) {
//   console.log(error)
// }
//   }

// const hadnlePlaceOrder  = async()=>{
//   try {
//     const result = await axios.post(`${serverUrl}/api/order/place-order`,{paymentMethod,deliveryAddress:{
//       text:addressInput,
//       lattitude:location.lat,
//       longitude:location.lon
//     },
//   totalAmount:AmountWithDeliveryFee,
// cartItems},{withCredentials:true})

// if(paymentMethod == "cod"){
// dispatch(addMyOrder(result.data))
//   dispatch(clearCart()) 
//  navigate("/order-placed")
//  toast.success(result.data.message);
// }else{
// const orderId =result.data.orderId
// const razorOrder = result.data.razorOrder
// openRazorrpayWindow(orderId,razorOrder)
// }



//   } catch (error) {
//     console.log(error)
//   }
// }

// const openRazorrpayWindow = (orderId,razorOrder) =>{
//   try {
//     const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: razorOrder.amount,
//         currency:'INR',
//         name: "Vingo",
//         description: "Food Delivery WebSite",
//         order_id: razorOrder.id,
//         handler: async function (response) {
//           try {
//             const result = await axios.post(
//               `${serverUrl}/api/order/verify-payment`,
//               {razorpay_payment_id : response.razorpay_payment_id,orderId},{withCredentials:true}
//             );
//             dispatch(addMyOrder(result.data))
//   dispatch(clearCart()) 
//          navigate("/order-placed")
//             toast.success(result.data.message);
          
//           } catch (error) {
//             toast.error(
//               error?.result?.data?.message || "Payment verification failed"
//             );
//           }


//         }
//       };
//       const rzp = new window.Razorpay(options);
//       rzp.open();


//   } catch (error) {
//     console.log(error)
//   }
// }


//   useEffect(()=>{
//   setAddressInput(address)
//   },[address])
 
//   return (
//     <div className='min-h-screen bg-[#fff9f6] flex items-center justify-center p-6'>

//       <div className="absolute top-[20px] left-[20px] z-[10]">
//         <IoIosArrowRoundBack
//           size={45}
//           className="text-[#ff4d2d]"
//           onClick={() => navigate("/")}
//         />
//       </div>

//       <div className='w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-6 space-y-6'>
//     <h1 className='text-2xl font-bold text-gray-800 '>CheckOut</h1>

// {/* map  */}
//     <section>
//     <h2 className='text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800'> <IoLocation  className='w-[25px] h-[25px] text-[#ff4d2d]'/> Delivery Location </h2>

//     <div className='flex gap-2 mb-3'>
//       <input type='text' className='flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]' placeholder='Enter your Delivery Address' value={addressInput} onChange={(e)=>setAddressInput(e.target.value)} />
//       <button className='bg-[#ff4d2d] hover:bg-[#e64526] text-white px-3.5 py-2 rounded-lg flex items-center justify-center cursor-pointer' onClick={() => getLatLngByAddress()}
// ><FaSearchLocation size={18}/></button>
//       <button className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center cursor-pointer' onClick={getCurrentLocation}><BiCurrentLocation size={22} /></button>
//     </div>


// <div className='rounded-xl border overflow-hidden'>
// <div className='h-64 w-full flex items-center justify-center'>
// <MapContainer className={"w-full h-full"} 
// center={[location?.lat,location?.lon]}
// zoom={16}
 
// >

//   <TileLayer
//     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//   />

//   <RecenterMap location={location}/>
//    <Marker position={[location?.lat,location?.lon]} draggable  eventHandlers={{dragend : onDragEnd}}/>
// </MapContainer>
// </div>
// </div>

//     </section>
// {/* payment methods  */}
// <section >
// <h2 className='text-lg font-semibold mb-3 text-gray-800 '>Payment Method</h2>

// <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 '>
// {/* cod  */}
//   <div className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${paymentMethod == "cod" ? "border-[#ff4d2d] bg-orange-50 shadow" : "border-gray-200 hover:border-gray-300"}  cursor-pointer`} onClick={() =>setPaymentMethod("cod")}>
//    <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100'><MdDeliveryDining  className='text-green-600'/></span> 
//    <div>
//     <p className='font-medium text-gray-800'>Cash on Delivery</p>
//     <p className='text-xs text-gray-500'>Pay when your food arrives</p>
//    </div>
//   </div>
//   {/* online  */}
//   <div className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${paymentMethod == "online" ? "border-[#ff4d2d] bg-orange-50 shadow" : "border-gray-200 hover:border-gray-300"} cursor-pointer `} onClick={() =>setPaymentMethod("online")}>

// <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100'><FaMobileAlt  className='text-purple-700 text-lg'/></span>
// <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100'><FaRegCreditCard  className='text-blue-700 text-lg'/></span>
//   <div>
//     <p className='font-medium text-gray-800'>UPI / Credit / Debit Card</p>
//     <p className='text-xs text-gray-500'>Pay Securely Online</p>
//   </div>
//   </div>

// </div>



// </section>

// <section>
//   <h2 className='text-lg font-semibold mb-3'>Order Summary</h2>
//   <div className='rounded-xl border bg-gray-50 p-4 space-y-2'>
// {cartItems.map((item,index)=>(
// <div key={index} className='flex justify-between text-sm text-gray-700'>
// <span>{item.name} × {item.quantity}</span>
// <span> ₹ {item.price*item.quantity}</span>
// </div> 
// ))}
// <hr className='border-gray-200 my-2'/>
// <div className='flex justify-between font-medium text-gray-800'>
//   <span>SumTotal</span>
//   <span>{totalAmount}</span>
// </div>
// <div className='flex justify-between  text-gray-700'>
//   <span>Delivery Fee</span>
//   <span>{deliveryFee==0?"Free":deliveryFee}</span>
// </div>

// <div className='flex justify-between text-lg font-bold text-[#ff4d2d] pt-2'>
//   <span>Total</span>
//   <span>{AmountWithDeliveryFee}</span>
// </div>
//   </div>
// </section>
// <button className='w-full bg-[#ff4d2d] hover:bg-[#e64526] text-white rounded-xl font-semibold py-3 cursor-pointer'   onClick={hadnlePlaceOrder}>{paymentMethod == "cod"?"Place Order" : "Pay & Place Order"}</button>

//       </div>
//      </div> 
//   )
// }

// export default CheckOut




import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaSearchLocation } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { MdDeliveryDining } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import { setAddress, setLocation } from "../redux/mapSlice.js";
import { FaMobileAlt } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { addMyOrder, clearCart } from "../redux/userSlice.js";
import { toast } from "react-toastify";

function CheckOut() {
  const { location, address } = useSelector((state) => state.map);
  const { cartItems, totalAmount, userData } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [addressInput, setAddressInput] = useState("");
  const apiKey = import.meta.env.VITE_GEOAPIKEY;
  const deliveryFee = totalAmount > 500 ? 0 : 40;
  const AmountWithDeliveryFee = totalAmount + deliveryFee;

  function RecenterMap() {
    if (location.lat && location.lon) {
      const map = useMap();
      map.setView([location.lat, location.lon], 16, { animate: true });
    }
    return null;
  }

  const onDragEnd = (e) => {
    const { lat, lng } = e.target._latlng;
    dispatch(setLocation({ lat, lon: lng }));
    getAddressByLatLang(lat, lng);
  };
  const navigate = useNavigate();

  const getCurrentLocation = () => {
    const latitude = userData.location.coordinates[1];
    const longitude = userData.location.coordinates[0];

    dispatch(setLocation({ lat: latitude, lon: longitude }));
    getAddressByLatLang(latitude, longitude);
  };

  const getAddressByLatLang = async (lat, lng) => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`
      );

      dispatch(setAddress(result?.data.results[0].address_line2));
    } catch (error) {
      console.log(error);
    }
  };

  const getLatLngByAddress = async () => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          addressInput
        )}&apiKey=${apiKey}`
      );
      const { lat, lon } = result.data.features[0].properties;
      dispatch(setLocation({ lat, lon }));
    } catch (error) {
      console.log(error);
    }
  };

  const hadnlePlaceOrder = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/place-order`,
        {
          paymentMethod,
          deliveryAddress: {
            text: addressInput,
            lattitude: location.lat,
            longitude: location.lon,
          },
          totalAmount: AmountWithDeliveryFee,
          cartItems,
        },
        { withCredentials: true }
      );

      if (paymentMethod == "cod") {
        dispatch(addMyOrder(result.data));
        dispatch(clearCart());
        navigate("/order-placed");
        toast.success(result.data.message);
      } else {
        const orderId = result.data.orderId;
        const razorOrder = result.data.razorOrder;
        openRazorrpayWindow(orderId, razorOrder);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openRazorrpayWindow = (orderId, razorOrder) => {
    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorOrder.amount,
        currency: "INR",
        name: "Vingo",
        description: "Food Delivery WebSite",
        order_id: razorOrder.id,
        handler: async function (response) {
          try {
            const result = await axios.post(
              `${serverUrl}/api/order/verify-payment`,
              { razorpay_payment_id: response.razorpay_payment_id, orderId },
              { withCredentials: true }
            );
            dispatch(addMyOrder(result.data));
            dispatch(clearCart());
            navigate("/order-placed");
            toast.success(result.data.message);
          } catch (error) {
            toast.error(
              error?.result?.data?.message || "Payment verification failed"
            );
          }
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAddressInput(address);
  }, [address]);

  return (
    <div className="min-h-screen bg-[#fff9f6] flex items-center justify-center p-3 sm:p-6">
   <div className="absolute top-[10px] left-[10px] sm:top-[20px] sm:left-[20px] z-[10] hidden md:block">
  <IoIosArrowRoundBack
    size={40}
    className="sm:size-[50px] text-[#ff4d2d]"
    onClick={() => navigate("/")}
  />
</div>


      <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-4 sm:p-6 space-y-5 sm:space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex">
  <IoIosArrowRoundBack
    size={35}
    className="sm:size-[45px] text-[#ff4d2d] block md:hidden items-center gap-3"
    onClick={() => navigate("/")}
  />

CheckOut</h1>

        {/* map  */}
        <section>
          <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800">

            {" "}
            <IoLocation className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] text-[#ff4d2d]" />{" "}
            Delivery Location{" "}
          </h2>

          <div className="flex gap-2 mb-3 flex-col sm:flex-row">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
              placeholder="Enter your Delivery Address"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                className="bg-[#ff4d2d] hover:bg-[#e64526] text-white px-3 py-2 sm:px-3.5 sm:py-2 rounded-lg flex items-center justify-center cursor-pointer"
                onClick={() => getLatLngByAddress()}
              >
                <FaSearchLocation size={16} className="sm:size-[18px]" />
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center cursor-pointer"
                onClick={getCurrentLocation}
              >
                <BiCurrentLocation size={20} className="sm:size-[22px]" />
              </button>
            </div>
          </div>

          <div className="rounded-xl border overflow-hidden">
            <div className="h-52 sm:h-64 w-full flex items-center justify-center">
              <MapContainer
                className={"w-full h-full"}
                center={[location?.lat, location?.lon]}
                zoom={16}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <RecenterMap location={location} />
                <Marker
                  position={[location?.lat, location?.lon]}
                  draggable
                  eventHandlers={{ dragend: onDragEnd }}
                />
              </MapContainer>
            </div>
          </div>
        </section>

        {/* payment methods  */}
        <section>
          <h2 className="text-base sm:text-lg font-semibold mb-3 text-gray-800 ">
            Payment Method
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 ">
            {/* cod  */}
            <div
              className={`flex items-center gap-3 rounded-xl border p-3 sm:p-4 text-left transition ${
                paymentMethod == "cod"
                  ? "border-[#ff4d2d] bg-orange-50 shadow"
                  : "border-gray-200 hover:border-gray-300"
              }  cursor-pointer`}
              onClick={() => setPaymentMethod("cod")}
            >
              <span className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-green-100">
                <MdDeliveryDining className="text-green-600 text-sm sm:text-base" />
              </span>
              <div>
                <p className="font-medium text-sm sm:text-base text-gray-800">
                  Cash on Delivery
                </p>
                <p className="text-xs text-gray-500">
                  Pay when your food arrives
                </p>
              </div>
            </div>
            {/* online  */}
            <div
              className={`flex items-center gap-3 rounded-xl border p-3 sm:p-4 text-left transition ${
                paymentMethod == "online"
                  ? "border-[#ff4d2d] bg-orange-50 shadow"
                  : "border-gray-200 hover:border-gray-300"
              } cursor-pointer `}
              onClick={() => setPaymentMethod("online")}
            >
              <span className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-purple-100">
                <FaMobileAlt className="text-purple-700 text-sm sm:text-lg" />
              </span>
              <span className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-100">
                <FaRegCreditCard className="text-blue-700 text-sm sm:text-lg" />
              </span>
              <div>
                <p className="font-medium text-sm sm:text-base text-gray-800">
                  UPI / Credit / Debit Card
                </p>
                <p className="text-xs text-gray-500">Pay Securely Online</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-base sm:text-lg font-semibold mb-3">
            Order Summary
          </h2>
          <div className="rounded-xl border bg-gray-50 p-3 sm:p-4 space-y-2 text-sm sm:text-base">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-gray-700 text-sm sm:text-base"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span> ₹ {item.price * item.quantity}</span>
              </div>
            ))}
            <hr className="border-gray-200 my-2" />
            <div className="flex justify-between font-medium text-gray-800">
              <span>SumTotal</span>
              <span>{totalAmount}</span>
            </div>
            <div className="flex justify-between  text-gray-700">
              <span>Delivery Fee</span>
              <span>{deliveryFee == 0 ? "Free" : deliveryFee}</span>
            </div>

            <div className="flex justify-between text-base sm:text-lg font-bold text-[#ff4d2d] pt-2">
              <span>Total</span>
              <span>{AmountWithDeliveryFee}</span>
            </div>
          </div>
        </section>
        <button
          className="w-full bg-[#ff4d2d] hover:bg-[#e64526] text-white rounded-xl font-semibold py-2 sm:py-3 text-sm sm:text-base cursor-pointer"
          onClick={hadnlePlaceOrder}
        >
          {paymentMethod == "cod" ? "Place Order" : "Pay & Place Order"}
        </button>
      </div>
    </div>
  );
}

export default CheckOut;
