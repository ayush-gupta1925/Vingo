import React, { useState } from "react";
import ai from "../assets/aiC.png";
import { useNavigate } from "react-router-dom";
import open from "../assets/start.mp3";
import { useSelector } from "react-redux";
function Ai() {
  const navigate = useNavigate();
  let openingSound = new Audio(open);
const { userData } = useSelector(state => state.user);
  let [activeAi, setActiveAi] = useState(false);

  function speak(message) {
    let utterence = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterence);
  }

  const speechRecongnition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new speechRecongnition();
  if (!recognition) {
    console.log("Not Supported");
  }
  // recognition.onresult = (e) => {
  //   const transcript = e.results[0][0].transcript.trim();
  //   if (
  //     transcript.toLowerCase().includes("home") ||
  //     transcript.toLowerCase().includes("home page") ||
  //     transcript.toLowerCase().includes("open home page")
  //   ) {
  //     speak("opening home page");

  //     navigate("/");
  //   } else if (
  //     transcript.toLowerCase().includes("network") ||
  //     transcript.toLowerCase().includes("open network page") ||
  //     transcript.toLowerCase().includes("network page")
  //   ) {
  //     speak("open network page");
  //     navigate("/network");
  //   } else if (
  //     transcript.toLowerCase().includes("conversation") ||
  //     transcript.toLowerCase().includes("open conversation page") ||
  //     transcript.toLowerCase().includes("conversation page")
  //   ) {
  //     speak("opening conversations page");

  //     navigate("/conversations");
  //   } else if (
  //     transcript.toLowerCase().includes("profile") ||
  //     transcript.toLowerCase().includes("open profile page") ||
  //     transcript.toLowerCase().includes("profile page")
  //   ) {
  //     speak("opening profile page");

  //     navigate("/profile");
  //   } else if (
  //     transcript.toLowerCase().includes("notification") ||
  //     transcript.toLowerCase().includes("notification page") ||
  //     transcript.toLowerCase().includes("open notification page")
  //   ) {
  //     speak("opening notificationpage ");

  //     navigate("/notification");
  //   } else {
  //     console.log("try again");
  //   }
  // };


// recognition.onresult = (e) => {
//   const transcript = e.results[0][0].transcript.trim().toLowerCase();

//   if (transcript.includes("home") || transcript.includes("open home page")) {
//     speak("Opening home page");
//     navigate("/");
//   } else if (transcript.includes("sign up") || transcript.includes("signup page")) {
//     speak("Opening signup page");
//     navigate("/signup");
//   } else if (transcript.includes("sign in") || transcript.includes("login") || transcript.includes("signin page")) {
//     speak("Opening signin page");
//     navigate("/signin");
//   } else if (transcript.includes("forgot password") || transcript.includes("reset password")) {
//     speak("Opening forgot password page");
//     navigate("/forgot-password");
//   } else if (transcript.includes("create shop") || transcript.includes("edit shop") || transcript.includes("shop page")) {
//     speak("Opening create edit shop page");
//     navigate("/create-edit-shop");
//   } else if (transcript.includes("add item") || transcript.includes("new item")) {
//     speak("Opening add item page");
//     navigate("/add-item");
//   } else if (transcript.includes("cart") || transcript.includes("open cart page")) {
//     speak("Opening cart page");
//     navigate("/cart");
//   } else if (transcript.includes("checkout") || transcript.includes("payment page")) {
//     speak("Opening checkout page");
//     navigate("/checkout");
//   } else if (transcript.includes("order placed") || transcript.includes("success page")) {
//     speak("Opening order placed page");
//     navigate("/order-placed");
//   } else if (transcript.includes("my orders") || transcript.includes("orders page")) {
//     speak("Opening my orders page");
//     navigate("/my-orders");
//   } else {
//     speak("Sorry, please try again");
//     console.log("try again");
//   }
// };

recognition.onresult = (e) => {
  const transcript = e.results[0][0].transcript.trim().toLowerCase();
  const role = userData?.role; // "user", "owner", "deliveryBoy"


 // ❌ Agar userData nahi hai
  if (!userData) {
    if (transcript.includes("sign up") || transcript.includes("open signup page")) {
      speak("Opening signup page");
      navigate("/signup");
    } else if (
      transcript.includes("sign in") || 
      transcript.includes("open login") || 
      transcript.includes("signin page")
    ) {
      speak("Opening signin page");
      navigate("/signin");
    } else if (
      transcript.includes("forgot password") || 
      transcript.includes("reset password")
    ) {
      speak("Opening forgot password page");
      navigate("/forgot-password");
    } else {
      speak("Please login first to access this page");
      navigate("/signin");
    }
    return; // userData nahi hai to baki checks skip ho
  }



  if (transcript.includes("home") || transcript.includes("open home page")) {
    speak("Opening home page");
    navigate("/");
  } 
  else if (transcript.includes("sign up") || transcript.includes("open signup page")) {
    speak("Opening signup page");
    navigate("/signup");
  } 
  else if (transcript.includes("sign in") || transcript.includes("open login") || transcript.includes("signin page")) {
    speak("Opening signin page");
    navigate("/signin");
  } 
  else if (transcript.includes("forgot password") || transcript.includes("reset password")) {
    speak("Opening forgot password page");
    navigate("/forgot-password");
  } 

  // 🏪 Owner-only
  else if (transcript.includes("create shop") || transcript.includes("edit shop") || transcript.includes("open shop page")) {
    if (role === "owner") {
      speak("Opening create edit shop page");
      navigate("/create-edit-shop");
    } else {
      speak("This page is only for owners");
    }
  } 
  else if (transcript.includes("add item") || transcript.includes("open new item")) {
    if (role === "owner") {
      speak("Opening add item page");
      navigate("/add-item");
    } else {
      speak("This page is only for owners");
    }
  } 

  // 🛒 User-only
  else if (transcript.includes("cart page") || transcript.includes("open cart page")) {
    if (role === "user") {
      speak("Opening cart page");
      navigate("/cart");
    } else {
      speak("This page is only for users");
    }
  } 
  else if (transcript.includes("checkout page") || transcript.includes("open payment page")) {
    if (role === "user") {
      speak("Opening checkout page");
      navigate("/checkout");
    } else {
      speak("This page is only for users");
    }
  } 
  else if (transcript.includes("order placed") || transcript.includes("open success page")) {
    if (role === "user") {
      speak("Opening order placed page");
      navigate("/order-placed");
    } else {
      speak("This page is only for users");
    }
  } 

  // 👨‍👩‍👧 User & Owner dono
  else if (transcript.includes("my orders") || transcript.includes("open orders page")) {
    if (role === "user" || role === "owner") {
      speak("Opening my orders page");
      navigate("/my-orders");
    } else {
      speak("This page is only for users and owners");
    }
  } 

  else {
    speak("Sorry, please try again");
    console.log("try again");
  }
};


  recognition.onend = () => {
    setActiveAi(false);
  };

  return (
<div
  className="fixed lg:bottom-[20px] md:bottom-[20px] bottom-[15px] left-[2%] z-[9999]"
  onClick={() => {
    recognition.start();
    openingSound.play();
    setActiveAi(true);
  }}
>
  <div
    className={`cursor-pointer rounded-full p-[3px] bg-gradient-to-r from-pink-500 via-orange-500 via-yellow-400 via-green-500 via-blue-500 to-purple-600
      transform transition-all duration-300
      ${activeAi 
        ? "translate-x-[10%] translate-y-[-10%] scale-125 shadow-[0_0_25px_#ff6600,_0_0_35px_#00bfff,_0_0_45px_#39ff14]" 
        : "translate-x-0 translate-y-0 scale-100 shadow-[0_0_5px_#ff6600,_0_0_8px_#00bfff]"}`
    }
  >
    <img
      src={ai}
      className="rounded-full w-14 sm:w-16 md:w-20 bg-black"
      style={{
        filter: activeAi
          ? "grayscale(0%) drop-shadow(0 0 15px #ff6600)"
          : "grayscale(50%) drop-shadow(0 0 5px #888888)"
      }}
    />
  </div>
</div>




  );
}

export default Ai;
