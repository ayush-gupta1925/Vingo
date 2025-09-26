// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { serverUrl } from '../App'
// import DileveryBoyTracking from '../components/DileveryBoyTracking';
// import { useSelector } from 'react-redux';

// function TrackOrderPage() {
//   const navigate = useNavigate()
//   const { orderId } = useParams()
//   const [currentOrder, setCurrentOrder] = useState()
//   const { socket } = useSelector(state => state.user)
//   const [liveLocation, setLiveLocation] = useState({})

//   const handleGetOrder = async () => {
//     try {
//       const result = await axios.get(
//         `${serverUrl}/api/order/get-order-by-id/${orderId}`,
//         { withCredentials: true }
//       )
//       setCurrentOrder(result.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     if (!socket) return;

//     socket.on("deliveryBoyAssigned", (data) => {
//       if (data.orderId === orderId) {
//         handleGetOrder();
//       }
//     });

//     socket.on("orderDelivered", (data) => {
//       if (data.orderId === orderId) {
//         handleGetOrder();
//       }
//     });

//     socket.on("updateDeliveryLocation", (data) => {
//       setLiveLocation(prev => ({
//         ...prev,
//         [data.deliveryBoyId]: { lat: data.lattitude, lon: data.longitude },
//       }));
//     });

//     return () => {
//       socket.off("deliveryBoyAssigned");
//       socket.off("orderDelivered");
//       socket.off("updateDeliveryLocation");
//     };
//   }, [socket, orderId]);

//   useEffect(() => {
//     handleGetOrder()
//   }, [orderId])

//   return (
//     <div className="w-full min-h-screen bg-[#fff9f6] py-6 px-4 flex justify-center">
//        <IoIosArrowRoundBack
//             size={45}
//             className="text-[#ff4d2d] absolute left-3 top-3 cursor-pointer"
//             onClick={() => navigate("/my-orders")}
//           />
//       <div className="w-full max-w-3xl space-y-6">
        
//         {/* 🔙 Back + Title */}
//         <div className="relative flex items-center justify-center mb-6">
       
//           <h1 className="text-[30px] font-bold text-gray-800">Track Order</h1>
//         </div>

//         {currentOrder?.shopOrders?.map((shopOrder, index) => (
//           <div
//             key={index}
//             className="bg-white border border-orange-200 rounded-2xl shadow-md p-5 space-y-4 hover:shadow-lg transition-shadow duration-300"
//           >
//             {/* 🏪 Shop Info */}
//             <div>
//               <p className="text-lg font-bold text-[#ff4d2d] mb-1">{shopOrder.shop.name}</p>
//               <p className="font-medium text-gray-700">
//                 <span className="font-semibold text-gray-800">Items : </span>
//                 {shopOrder.shopOrderItems.map(i => i.name).join(", ")}
//               </p>
//               <p className="text-gray-700">
//                 <span className="font-semibold text-gray-800">SubTotal : </span> ₹ {shopOrder.subTotal}
//               </p>
//               <p className="mt-3 text-gray-700">
//                 <span className="font-semibold text-gray-800">Delivery Address : </span>
//                 {currentOrder.deliveryAddress?.text}
//               </p>
//             </div>

//             {/* 🚚 Delivery Info */}
//             {shopOrder.status !== "delivered" ? (
//               shopOrder.assignedDilveryBoy ? (
//                 <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
//                   <p className="text-sm text-gray-800">
//                     <span className="font-semibold text-gray-900">Delivery Boy : </span>
//                     {shopOrder.assignedDilveryBoy.fullName}
//                   </p>
//                   <p className="text-sm text-gray-800">
//                     <span className="font-semibold text-gray-900">Contact : </span>
//                     {shopOrder.assignedDilveryBoy.mobile}
//                   </p>
//                 </div>
//               ) : (
//                 <p className="text-sm text-gray-500 italic">
//                   Delivery Boy is not assigned yet.
//                 </p>
//               )
//             ) : (
//               <p className="text-green-600 font-semibold text-lg">✅ Delivered</p>
//             )}

//             {/* 🗺️ Map Tracking */}
//             {(shopOrder.assignedDilveryBoy && shopOrder.status !== "delivered") && (
//               <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-md border border-gray-200">
//                 <DileveryBoyTracking
//                   data={{
//                     deliveryBoyLocation:
//                       liveLocation[shopOrder.assignedDilveryBoy._id] || {
//                         lat: shopOrder.assignedDilveryBoy.location.coordinates[1],
//                         lon: shopOrder.assignedDilveryBoy.location.coordinates[0],
//                       },
//                     customerLocation: {
//                       lat: currentOrder.deliveryAddress.lattitude,
//                       lon: currentOrder.deliveryAddress.longitude,
//                     },
//                   }}
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default TrackOrderPage




