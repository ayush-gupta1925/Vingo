// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { MdPhone, MdEmail } from "react-icons/md";
// import { serverUrl } from '../App';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateOrderStatus } from '../redux/userSlice';
// import { toast } from 'react-toastify';

// function OwnerOrdercard({ data }) {
//   const [availableBoys, setAvailableBoys] = useState([]);
//   const [assignedBoy, setAssignedBoy] = useState(null);
//   const dispatch = useDispatch();
//     const {socket} = useSelector(state => state.user)
//   // Fetch available boys on page refresh or if status is "out of delivery"
//   useEffect(() => {
//     const fetchAvailableBoys = async () => {
//       if (data.shopOrders.status === "out of delivery") {
//         try {
//           const result = await axios.get(
//             `${serverUrl}/api/order/available-boys/${data._id}/${data.shopOrders.shop._id}`,
//             { withCredentials: true }
//           );
//           setAvailableBoys(result.data.availableBoys || []);
//           setAssignedBoy(result.data.assignedDilveryBoy || null);
//         } catch (error) {
//           console.error("Error fetching available boys:", error);
//         }
//       }
//     };
//     fetchAvailableBoys();
//   }, [data._id, data.shopOrders.status, data.shopOrders.shop._id]);

//   // Update order status
//   const handleUpdateStatus = async (orderId, shopId, status) => {
//     try {
//       const result = await axios.post(
//         `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
//         { status },
//         { withCredentials: true }
//       );
//       dispatch(updateOrderStatus({ orderId, shopId, status }));
//       setAvailableBoys(result.data.availableBoys || []);
//       setAssignedBoy(result.data.assignedDilveryBoy || null);
//     } catch (error) {
//       console.log(error);
//     }
//   };

// useEffect(() => {
//   if (!socket) return;

//   // ✅ DeliveryBoy Assigned
//   socket.on("deliveryBoyAssigned", (payload) => {
//     if (payload.orderId === data._id && payload.shopOrderId === data.shopOrders._id) {
//       setAssignedBoy({
//         _id: payload.deliveryBoyId,
//         fullName: payload.fullName,
//         mobile: payload.mobile
//       });
//     }
   
//   });

//   // ✅ Order Delivered
//   socket.on("orderDelivered", (payload) => {
//     if (payload.orderId === data._id && payload.shopOrderId === data.shopOrders._id) {
//       dispatch(updateOrderStatus({
//         orderId: payload.orderId,
//         shopId: data.shopOrders.shop._id,
//         status: "delivered"

//       }));
      
//     }
//   });

//   return () => {
//     socket.off("deliveryBoyAssigned");
//     socket.off("orderDelivered");
//   };
// }, [socket, data._id, data.shopOrders._id, data.shopOrders.shop._id, dispatch]);




//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 space-y-5 w-full max-w-3xl mx-auto">
//       {/* User Info */}
//       <div className="border-b pb-4">
//         <h2 className="capitalize text-xl font-bold text-gray-800">{data.user.fullName}</h2>
//         <div className="flex items-center gap-4 mt-1 text-gray-600">
//           <MdEmail size={18} />
//           <span className="text-sm">{data.user.email}</span>
//         </div>
//         <div className="flex items-center gap-4 mt-1 text-gray-600">
//           <MdPhone size={18} />
//           <span className="text-sm">{data.user.mobile}</span>
//         </div>
//       </div>

//       {/* Payment Info */}
//       <div className="flex flex-col md:flex-row gap-4 text-gray-700">
//         <div className="text-sm font-medium">
//           Payment Method: <span className="font-normal capitalize">{data.paymentMethod}</span>
//         </div>
//         {data.paymentMethod === "online" && (
//           <div className="text-sm font-medium">
//             Paid: <span className="font-normal">{data.payment ? "Yes" : "No"}</span>
//           </div>
//         )}
//       </div>

//       {/* Delivery Address */}
//       <div className="bg-gray-50 p-3 rounded-lg text-gray-700 text-sm space-y-1">
//         <p className="font-medium">Delivery Address:</p>
//         <p>{data?.deliveryAddress.text}</p>
//         <p>Latitude: {data?.deliveryAddress.lattitude}, Longitude: {data?.deliveryAddress.longitude}</p>
//       </div>

//       {/* Ordered Items */}
//       <div className="overflow-x-auto">
//         <div className="flex gap-4">
//           {data.shopOrders.shopOrderItems.map((item, index) => (
//             <div
//               key={index}
//               className="flex-shrink-0 w-44 border rounded-lg bg-white shadow-sm p-2 flex flex-col items-center"
//             >
//               <img
//                 src={item?.item?.image}
//                 className="w-full h-28 object-cover rounded-md mb-2"
//                 alt={item.name}
//               />
//               <p className="text-sm font-semibold text-gray-800">{item.name}</p>
//               <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
//               <p className="text-sm font-medium mt-1">₹{item.quantity * item.price}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Status Display / Update */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t pt-4">
//         <div className="text-gray-700 text-sm">
//           Status: <span className="font-semibold capitalize text-[#ff4d2d]">{data.shopOrders.status}</span>
//         </div>

       
//         {data.shopOrders.status !== "delivered" && (
//           <select
//             className={`rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 border-[#ff4d2d] text-[#ff4d2d] cursor-pointer
//               ${data.shopOrders.status === "out of delivery" ? "bg-gray-200 cursor-not-allowed" : ""}`}
//             onChange={(e) => handleUpdateStatus(data._id, data.shopOrders.shop._id, e.target.value)}
//             value={data.shopOrders.status || ""}
//             disabled={data.shopOrders.status === "out of delivery"}
//           >
//             <option value="">Change Status</option>
//             <option value="pending">Pending</option>
//             <option value="preparing">Preparing</option>
//             <option value="out of delivery">Out of Delivery</option>
//           </select>
//         )}

//         {/* <select className='rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 border-[#ff4d2d] text-[#ff4d2d] cursor-pointer' onChange={(e)=>handleUpdateStatus(data._id,data.shopOrders.shop._id,e.target.value)}> <option value="">Status Change</option> <option value="pending">Pending</option> <option value="preparing">Preparing</option> <option value="out of delivery">Out of Delivery</option> </select> */}
//       </div>

//       {/* Delivery Boys */}
//       {data.shopOrders.status === "out of delivery" && (
//         <div className="bg-orange-50 p-3 rounded-lg text-gray-800 text-sm space-y-1">
//           {assignedBoy ? (
//             <p>
//               Assigned Delivery Boy: <span className="font-medium">{assignedBoy.fullName} - {assignedBoy.mobile}</span>
//             </p>
//           ) : (
//             <>
//               <p className="font-medium">Available Delivery Boys:</p>
//               {availableBoys.length > 0 ? (
//                 availableBoys.map((b, index) => (
//                   <div key={index} className="pl-2">
//                     {b.fullName} - {b.mobile}
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-gray-400 pl-2">Waiting for available delivery boys...</div>
//               )}
//             </>
//           )}
//         </div>
//       )}

//       {/* Subtotal */}
//       <div className="text-right font-bold text-gray-800 text-sm">
//         Total: ₹{data.shopOrders.subTotal}
//       </div>
//     </div>
//   );
// }

// export default OwnerOrdercard;




// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { MdPhone, MdEmail } from "react-icons/md";
// import { serverUrl } from '../App';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateOrderStatus } from '../redux/userSlice';

// function OwnerOrdercard({ data }) {
//   const [availableBoys, setAvailableBoys] = useState([]);
//   const [assignedBoy, setAssignedBoy] = useState(null);
//   const dispatch = useDispatch();
//   const { socket } = useSelector(state => state.user);

//   // ✅ Fetch available boys
//   useEffect(() => {
//     const fetchAvailableBoys = async () => {
//       if (data.shopOrders.status === "out of delivery") {
//         try {
//           const result = await axios.get(
//             `${serverUrl}/api/order/available-boys/${data._id}/${data.shopOrders.shop._id}`,
//             { withCredentials: true }
//           );
//           setAvailableBoys(result.data.availableBoys || []);
//           setAssignedBoy(result.data.assignedDilveryBoy || null);
//         } catch (error) {
//           console.error("Error fetching available boys:", error);
//         }
//       }
//     };
//     fetchAvailableBoys();
//   }, [data._id, data.shopOrders.status, data.shopOrders.shop._id]);

//   // ✅ Update order status
//   const handleUpdateStatus = async (orderId, shopId, status) => {
//     try {
//       const result = await axios.post(
//         `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
//         { status },
//         { withCredentials: true }
//       );
//       dispatch(updateOrderStatus({ orderId, shopId, status }));
//       setAvailableBoys(result.data.availableBoys || []);
//       setAssignedBoy(result.data.assignedDilveryBoy || null);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ✅ Socket listeners
//   useEffect(() => {
//     if (!socket) return;

//     socket.on("deliveryBoyAssigned", (payload) => {
//       if (payload.orderId === data._id && payload.shopOrderId === data.shopOrders._id) {
//         setAssignedBoy({
//           _id: payload.deliveryBoyId,
//           fullName: payload.fullName,
//           mobile: payload.mobile
//         });
//       }
//     });

//     socket.on("orderDelivered", (payload) => {
//       if (payload.orderId === data._id && payload.shopOrderId === data.shopOrders._id) {
//         dispatch(updateOrderStatus({
//           orderId: payload.orderId,
//           shopId: data.shopOrders.shop._id,
//           status: "delivered"
//         }));
//       }
//     });

//     return () => {
//       socket.off("deliveryBoyAssigned");
//       socket.off("orderDelivered");
//     };
//   }, [socket, data._id, data.shopOrders._id, data.shopOrders.shop._id, dispatch]);

//   return (
//     <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-4 sm:space-y-5 w-full max-w-3xl mx-auto">
      
//       {/* User Info */}
//  <div className="border-b pb-3 sm:pb-4">
//   <h2 className="capitalize text-lg sm:text-xl font-bold text-gray-800">{data.user.fullName}</h2>
  
//   <div className="flex items-center gap-2 sm:gap-3 mt-1 text-gray-600">
//     <MdEmail className="w-4 h-4 sm:w-5 sm:h-5" />   {/* ✅ chota aur responsive icon */}
//     <span className="text-xs sm:text-sm">{data.user.email}</span>
//   </div>
  
//   <div className="flex items-center gap-2 sm:gap-3 mt-1 text-gray-600">
//     <MdPhone className="w-4 h-4 sm:w-5 sm:h-5" />   {/* ✅ chota aur responsive icon */}
//     <span className="text-xs sm:text-sm">{data.user.mobile}</span>
//   </div>
// </div>


//       {/* Payment Info */}
//       <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-gray-700 text-xs sm:text-sm">
//         <div className="font-medium">
//           Payment Method: <span className="font-normal capitalize">{data.paymentMethod}</span>
//         </div>
//         {data.paymentMethod === "online" && (
//           <div className="font-medium">
//             Paid: <span className="font-normal">{data.payment ? "Yes" : "No"}</span>
//           </div>
//         )}
//       </div>

//       {/* Delivery Address */}
//       <div className="bg-gray-50 p-2 sm:p-3 rounded-lg text-gray-700 text-xs sm:text-sm space-y-1">
//         <p className="font-medium">Delivery Address:</p>
//         <p>{data?.deliveryAddress.text}</p>
//         <p>
//           Lat: {data?.deliveryAddress.lattitude}, Lng: {data?.deliveryAddress.longitude}
//         </p>
//       </div>

//       {/* Ordered Items */}
//       <div className="overflow-x-auto">
//         <div className="flex gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
//           {data.shopOrders.shopOrderItems.map((item, index) => (
//             <div
//               key={index}
//               className="flex-shrink-0 w-28 sm:w-44 border rounded-lg bg-white shadow-sm p-2 flex flex-col items-center"
//             >
//               <img
//                 src={item?.item?.image}
//                 className="w-full h-20 sm:h-28 object-cover rounded-md mb-2"
//                 alt={item.name}
//               />
//               <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">{item.name}</p>
//               <p className="text-[11px] sm:text-xs text-gray-500">
//                 Qty: {item.quantity} × ₹{item.price}
//               </p>
//               <p className="text-xs sm:text-sm font-medium mt-1">₹{item.quantity * item.price}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Status Display / Update */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 border-t pt-3 sm:pt-4 text-xs sm:text-sm">
//         <div className="text-gray-700">
//           Status: <span className="font-semibold capitalize text-[#ff4d2d]">{data.shopOrders.status}</span>
//         </div>

//         {data.shopOrders.status !== "delivered" && (
//           <select
//             className={`rounded-md border px-2 sm:px-3 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 border-[#ff4d2d] text-[#ff4d2d] cursor-pointer
//               ${data.shopOrders.status === "out of delivery" ? "bg-gray-200 cursor-not-allowed" : ""}`}
//             onChange={(e) => handleUpdateStatus(data._id, data.shopOrders.shop._id, e.target.value)}
//             value={data.shopOrders.status || ""}
//             disabled={data.shopOrders.status === "out of delivery"}
//           >
//             <option value="">Change Status</option>
//             <option value="pending">Pending</option>
//             <option value="preparing">Preparing</option>
//             <option value="out of delivery">Out of Delivery</option>
//           </select>
//         )}
//       </div>

//       {/* Delivery Boys */}
//       {data.shopOrders.status === "out of delivery" && (
//         <div className="bg-orange-50 p-2 sm:p-3 rounded-lg text-gray-800 text-xs sm:text-sm space-y-1">
//           {assignedBoy ? (
//             <p>
//               Assigned Delivery Boy:{" "}
//               <span className="font-medium">
//                 {assignedBoy.fullName} - {assignedBoy.mobile}
//               </span>
//             </p>
//           ) : (
//             <>
//               <p className="font-medium">Available Delivery Boys:</p>
//               {availableBoys.length > 0 ? (
//                 availableBoys.map((b, index) => (
//                   <div key={index} className="pl-2">
//                     {b.fullName} - {b.mobile}
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-gray-400 pl-2">Waiting for available delivery boys...</div>
//               )}
//             </>
//           )}
//         </div>
//       )}

//       {/* Subtotal */}
//       <div className="text-right font-bold text-gray-800 text-sm sm:text-base">
//         Total: ₹{data.shopOrders.subTotal}
//       </div>
//     </div>
//   );
// }

// export default OwnerOrdercard;




// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { MdPhone, MdEmail } from "react-icons/md";
// import { serverUrl } from '../App';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateOrderStatus } from '../redux/userSlice';

// function OwnerOrdercard({ data }) {
//   const [availableBoys, setAvailableBoys] = useState([]);
//   const [assignedBoy, setAssignedBoy] = useState(null);
//   const dispatch = useDispatch();
//   const { socket } = useSelector(state => state.user);

//   // ✅ Fetch available boys
//   useEffect(() => {
//     const fetchAvailableBoys = async () => {
//       if (data.shopOrders.status === "out of delivery") {
//         try {
//           const result = await axios.get(
//             `${serverUrl}/api/order/available-boys/${data._id}/${data.shopOrders.shop._id}`,
//             { withCredentials: true }
//           );
//           setAvailableBoys(result.data.availableBoys || []);
//           setAssignedBoy(result.data.assignedDilveryBoy || null);
//         } catch (error) {
//           console.error("Error fetching available boys:", error);
//         }
//       }
//     };
//     fetchAvailableBoys();
//   }, [data._id, data.shopOrders.status, data.shopOrders.shop._id]);

//   // ✅ Update order status
//   const handleUpdateStatus = async (orderId, shopId, status) => {
//     try {
//       const result = await axios.post(
//         `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
//         { status },
//         { withCredentials: true }
//       );
//       dispatch(updateOrderStatus({ orderId, shopId, status }));
//       setAvailableBoys(result.data.availableBoys || []);
//       setAssignedBoy(result.data.assignedDilveryBoy || null);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ✅ Socket listeners
//   useEffect(() => {
//     if (!socket) return;

