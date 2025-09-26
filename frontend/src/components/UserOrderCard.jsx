// // UserOrderCard.jsx
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { serverUrl } from '../App';
// import { toast } from 'react-toastify';

// function UserOrderCard({ data }) {
//   const [selectedRating, setSelectedRating] = useState({});
//   const navigate = useNavigate();

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleString('en-GB', {
//       day: "2-digit",
//       month: "short",
//       year: "numeric"
//     });
//   };

//   // ✅ Fetch user rating from backend
//   useEffect(() => {
//     const fetchUserRatings = async () => {
//       for (let shopOrder of data.shopOrders) {
//         for (let item of shopOrder.shopOrderItems) {
//           try {
//             const res = await axios.get(
//               `${serverUrl}/api/item/user-rating/${item.item._id}`,
//               { withCredentials: true }
//             );
//             if (res.data.userRating) {
//               setSelectedRating(prev => ({
//                 ...prev,
//                 [item.item._id]: res.data.userRating
//               }));
//             }
//           } catch (err) {
//             console.log("Error fetching rating:", err);
//           }
//         }
//       }
//     };
//     fetchUserRatings();
//   }, [data]);

//   const handleRating = async (itemId, rating) => {
//     try {
//       await axios.post(
//         `${serverUrl}/api/item/rating`,
//         { itemId, rating },
//         { withCredentials: true }
//       );
//       setSelectedRating(prev => ({
//         ...prev,
//         [itemId]: rating
//       }));
//       toast.success("Thanks for Your Rating !")
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className='bg-gradient-to-br from-white to-[#fff5f3] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 space-y-5 border border-[#ffebe6]'>
//       {/* Header */}
//       <div className='flex justify-between items-start border-b pb-3'>
//         <div>
//           <p className='font-semibold text-gray-800'>Order #{data._id.slice(-6)}</p>
//           <p className='text-sm text-gray-500'>📅 {formatDate(data.createdAt)}</p>
//         </div>
//         <div className='text-right space-y-1'>
//           {data.paymentMethod === "cod" ? (
//             <p className="text-sm text-[#ff4d2d] font-semibold uppercase">COD</p>
//           ) : (
//             <>
//               <p className="text-sm text-gray-600 font-medium uppercase">
//                 {data.paymentMethod}
//               </p>
//               <p className={`text-xs font-semibold ${data.payment ? "text-green-600" : "text-red-500"}`}>
//                 {data.payment ? "✔ Paid" : "❌ Unpaid"}
//               </p>
//             </>
//           )}
//           <p className='font-bold text-blue-600 capitalize text-sm mt-1'>
//             {data.shopOrders?.[0]?.status}
//           </p>
//         </div>
//       </div>

//       {/* Shop Orders */}
//       {data.shopOrders.map((shopOrder, index) => (
//         <div className='border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition duration-200 space-y-3' key={index}>
//           <p className='font-semibold text-gray-700 mb-2'>{shopOrder.shop.name}</p>
//           <div className='flex space-x-4 overflow-x-auto scrollbar-hide pb-2'>
//             {shopOrder.shopOrderItems.map((item, idx) => (
//               <div className='flex-shrink-0 w-40 border rounded-lg bg-[#fff9f6] hover:bg-[#fff3f0] transition duration-200' key={idx}>
//                 <img src={item?.item?.image} className='w-full h-24 object-cover rounded-t-lg' />
//                 <div className='p-2'>
//                   <p className='text-sm font-semibold mt-1 text-gray-800'>{item.name}</p>
//                   <p className='text-xs text-gray-500'>₹ {item.price} × {item.quantity}</p>

//                   {/* Rating */}
//                   {shopOrder.status === "delivered" && (
//                     <div className="flex space-x-1 mt-2">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <button
//                           key={star}
//                           disabled={!!selectedRating[item.item._id]} // ek baar hi allow
//                           className={`text-lg transition ${
//                             selectedRating[item.item._id] >= star
//                               ? "text-yellow-400"
//                               : "text-gray-300 hover:text-yellow-400"
//                           } ${selectedRating[item.item._id] ? "cursor-not-allowed" : "cursor-pointer"}`}
//                           onClick={() => {
//                             if (!selectedRating[item.item._id]) {
//                               handleRating(item.item._id, star);
//                             }
//                           }}
//                         >
//                           ★
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className='flex justify-between items-center border-t pt-2 text-sm'>
//             <p className='font-semibold text-gray-700'>SubTotal : ₹ {shopOrder.subTotal}</p>
//             <span className={`font-semibold px-2 py-1 rounded-full text-xs ${
//               shopOrder.status === "delivered"
//                 ? "bg-green-100 text-green-700"
//                 : shopOrder.status === "pending"
//                 ? "bg-yellow-100 text-yellow-700"
//                 : "bg-blue-100 text-blue-700"
//             }`}>
//               {shopOrder.status}
//             </span>
//           </div>
//         </div>
//       ))}

//       {/* Footer */}
//       <div className='flex justify-between items-center border-t pt-3'>
//         <p className='font-bold text-lg text-gray-800'>Total : ₹ {data.totalAmount}</p>
//         <button
//           className='bg-[#ff4d2d] hover:bg-[#e64526] text-white px-5 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition'
//           onClick={() => navigate(`/track-order/${data._id}`)}
//         >
//           🚚 Track Order
//         </button>
//       </div>
//     </div>
//   );
// }

// export default UserOrderCard;



// UserOrderCard.jsx
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App.jsx';
import { toast } from 'react-toastify';

function UserOrderCard({ data }) {
  const [selectedRating, setSelectedRating] = useState({});
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  // ✅ Fetch user rating from backend
  useEffect(() => {
    const fetchUserRatings = async () => {
      for (let shopOrder of data.shopOrders) {
        for (let item of shopOrder.shopOrderItems) {
          try {
            const res = await axios.get(
              `${serverUrl}/api/item/user-rating/${item.item._id}`,
              { withCredentials: true }
            );
            if (res.data.userRating) {
              setSelectedRating(prev => ({
                ...prev,
                [item.item._id]: res.data.userRating
              }));
            }
          } catch (err) {
            console.log("Error fetching rating:", err);
          }
        }
      }
    };
    fetchUserRatings();
  }, [data]);

  const handleRating = async (itemId, rating) => {
    try {
      await axios.post(
        `${serverUrl}/api/item/rating`,
        { itemId, rating },
        { withCredentials: true }
      );
      setSelectedRating(prev => ({
        ...prev,
        [itemId]: rating
      }));
      toast.success("Thanks for Your Rating !");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-gradient-to-br from-white to-[#fff5f3] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-5 space-y-4 sm:space-y-5 border border-[#ffebe6]'>
      
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start border-b pb-2 sm:pb-3'>
        <div>
          <p className='font-semibold text-gray-800 text-sm sm:text-base'>Order #{data._id.slice(-6)}</p>
          <p className='text-xs sm:text-sm text-gray-500'>📅 {formatDate(data.createdAt)}</p>
        </div>
        <div className='text-left sm:text-right space-y-1 mt-2 sm:mt-0'>
          {data.paymentMethod === "cod" ? (
            <p className="text-xs sm:text-sm text-[#ff4d2d] font-semibold uppercase">COD</p>
          ) : (
            <>
              <p className="text-xs sm:text-sm text-gray-600 font-medium uppercase">
                {data.paymentMethod}
              </p>
              <p className={`text-[11px] sm:text-xs font-semibold ${data.payment ? "text-green-600" : "text-red-500"}`}>
                {data.payment ? "✔ Paid" : "❌ Unpaid"}
              </p>
            </>
          )}
          <p className='font-bold text-blue-600 capitalize text-xs sm:text-sm mt-1'>
            {data.shopOrders?.[0]?.status}
          </p>
        </div>
      </div>

      {/* Shop Orders */}
      {data.shopOrders.map((shopOrder, index) => (
        <div 
          className='border rounded-lg p-3 sm:p-4 bg-white shadow-sm hover:shadow-md transition duration-200 space-y-3' 
          key={index}
        >
          <p className='font-semibold text-gray-700 text-sm sm:text-base mb-1 sm:mb-2'>{shopOrder.shop.name}</p>
          
          <div className='flex flex-wrap gap-3 sm:space-x-4 overflow-x-auto sm:overflow-x-visible scrollbar-hide pb-1 sm:pb-2'>
            {shopOrder.shopOrderItems.map((item, idx) => (
              <div 
                className='flex-shrink-0 w-28 sm:w-40 border rounded-lg bg-[#fff9f6] hover:bg-[#fff3f0] transition duration-200' 
                key={idx}
              >
                <img 
                  src={item?.item?.image} 
                  className='w-full h-20 sm:h-24 object-cover rounded-t-lg' 
                />
                <div className='p-2'>
                  <p className='text-xs sm:text-sm font-semibold mt-1 text-gray-800 truncate'>{item.name}</p>
                  <p className='text-[11px] sm:text-xs text-gray-500'>₹ {item.price} × {item.quantity}</p>

                  {/* Rating */}
                  {shopOrder.status === "delivered" && (
                    <div className="flex space-x-1 mt-1 sm:mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          disabled={!!selectedRating[item.item._id]} // ek baar hi allow
                          className={`text-base sm:text-lg transition ${
                            selectedRating[item.item._id] >= star
                              ? "text-yellow-400"
                              : "text-gray-300 hover:text-yellow-400"
                          } ${selectedRating[item.item._id] ? "cursor-not-allowed" : "cursor-pointer"}`}
                          onClick={() => {
                            if (!selectedRating[item.item._id]) {
                              handleRating(item.item._id, star);
                            }
                          }}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center border-t pt-2 text-xs sm:text-sm'>
            <p className='font-semibold text-gray-700'>SubTotal : ₹ {shopOrder.subTotal}</p>
            <span className={`font-semibold px-2 py-1 rounded-full text-[11px] sm:text-xs w-max mt-1 sm:mt-0 ${
              shopOrder.status === "delivered"
                ? "bg-green-100 text-green-700"
                : shopOrder.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
            }`}>
              {shopOrder.status}
            </span>
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center border-t pt-2 sm:pt-3 space-y-2 sm:space-y-0'>
        <p className='font-bold text-base sm:text-lg text-gray-800'>Total : ₹ {data.totalAmount}</p>
        <button
          className='bg-[#ff4d2d] hover:bg-[#e64526] text-white px-4 py-2 sm:px-5 sm:py-2 rounded-lg text-sm sm:text-base font-medium shadow-md hover:shadow-lg transition w-full sm:w-auto'
          onClick={() => navigate(`/track-order/${data._id}`)}
        >
          🚚 Track Order
        </button>
      </div>
    </div>
  );
}

export default UserOrderCard;