import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
import { serverUrl } from '../App.jsx'
import DileveryBoyTracking from '../components/DileveryBoyTracking.jsx';
import { useSelector } from 'react-redux';

function TrackOrderPage() {
  const navigate = useNavigate()
  const { orderId } = useParams()
  const [currentOrder, setCurrentOrder] = useState()
  const { socket } = useSelector(state => state.user)
  const [liveLocation, setLiveLocation] = useState({})

  const handleGetOrder = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/get-order-by-id/${orderId}`,
        { withCredentials: true }
      )
      setCurrentOrder(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!socket) return;

    socket.on("deliveryBoyAssigned", (data) => {
      if (data.orderId === orderId) {
        handleGetOrder();
      }
    });

    socket.on("orderDelivered", (data) => {
      if (data.orderId === orderId) {
        handleGetOrder();
      }
    });

    socket.on("updateDeliveryLocation", (data) => {
      setLiveLocation(prev => ({
        ...prev,
        [data.deliveryBoyId]: { lat: data.lattitude, lon: data.longitude },
      }));
    });

    return () => {
      socket.off("deliveryBoyAssigned");
      socket.off("orderDelivered");
      socket.off("updateDeliveryLocation");
    };
  }, [socket, orderId]);

  useEffect(() => {
    handleGetOrder()
  }, [orderId])

  return (
    <div className="w-full min-h-screen bg-[#fff9f6] py-4 px-2 sm:px-4 flex justify-center">
       {/* 🔙 Back Button */}
       <IoIosArrowRoundBack
            size={30} // Small devices me chota
            className="sm:absolute left-2 sm:left-3 top-2 sm:top-3 text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate("/my-orders")}
          />

      <div className="w-full max-w-3xl space-y-6">
        
        {/* 🔹 Title */}
        <div className="relative flex items-center justify-center mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 text-center">
            Track Order
          </h1>
        </div>

        {currentOrder?.shopOrders?.map((shopOrder, index) => (
          <div
            key={index}
            className="bg-white border border-orange-200 rounded-2xl shadow-md p-3 sm:p-5 space-y-3 sm:space-y-4 hover:shadow-lg transition-shadow duration-300"
          >
            {/* 🏪 Shop Info */}
            <div className="space-y-1 sm:space-y-2">
              <p className="text-sm sm:text-lg font-bold text-[#ff4d2d] mb-1">{shopOrder.shop.name}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-700">
                <span className="font-semibold text-gray-800">Items: </span>
                {shopOrder.shopOrderItems.map(i => i.name).join(", ")}
              </p>
              <p className="text-xs sm:text-sm text-gray-700">
                <span className="font-semibold text-gray-800">SubTotal: </span> ₹ {shopOrder.subTotal}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-gray-700">
                <span className="font-semibold text-gray-800">Delivery Address: </span>
                {currentOrder.deliveryAddress?.text}
              </p>
            </div>

            {/* 🚚 Delivery Info */}
            {shopOrder.status !== "delivered" ? (
              shopOrder.assignedDilveryBoy ? (
                <div className="bg-orange-50 border border-orange-200 p-2 sm:p-3 rounded-lg text-xs sm:text-sm text-gray-800">
                  <p>
                    <span className="font-semibold text-gray-900">Delivery Boy: </span>
                    {shopOrder.assignedDilveryBoy.fullName}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">Contact: </span>
                    {shopOrder.assignedDilveryBoy.mobile}
                  </p>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-gray-500 italic">
                  Delivery Boy is not assigned yet.
                </p>
              )
            ) : (
              <p className="text-green-600 font-semibold text-sm sm:text-lg">✅ Delivered</p>
            )}

            {/* 🗺️ Map Tracking */}
            {(shopOrder.assignedDilveryBoy && shopOrder.status !== "delivered") && (
              <div className="h-[250px] sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-md border border-gray-200">
                <DileveryBoyTracking
                  data={{
                    deliveryBoyLocation:
                      liveLocation[shopOrder.assignedDilveryBoy._id] || {
                        lat: shopOrder.assignedDilveryBoy.location.coordinates[1],
                        lon: shopOrder.assignedDilveryBoy.location.coordinates[0],
                      },
                    customerLocation: {
                      lat: currentOrder.deliveryAddress.lattitude,
                      lon: currentOrder.deliveryAddress.longitude,
                    },
                    zoom: window.innerWidth < 640 ? 12 : 15, // Small devices -> smaller zoom
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrackOrderPage
