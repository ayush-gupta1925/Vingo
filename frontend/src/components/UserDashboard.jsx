// import React, { useEffect, useRef, useState } from 'react'
// import Nav from './Nav'
// import { categories } from '../category'
// import CategoryCard from './CategoryCard'
// import { FaCircleChevronLeft } from "react-icons/fa6";
// import { FaCircleChevronRight } from "react-icons/fa6";
// import { useSelector } from 'react-redux';
// import FoodCard from './FoodCard';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { serverUrl } from '../App';
// function UserDashboard() {
//   const navigate = useNavigate()
//   const cateScrollRef = useRef()
//   const shopScrollRef = useRef()
//  const [showLeftCateButton,setShowLeftCateButton] = useState(false)
//   const [showRightCateButton,setShowRightCateButton] = useState(false)


//   const [showLeftShopButton,setShowLeftShopButton] = useState(false)
//   const [showRightShopButton,setShowRightShopButton] = useState(false)

//   const {currentCity , shopsInMyCity,itemInMyCity,searchItems} = useSelector(state=>state.user)

//   const [updatedItemsList,setUpdatedItemsList] = useState([])

//   const handleFilterByCategory = (category)=>{
   
//     if(category == "All"){
//       setUpdatedItemsList(itemInMyCity)
//     }else{
//       const filteredList = itemInMyCity?.filter(i => i.category === category)
//       setUpdatedItemsList(filteredList)
//     }
//   }


//   useEffect(()=>{
//     setUpdatedItemsList(itemInMyCity)
//   },[itemInMyCity])

// const updateButton = (ref, setLeftButton, setRightButton) => {
//   const element = ref.current;
//   if (element) {
//     setLeftButton(element.scrollLeft > 0);
//     setRightButton(
//       element.scrollLeft + element.clientWidth < element.scrollWidth
//     );
//   }
// };

// const scrollHandler = (ref, direction) => {
//   if(ref.current){
//       ref.current.scrollBy({
//     left: direction === "left" ? -200 : 200,
//     behavior: "smooth",
//   });
//   }

// };





// useEffect(() => {
//  if(cateScrollRef.current){
//   updateButton(cateScrollRef,setShowLeftCateButton,setShowRightCateButton)
//   updateButton(shopScrollRef,setShowLeftShopButton,setShowRightShopButton)
  
//   cateScrollRef.current.addEventListener('scroll',()=>{
//      updateButton(cateScrollRef,setShowLeftCateButton,setShowRightCateButton)
//   })
//   shopScrollRef.current.addEventListener('scroll',()=>{
//     updateButton(shopScrollRef,setShowLeftShopButton,setShowRightShopButton)
//   })
//  }

//  return ()=>{cateScrollRef?.current?.removeEventListener('scroll',()=>{
//      updateButton(cateScrollRef,setShowLeftCateButton,setShowRightCateButton)
//   })

//   shopScrollRef?.current?.removeEventListener('scroll',()=>{
//    updateButton(shopScrollRef,setShowLeftShopButton,setShowRightShopButton)
//   })


// }
// }, [categories]);




//   return (
//     <div className='w-full min-h-screen bg-[#fff9f6] flex flex-col items-center overflow-y-auto'>
//       <Nav/>
  
//   {searchItems && searchItems.length > 0 && (
//   <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 p-6 bg-white shadow-lg rounded-2xl mt-6">
//     {/* Title */}
//     <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold border-b border-gray-200 pb-3 mb-4">
//       Search Results
//     </h1>

//     {/* Items Grid */}
//     <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {searchItems.map((item) => (
//         <FoodCard data={item} key={item._id} />
//       ))}
//     </div>
//   </div>
// )}


//       <div className='w-full max-w-7xl flex flex-col gap-5 items-start p-[10px]'>
//    <h1 className='text-gray-800 text-2xl sm:text-3xl'>Insipiration for Your First Order</h1>
//    <div className='w-full relative'>

// {showLeftCateButton && <button className='absolute left-[-15px] top-[47px] translate-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer' onClick={()=>scrollHandler(cateScrollRef,"left")}><FaCircleChevronLeft /></button> }


//    <div className='w-full flex overflow-x-auto gap-4 ' ref={cateScrollRef}>
//    {categories?.map((cate,index)=>(
//     <CategoryCard name={cate.category} image={cate.image} key={index} onClick={()=>handleFilterByCategory(cate.category)}/>
//    ))}
// </div>

// {showRightCateButton && <button className='absolute right-4 top-[47px] translate-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer'  onClick={()=>scrollHandler(cateScrollRef,"right")}><FaCircleChevronRight /></button>}



//    </div>
//       </div>

// {/* city shop  */}
//       <div className='w-full max-w-7xl flex flex-col gap-5 items-start p-[10px]'>
// <h1 className='text-gray-800 text-2xl sm:text-3xl'>Best Shop in {currentCity}</h1>

//    <div className='w-full relative'>

// {showLeftShopButton && <button className='absolute left-[-15px] top-[47px] translate-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer' onClick={()=>scrollHandler(shopScrollRef,"left")}><FaCircleChevronLeft /></button> }


//    <div className='w-full flex overflow-x-auto gap-4 ' ref={shopScrollRef}>
//    {shopsInMyCity?.map((shop,index)=>(
//     <CategoryCard name={shop.name} image={shop.image} key={index}  onClick={()=>navigate(`/shop/${shop._id}`)}/>
//    ))}
// </div>

// {showRightShopButton && <button className='absolute right-4 top-[47px] translate-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer'  onClick={()=>scrollHandler(shopScrollRef,"right")}><FaCircleChevronRight /></button>}



//    </div>

//       </div>

//   <div className='w-full max-w-7xl flex flex-col gap-5 items-start p-[10px]'>
//     <h1 className='text-gray-800 text-2xl sm:text-3xl'>Suggested Food Items</h1>

//     <div className='w-full h-auto flex flex-wrap gap-[20px] justify-center'>
// {updatedItemsList?.map((item,index)=>(

// <FoodCard key={index} data={item}/>

// ))}
// </div>
 
//   </div>

//     </div>
//   )
// }

// export default UserDashboard 



import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import { categories } from '../category.js'
import CategoryCard from './CategoryCard.jsx'
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import FoodCard from './FoodCard.jsx';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const navigate = useNavigate()
  const cateScrollRef = useRef()
  const shopScrollRef = useRef()
  const [showLeftCateButton,setShowLeftCateButton] = useState(false)
  const [showRightCateButton,setShowRightCateButton] = useState(false)
  const [showLeftShopButton,setShowLeftShopButton] = useState(false)
  const [showRightShopButton,setShowRightShopButton] = useState(false)

  const {currentCity , shopsInMyCity,itemInMyCity,searchItems} = useSelector(state=>state.user)
  const [updatedItemsList,setUpdatedItemsList] = useState([])

  const handleFilterByCategory = (category)=>{
    if(category === "All"){
      setUpdatedItemsList(itemInMyCity)
    }else{
      const filteredList = itemInMyCity?.filter(i => i.category === category)
      setUpdatedItemsList(filteredList)
    }
  }

  useEffect(()=>{
    setUpdatedItemsList(itemInMyCity)
  },[itemInMyCity])

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      setRightButton(element.scrollLeft + element.clientWidth < element.scrollWidth);
    }
  };

  const scrollHandler = (ref, direction) => {
    if(ref.current){
      ref.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if(cateScrollRef.current){
      updateButton(cateScrollRef,setShowLeftCateButton,setShowRightCateButton)
      updateButton(shopScrollRef,setShowLeftShopButton,setShowRightShopButton)
      
      const handleCateScroll = () => updateButton(cateScrollRef,setShowLeftCateButton,setShowRightCateButton)
      const handleShopScroll = () => updateButton(shopScrollRef,setShowLeftShopButton,setShowRightShopButton)
      
      cateScrollRef.current.addEventListener('scroll', handleCateScroll)
      shopScrollRef.current.addEventListener('scroll', handleShopScroll)
      
      return ()=>{
        cateScrollRef?.current?.removeEventListener('scroll', handleCateScroll)
        shopScrollRef?.current?.removeEventListener('scroll', handleShopScroll)
      }
    }
  }, [categories]);

  return (
    <div className='w-full min-h-screen bg-[#fff9f6] flex flex-col items-center overflow-y-auto'>
      <Nav/>

      {searchItems && searchItems.length > 0 && (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 p-6 bg-white shadow-lg rounded-2xl mt-6">
          <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold border-b border-gray-200 pb-3 mb-4">
            Search Results
          </h1>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchItems.map((item) => (
              <FoodCard data={item} key={item._id} />
            ))}
          </div>
        </div>
      )}

      {/* Category Section */}
      <div className='w-full max-w-7xl flex flex-col gap-5 items-start p-2 sm:p-5'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl'>Inspiration for Your First Order</h1>
        <div className='w-full relative flex items-center'>
          {showLeftCateButton && (
            <button
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer 
                w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center'
              onClick={()=>scrollHandler(cateScrollRef,"left")}
            >
              <FaCircleChevronLeft className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6' />
            </button>
          )}

          <div className='w-full flex overflow-x-auto gap-4 py-2' ref={cateScrollRef}>
            {categories?.map((cate,index)=>(
              <CategoryCard
                name={cate.category}
                image={cate.image}
                key={index}
                onClick={()=>handleFilterByCategory(cate.category)}
              />
            ))}
          </div>

          {showRightCateButton && (
            <button
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer
                w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center'
              onClick={()=>scrollHandler(cateScrollRef,"right")}
            >
              <FaCircleChevronRight className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6' />
            </button>
          )}
        </div>
      </div>

      {/* Shops Section */}
      <div className='w-full max-w-7xl flex flex-col gap-5 items-start p-2 sm:p-5'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl'>Best Shops in {currentCity}</h1>
        <div className='w-full relative flex items-center'>
          {showLeftShopButton && (
            <button
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer
                w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center'
              onClick={()=>scrollHandler(shopScrollRef,"left")}
            >
              <FaCircleChevronLeft className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6' />
            </button>
          )}

          <div className='w-full flex overflow-x-auto gap-4 py-2' ref={shopScrollRef}>
            {shopsInMyCity?.map((shop,index)=>(
              <CategoryCard
                name={shop.name}
                image={shop.image}
                key={index}
                onClick={()=>navigate(`/shop/${shop._id}`)}
              />
            ))}
          </div>

          {showRightShopButton && (
            <button
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer
                w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center'
              onClick={()=>scrollHandler(shopScrollRef,"right")}
            >
              <FaCircleChevronRight className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6' />
            </button>
          )}
        </div>
      </div>

      {/* Suggested Food Items */}
      <div className='w-full max-w-7xl flex flex-col gap-5 items-start p-2 sm:p-5'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl'>Suggested Food Items</h1>
        <div className='w-full h-auto flex flex-wrap gap-4 justify-center'>
          {updatedItemsList?.map((item,index)=>(
            <FoodCard key={index} data={item}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