//     socket.on("deliveryBoyAssigned", (payload) => {
//       if (payload.orderId === data._id && payload.shopOrderId === data.shopOrders._id) {
//         setAssignedBoy({
//           _id: payload.deliveryBoyId,
//           fullName: payload.fullName,
//           mobile: payload.mobile
//         });
//       }
//     });

//     socket.on("orderDelivered", (payload) => {
//       if (payload.orderId === data._id && payload.shopOrderId === data.shopOrders._id) {
//         dispatch(updateOrderStatus({
//           orderId: payload.orderId,
//           shopId: data.shopOrders.shop._id,
//           status: "delivered"
//         }));
//       }
//     });

//     return () => {
//       socket.off("deliveryBoyAssigned");
//       socket.off("orderDelivered");
//     };
//   }, [socket, data._id, data.shopOrders._id, data.shopOrders.shop._id, dispatch]);

//   // ✅ Determine if dropdown should be disabled
//   const isDropdownDisabled = () => {
//     if (data.shopOrders.status !== "out of delivery") return false;
//     // disable if status out of delivery AND assigned boy exists
//     if (assignedBoy) return true;
//     // otherwise, enable dropdown if no assigned boy
//     return false;
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-4 sm:space-y-5 w-full max-w-3xl mx-auto">
      
//       {/* User Info */}
//       <div className="border-b pb-3 sm:pb-4">
//         <h2 className="capitalize text-lg sm:text-xl font-bold text-gray-800">{data.user.fullName}</h2>
//         <div className="flex items-center gap-2 sm:gap-3 mt-1 text-gray-600">
//           <MdEmail className="w-4 h-4 sm:w-5 sm:h-5" />
//           <span className="text-xs sm:text-sm">{data.user.email}</span>
//         </div>
//         <div className="flex items-center gap-2 sm:gap-3 mt-1 text-gray-600">
//           <MdPhone className="w-4 h-4 sm:w-5 sm:h-5" />
//           <span className="text-xs sm:text-sm">{data.user.mobile}</span>
//         </div>
//       </div>

//       {/* Payment Info */}
//       <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-gray-700 text-xs sm:text-sm">
//         <div className="font-medium">
//           Payment Method: <span className="font-normal capitalize">{data.paymentMethod}</span>
//         </div>
//         {data.paymentMethod === "online" && (
//           <div className="font-medium">
//             Paid: <span className="font-normal">{data.payment ? "Yes" : "No"}</span>
//           </div>
//         )}
//       </div>

//       {/* Delivery Address */}
//       <div className="bg-gray-50 p-2 sm:p-3 rounded-lg text-gray-700 text-xs sm:text-sm space-y-1">
//         <p className="font-medium">Delivery Address:</p>
//         <p>{data?.deliveryAddress.text}</p>
//         <p>
//           Lat: {data?.deliveryAddress.lattitude}, Lng: {data?.deliveryAddress.longitude}
//         </p>
//       </div>

//       {/* Ordered Items */}
//       <div className="overflow-x-auto">
//         <div className="flex gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
//           {data.shopOrders.shopOrderItems.map((item, index) => (
//             <div
//               key={index}
//               className="flex-shrink-0 w-28 sm:w-44 border rounded-lg bg-white shadow-sm p-2 flex flex-col items-center"
//             >
//               <img
//                 src={item?.item?.image}
//                 className="w-full h-20 sm:h-28 object-cover rounded-md mb-2"
//                 alt={item.name}
//               />
//               <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">{item.name}</p>
//               <p className="text-[11px] sm:text-xs text-gray-500">
//                 Qty: {item.quantity} × ₹{item.price}
//               </p>
//               <p className="text-xs sm:text-sm font-medium mt-1">₹{item.quantity * item.price}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Status Display / Update */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 border-t pt-3 sm:pt-4 text-xs sm:text-sm">
//         <div className="text-gray-700">
//           Status: <span className="font-semibold capitalize text-[#ff4d2d]">{data.shopOrders.status}</span>
//         </div>

//         {data.shopOrders.status !== "delivered" && (
//           <select
//             className={`rounded-md border px-2 sm:px-3 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 border-[#ff4d2d] text-[#ff4d2d] cursor-pointer
//               ${isDropdownDisabled() ? "bg-gray-200 cursor-not-allowed" : ""}`}
//             onChange={(e) => handleUpdateStatus(data._id, data.shopOrders.shop._id, e.target.value)}
//             value={data.shopOrders.status || ""}
//             disabled={isDropdownDisabled()}
//           >
//             <option value="">Change Status</option>
//             <option value="pending">Pending</option>
//             <option value="preparing">Preparing</option>
//             <option value="out of delivery">Out of Delivery</option>
//           </select>
//         )}
//       </div>

//       {/* Delivery Boys */}
//       {data.shopOrders.status === "out of delivery" && (
//         <div className="bg-orange-50 p-2 sm:p-3 rounded-lg text-gray-800 text-xs sm:text-sm space-y-1">
//           {assignedBoy ? (
//             <p>
//               Assigned Delivery Boy:{" "}
//               <span className="font-medium">
//                 {assignedBoy.fullName} - {assignedBoy.mobile}
//               </span>
//             </p>
//           ) : (
//             <>
//               <p className="font-medium">Available Delivery Boys:</p>
//               {availableBoys.length > 0 ? (
//                 availableBoys.map((b, index) => (
//                   <div key={index} className="pl-2">
//                     {b.fullName} - {b.mobile}
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-gray-400 pl-2">Waiting for available delivery boys...</div>
//               )}
//             </>
//           )}
//         </div>
//       )}

//       {/* Subtotal */}
//       <div className="text-right font-bold text-gray-800 text-sm sm:text-base">
//         Total: ₹{data.shopOrders.subTotal}
//       </div>
//     </div>
//   );
// }

// export default OwnerOrdercard;




import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { MdPhone, MdEmail } from "react-icons/md";
import { serverUrl } from '../App.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatus } from '../redux/userSlice.js';

function OwnerOrdercard({ data }) {
  const [availableBoys, setAvailableBoys] = useState([]);
  const [assignedBoy, setAssignedBoy] = useState(null);
  const dispatch = useDispatch();
  const { socket } = useSelector(state => state.user);

  // ✅ Fetch available boys
  useEffect(() => {
    const fetchAvailableBoys = async () => {
      if (data.shopOrders.status === "out of delivery") {
        try {
          const result = await axios.get(
            `${serverUrl}/api/order/available-boys/${data._id}/${data.shopOrders.shop._id}`,
            { withCredentials: true }
          );
          setAvailableBoys(result.data.availableBoys || []);
          setAssignedBoy(result.data.assignedDilveryBoy || null);
        } catch (error) {
          console.error("Error fetching available boys:", error);
        }
      }
    };
    fetchAvailableBoys();
  }, [data._id, data.shopOrders.status, data.shopOrders.shop._id]);

  // ✅ Update order status
  const handleUpdateStatus = async (orderId, shopId, status) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
        { status },
        { withCredentials: true }
      );
      dispatch(updateOrderStatus({ orderId, shopId, status }));
      setAvailableBoys(result.data.availableBoys || []);
      setAssignedBoy(result.data.assignedDilveryBoy || null);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Socket listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("deliveryBoyAssigned", (payload) => {
      if (payload.orderId === data._id && payload.shopOrderId === data.shopOrders._id) {
        setAssignedBoy({
          _id: payload.deliveryBoyId,
          fullName: payload.fullName,
          mobile: payload.mobile
        });
      }
    });

    socket.on("orderDelivered", (payload) => {
      if (payload.orderId === data._id && payload.shopOrderId === data.shopOrders._id) {
        dispatch(updateOrderStatus({
          orderId: payload.orderId,
          shopId: data.shopOrders.shop._id,
          status: "delivered"
        }));
      }
    });

    return () => {
      socket.off("deliveryBoyAssigned");
      socket.off("orderDelivered");
    };
  }, [socket, data._id, data.shopOrders._id, data.shopOrders.shop._id, dispatch]);

  // ✅ Logic for disabling/enabling dropdown
  const isOutForDelivery = data.shopOrders.status === "out of delivery";
  const disableSelect =
    isOutForDelivery && (assignedBoy || availableBoys.length > 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-4 sm:space-y-5 w-full max-w-3xl mx-auto">
      
      {/* User Info */}
      <div className="border-b pb-3 sm:pb-4">
        <h2 className="capitalize text-lg sm:text-xl font-bold text-gray-800">{data.user.fullName}</h2>
        <div className="flex items-center gap-2 sm:gap-3 mt-1 text-gray-600">
          <MdEmail className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm">{data.user.email}</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 mt-1 text-gray-600">
          <MdPhone className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm">{data.user.mobile}</span>
        </div>
      </div>

      {/* Payment Info */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-gray-700 text-xs sm:text-sm">
        <div className="font-medium">
          Payment Method: <span className="font-normal capitalize">{data.paymentMethod}</span>
        </div>
        {data.paymentMethod === "online" && (
          <div className="font-medium">
            Paid: <span className="font-normal">{data.payment ? "Yes" : "No"}</span>
          </div>
        )}
      </div>

      {/* Delivery Address */}
      <div className="bg-gray-50 p-2 sm:p-3 rounded-lg text-gray-700 text-xs sm:text-sm space-y-1">
        <p className="font-medium">Delivery Address:</p>
        <p>{data?.deliveryAddress.text}</p>
        <p>
          Lat: {data?.deliveryAddress.lattitude}, Lng: {data?.deliveryAddress.longitude}
        </p>
      </div>

      {/* Ordered Items */}
      <div className="overflow-x-auto">
        <div className="flex gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
          {data.shopOrders.shopOrderItems.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-28 sm:w-44 border rounded-lg bg-white shadow-sm p-2 flex flex-col items-center"
            >
              <img
                src={item?.item?.image}
                className="w-full h-20 sm:h-28 object-cover rounded-md mb-2"
                alt={item.name}
              />
              <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">{item.name}</p>
              <p className="text-[11px] sm:text-xs text-gray-500">
                Qty: {item.quantity} × ₹{item.price}
              </p>
              <p className="text-xs sm:text-sm font-medium mt-1">₹{item.quantity * item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Status Display / Update */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 border-t pt-3 sm:pt-4 text-xs sm:text-sm">
        <div className="text-gray-700">
          Status: <span className="font-semibold capitalize text-[#ff4d2d]">{data.shopOrders.status}</span>
        </div>

        {data.shopOrders.status !== "delivered" && (
          <select
            className={`rounded-md border px-2 sm:px-3 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 border-[#ff4d2d] text-[#ff4d2d] cursor-pointer
              ${disableSelect ? "bg-gray-200 cursor-not-allowed" : ""}`}
            onChange={(e) => handleUpdateStatus(data._id, data.shopOrders.shop._id, e.target.value)}
            value={data.shopOrders.status || ""}
            disabled={disableSelect}
          >
            <option value="">Change Status</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="out of delivery">Out of Delivery</option>
          </select>
        )}
      </div>

      {/* Delivery Boys */}
      {isOutForDelivery && (
        <div className="bg-orange-50 p-2 sm:p-3 rounded-lg text-gray-800 text-xs sm:text-sm space-y-1">
          {assignedBoy ? (
            <p>
              Assigned Delivery Boy:{" "}
              <span className="font-medium">
                {assignedBoy.fullName} - {assignedBoy.mobile}
              </span>
            </p>
          ) : (
            <>
              <p className="font-medium">Available Delivery Boys:</p>
              {availableBoys.length > 0 ? (
                availableBoys.map((b, index) => (
                  <div key={index} className="pl-2">
                    {b.fullName} - {b.mobile}
                  </div>
                ))
              ) : (
                <div className="text-gray-400 pl-2">Waiting for available delivery boys...</div>
              )}
            </>
          )}
        </div>
      )}

      {/* Subtotal */}
      <div className="text-right font-bold text-gray-800 text-sm sm:text-base">
        Total: ₹{data.shopOrders.subTotal}
      </div>
    </div>
  );
}

export default OwnerOrdercard;
