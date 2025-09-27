import DilveryAssignment from "../models/deliveryAssignment.model.js";
import Order from "../models/order.model.js";
import Shop from "../models/shop.model.js";
import User from "../models/user.model.js";
import { sendDeliveryOtpMail } from "../utils/mail.js";
import Razorpay from "razorpay"
import dotenv from "dotenv"

dotenv.config()

let instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export const placeOrder = async(req,res)=>{

  try {
    const {cartItems,paymentMethod,deliveryAddress,totalAmount} = req.body;
  if(cartItems.length == 0 || !cartItems){
    return res.status(400).json({message:"cart is empty"})
  }

  if(!deliveryAddress.text || !deliveryAddress.lattitude ||!deliveryAddress.longitude){
     return res.status(400).json({message:"Send Complete Delivery Address"})
  }
  const groupItemByShop = {}
  cartItems.forEach(item  => {const shopId = item.shop
    if(!groupItemByShop[shopId]){
      groupItemByShop[shopId] = []
    }
    groupItemByShop[shopId].push(item)
  });

const shopOrders = await Promise.all(Object.keys(groupItemByShop).map( async (shopId)=>{
const shop = await Shop.findById(shopId).populate("owner")
if(!shop){
     return res.status(400).json({message:"Shop Not Found"})
}
const items = groupItemByShop[shopId]
const subTotal =  items.reduce((sum,i)=>sum+Number(i.price)*Number(i.quantity),0)
return {
  shop:shop._id,
  owner:shop.owner._id,
  subTotal,
  shopOrderItems:items.map((i)=>({
    item:i.id,
    price:i.price,
    quantity:i.quantity,
    name:i.name
    
  }))
}
}))

if(paymentMethod == "online"){
  const razorOrder = await instance.orders.create({
    amount:Math.round(totalAmount*100),
    currency:'INR',
    receipt:`receipt_${Date.now()}`
  })
  const newOrder = await Order.create({
  user:req.userId,
  paymentMethod,
  deliveryAddress,
  totalAmount,
  shopOrders,
  razorpayOrderId:razorOrder.id,
  payment:false
})

return res.status(200).json({
  razorOrder,
  orderId:newOrder._id
  
})
}





const newOrder = await Order.create({
  user:req.userId,
  paymentMethod,
  deliveryAddress,
  totalAmount,
  shopOrders
})

await newOrder.populate("shopOrders.shopOrderItems.item","name image price")
await newOrder.populate("shopOrders.shop", "name socketId")
await newOrder.populate("user", "name email mobile")
await newOrder.populate("shopOrders.owner", "name email socketId")


const io = req.app.get('io')
if(io){
newOrder.shopOrders.forEach(shopOrder =>{
    const ownerSocketId = shopOrder.owner.socketId
    if(ownerSocketId){
      io.to(ownerSocketId).emit('newOrder', {
          _id:newOrder._id,
          paymentMethod:newOrder.paymentMethod,
          user:newOrder.user,
          shopOrders:shopOrder,
          createdAt:newOrder.createdAt,
          deliveryAddress:newOrder.deliveryAddress,
          payment:newOrder.payment
         })
    }
})
}

return res.status(201).json(newOrder)

  } catch (error) {
    return res.status(500).json({message:`place order error ${error}`})
  }
  

}


export const verifyPayment = async(req,res)=>{
  try {
    const {razorpay_payment_id,orderId} = req.body;
    const payment = await instance.payments.fetch(razorpay_payment_id)
    if(!payment || payment.status != "captured"){
      return res.status(400).json({message:"Payment Failed !"})
    }
    const order = await Order.findById(orderId)
    if(!order){
      return res.status(400).json({message:"Order Not Found !"})
    }
order.payment = true
order.razorpayPaymentId = razorpay_payment_id
await order.save()



await order.populate("shopOrders.shopOrderItems.item","name image price")
await order.populate("shopOrders.shop", "name socketId")
await order.populate("user", "name email mobile")
await order.populate("shopOrders.owner", "name email socketId")


const io = req.app.get('io')
if(io){
order.shopOrders.forEach(shopOrder =>{
    const ownerSocketId = shopOrder.owner.socketId
    if(ownerSocketId){
      io.to(ownerSocketId).emit('newOrder', {
          _id:order._id,
          paymentMethod:order.paymentMethod,
          user:order.user,
          shopOrders:shopOrder,
          createdAt:order.createdAt,
          deliveryAddress:order.deliveryAddress,
          payment:order.payment
         })
    }
})
}




return res.status(200).json(order)
 
  } catch (error) {
    return res.status(500).json({message:`verify order error ${error}`}) 
  }
}



export const getMyOrders =  async(req,res)=>{
  try {

    const user = await User.findById(req.userId)

    if(user.role == "user"){
    const orders = await Order.find({user:req.userId}).sort({createdAt : -1}).populate("shopOrders.shop" , "name").populate("shopOrders.owner" , "name email mobile").populate("shopOrders.shopOrderItems.item","name image price")

    return res.status(200).json(orders)
    } else if(user.role == "owner"){
         const orders = await Order.find({"shopOrders.owner":req.userId}).sort({createdAt : -1}).populate("shopOrders.shop" , "name").populate("user").populate("shopOrders.shopOrderItems.item","name image price").populate("shopOrders.assignedDilveryBoy","fullName mobile ")
        


         
         const filteredOrders = orders.map((order=>({
          _id:order._id,
          paymentMethod:order.paymentMethod,
          user:order.user,
          shopOrders:order.shopOrders.find(o=>o.owner._id == req.userId),
          createdAt:order.createdAt,
          deliveryAddress:order.deliveryAddress,
          payment:order.payment
         })))

    return res.status(200).json(filteredOrders)
    }
    
  } catch (error) {
        return res.status(500).json({message:`get user order error ${error}`})
  }
}

  




export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, shopId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);

    const shopOrder = order.shopOrders.find(
      (o) => String(o.shop) === String(shopId)
    );

    if (!shopOrder) {
      return res.status(400).json({ message: "shop order not found" });
    }

    shopOrder.status = status;
    let deliveryBoysPayload = [];

    // ✅ Delivery boy assign logic
    if (status === "out of delivery" &&  !shopOrder.assignment) {
      const { longitude, lattitude } = order.deliveryAddress;

      const nearByDeliveryBoys = await User.find({
        role: "deliveryBoy",
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [Number(longitude), Number(lattitude)],
            },
            $maxDistance: 50000,
          },
        },
      });

      const nearByIds = nearByDeliveryBoys.map((b) => b._id);

      const busyIds = await DilveryAssignment.find({
        assignedTo: { $in: nearByIds },
        status: { $nin: ["brodcasted", "completed"] },
      }).distinct("assignedTo");

      const busyIdSet = new Set(busyIds.map((id) => String(id)));
      const availableBoys = nearByDeliveryBoys.filter(
        (b) => !busyIdSet.has(String(b._id))
      );

      const candidates = availableBoys.map((b) => b._id);

      if (candidates.length === 0) {
        await order.save();
        return res.json({
          message:
            "order status updated but there is no available delivery boys",
        });
      }

      const deliveryAssignment = await DilveryAssignment.create({
        order: order._id,
        shop: shopOrder.shop,
        shopOrderId: shopOrder._id,
        broadcastedTo: candidates,
        status: "brodcasted",
      });

      shopOrder.assignedDilveryBoy = deliveryAssignment.assignedTo;
      shopOrder.assignment = deliveryAssignment._id;

      deliveryBoysPayload = availableBoys.map((b) => ({
        id: b._id,
        fullName: b.fullName,
        longitude: b.location.coordinates?.[0],
        lattitude: b.location.coordinates?.[1],
        mobile: b.mobile,
      }));

      await deliveryAssignment.populate('order')
      await deliveryAssignment.populate('shop')

       const io = req.app.get('io')
       if(io){
        availableBoys.forEach( boy =>{
      const boySocketId = boy.socketId;
      if(boySocketId){
        io.to(boySocketId).emit('newAssignment',{
          sendTo:boy._id,
          assignmentId: deliveryAssignment._id,
        orderId: deliveryAssignment.order._id,
        shopName: deliveryAssignment.shop?.name,
        deliveryAddress: deliveryAssignment.order.deliveryAddress,
        items: deliveryAssignment.order.shopOrders.find(so=> so._id.equals(deliveryAssignment.shopOrderId)) || [],
        subTotal: deliveryAssignment.order.shopOrders.find(so=> so._id.equals(deliveryAssignment.shopOrderId)).subTotal || 0,
        })
      }
        })
       }




    }

    await order.save();




    
 // After await order.save()
await order.populate("shopOrders.shop", "name owner socketId");
await order.populate("shopOrders.assignedDilveryBoy", "fullName email mobile");
await order.populate("user", "socketId fullName"); // ✅ make sure socketId is included

const updatedShopOrder = order.shopOrders.find(
  (o) => String(o.shop._id) === String(shopId)
);

const io = req.app.get("io");

if (io) {
  // 🔔 Send to User
  if (order.user?.socketId) {
    io.to(order.user.socketId).emit("update-status", {
      orderId: order._id,
      shopId: updatedShopOrder.shop._id,
      status: updatedShopOrder.status,
      shopName: updatedShopOrder.shop?.name,
      deliveryBoy: updatedShopOrder.assignedDilveryBoy || null
    });
  }

  // 🔔 Send to Owner
  const ownerSocketId = updatedShopOrder.shop?.owner?.socketId;
  // if (ownerSocketId) {
  //   io.to(ownerSocketId).emit("update-status", {
  //     orderId: order._id,
  //     shopId: updatedShopOrder.shop._id,
  //     status: updatedShopOrder.status,
  //     shopName: updatedShopOrder.shop?.name,
  //     deliveryBoy: updatedShopOrder.assignedDilveryBoy || null
  //   });
  // }
    if (ownerSocketId) {
    io.to(ownerSocketId).emit("update-status", {
      orderId: order._id,
      shopId: updatedShopOrder.shop._id,
      status: updatedShopOrder.status,
      shopName: updatedShopOrder.shop?.name,
      deliveryBoy: updatedShopOrder.assignedDilveryBoy || null,
      userId: order.user._id, // owner ke liye bhi userId bhejo
    });
  }

  // 🔔 Optional: Notify assigned delivery boy
  if (updatedShopOrder.assignedDilveryBoy?.socketId) {
    io.to(updatedShopOrder.assignedDilveryBoy.socketId).emit("update-status", {
      orderId: order._id,
      shopId: updatedShopOrder.shop._id,
      status: updatedShopOrder.status,
      shopName: updatedShopOrder.shop?.name
    });
  }
}



    return res.status(200).json({
      shopOrder: updatedShopOrder,
      assignedDilveryBoy: updatedShopOrder?.assignedDilveryBoy,
      availableBoys: deliveryBoysPayload,
      assignment: updatedShopOrder?.assignment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `order status error ${error.message}` });
  }
};


export const getDeliveryBoyAssignment = async (req, res) => {
  try {
    const deliveryBoyId = req.userId;

    const assignments = await DilveryAssignment.find({
      broadcastedTo: deliveryBoyId, // ✅ spelling fixed
      status: "brodcasted",
    })
      .populate("order")
      .populate("shop");

    if (!assignments || assignments.length === 0) {
      return res.status(200).json([]); // no assignments
    }

    const formatted = assignments.map((a) => {
      const shopOrder = a.order.shopOrders.find((so) =>
        so._id.equals(a.shopOrderId)
      );

      return {
        assignmentId: a._id,
        orderId: a.order._id,
        shopName: a.shop?.name,
        deliveryAddress: a.order.deliveryAddress,
        items: shopOrder ? shopOrder.shopOrderItems : [],
        subTotal: shopOrder ? shopOrder.subTotal : 0,
      };
    });

    return res.status(200).json(formatted);
  } catch (error) {
    return res
      .status(500)
      .json({ message: ` get assignment error ${error.message}` });
  }
};


export const getAvailableDeliveryBoys = async (req, res) => {
  try {
    const { orderId, shopId } = req.params;
    const order = await Order.findById(orderId)
      .populate("shopOrders.shop", "name")
      .populate("shopOrders.assignedDilveryBoy", "fullName email mobile");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const shopOrder = order.shopOrders.find(
      (o) => String(o.shop._id) === String(shopId)
    );

    if (!shopOrder) {
      return res.status(404).json({ message: "Shop order not found" });
    }

    // agar assigned boy hai toh wahi bhej do
    if (shopOrder.assignedDilveryBoy) {
      return res.status(200).json({
        assignedDilveryBoy: shopOrder.assignedDilveryBoy,
        availableBoys: [],
      });
    }

    // agar assignment hai toh uss assignment ke broadcasted boys fetch karo
    if (shopOrder.assignment) {
      const assignment = await DilveryAssignment.findById(shopOrder.assignment).populate(
        "broadcastedTo",
        "fullName mobile"
      );

      return res.status(200).json({
        assignedDilveryBoy: null,
        availableBoys: assignment.broadcastedTo || [],
      });
    }

    return res.status(200).json({
      assignedDilveryBoy: null,
      availableBoys: [],
    });
  } catch (error) {
    return res.status(500).json({ message: `get available boys error ${error.message}` });
  }
};




export const acceptOrder = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    // const assignment = await DilveryAssignment.findById(assignmentId)
    //   .populate("order")
    //   .populate("shop");

const assignment = await DilveryAssignment.findById(assignmentId)
  .populate({
    path: "order",
    populate: [
      { path: "user", select: "socketId fullName" },
      { path: "shopOrders.shop", populate: { path: "owner", select: "socketId fullName email" } }
    ]
  })
  .populate("shop");




    if (!assignment) {
      return res.status(400).json({ message: "assignment not found" });
    }

    assignment.assignedTo = req.userId;
    assignment.status = "assigned";
    assignment.acceptedDate = new Date();
    await assignment.save();

    // const order = await Order.findById(assignment.order)
    //   .populate("user", "socketId")
    //   .populate({
    //     path: "shopOrders.shop",
    //     populate: { path: "owner", select: "socketId fullName email" }
    //   });

  // 2️⃣ Emit real-time event baki delivery boys ke liye
  req.app.get("io").emit("assignmentRemoved", { assignmentId });


const order = await Order.findById(assignment.order)
       .populate("user", "socketId")
        await order.populate({
  path: "shopOrders.shop",
  populate: { path: "owner", select: "socketId fullName email" }
});


      

    const shopOrder = order.shopOrders.id(assignment.shopOrderId);
    shopOrder.assignedDilveryBoy = req.userId;
    await order.save();

    const deliveryBoy = await User.findById(req.userId).select("fullName mobile");
    const io = req.app.get("io");

    // 🔔 Send to Owner
    // const ownerSocketId = shopOrder.shop?.owner?.socketId;
    // if (ownerSocketId) {
    //   io.to(ownerSocketId).emit("deliveryBoyAssigned", {
    //     orderId: order._id,
    //     shopOrderId: shopOrder._id,
    //     deliveryBoyId: req.userId,
    //     fullName: deliveryBoy.fullName,
    //     mobile: deliveryBoy.mobile
    //   });
    // }

//     const ownerSocketId = shopOrder.shop?.owner?.socketId;
// if (ownerSocketId) {
//   io.to(ownerSocketId).emit("deliveryBoyAssigned", {
//     orderId: order._id,
//     shopOrderId: shopOrder._id,
//     deliveryBoyId: req.userId,
//     fullName: deliveryBoy.fullName,
//     mobile: deliveryBoy.mobile
//   });
// }

const ownerSocketId = shopOrder.shop?.owner?.socketId;
if(ownerSocketId){
  io.to(ownerSocketId).emit("deliveryBoyAssigned", {
    orderId: order._id,
    shopOrderId: shopOrder._id,
    deliveryBoyId: req.userId,
    fullName: deliveryBoy.fullName,
    mobile: deliveryBoy.mobile,
  });
}



    // 🔔 Send to User
    if (order.user?.socketId) {
      io.to(order.user.socketId).emit("deliveryBoyAssigned", {
        orderId: order._id,
        shopOrderId: shopOrder._id,
        deliveryBoyId: req.userId,
        fullName: deliveryBoy.fullName
      });
    }

    return res.status(200).json({ message: "Order Accepted" });
  } catch (error) {
    return res.status(500).json({ message: `Accept order error ${error.message}` });
  }
};






export const getCurrentOrder  = async(req,res)=>{

  try {
    // const assigenment = await DilveryAssignment.findOne({
    //   assignedTo:req.userId,
    //   status:"assigned"
    // })
    // .populate("shop","name")
    // .populate("assignedTo","fullName email mobile location")
    // .populate({
    //   path:"order",
    //   populate:[{path:"user",select:"fullName email location mobile"}]
      
    // })

    const assigenment = await DilveryAssignment.findOne({
  assignedTo: req.userId,
  status: "assigned"
})
.populate("shop", "name")
.populate("assignedTo", "fullName email mobile location")
.populate({
  path: "order",
  populate: [
    { path: "user", select: "fullName email location mobile" },
    { path: "shopOrders.shop", select: "name" }   // ✅ yaha populate add kiya
  ]
});


    if(!assigenment){
      return res.status(400).json({message:"assigment not found"})
    }
    if(!assigenment.order){
      return res.status(400).json({message:"order not found"})
    }

    // const shopOrder = assigenment.order.shopOrders.find(so=>String(so._id) == String(assigenment.shopOrderId)) 

    const shopOrder = assigenment.order.shopOrders.find(
  so => String(so._id) === String(assigenment.shopOrderId)
);

    if(!shopOrder){
      return res.status(400).json({message:"shopOrder not found"})
    }

    let deliveryBoyLocation = {lat:null,lon:null}

    if(assigenment.assignedTo.location.coordinates.length == 2){
    deliveryBoyLocation.lat = assigenment.assignedTo.location.coordinates[1]
     deliveryBoyLocation.lon = assigenment.assignedTo.location.coordinates[0]
    }


    const customerLocation = {lat:null,lon:null}

    if(assigenment.order.deliveryAddress){
customerLocation.lat = assigenment.order.deliveryAddress.lattitude
    customerLocation.lon = assigenment.order.deliveryAddress.longitude
     
    }
    
    // return res.status(200).json({
    //   _id:assigenment.order._id,
    //   user:assigenment.order.user,
    //   shopOrder,
    //   deliveryAddress:assigenment.order.deliveryAddress,
    //   deliveryBoyLocation,
    //   customerLocation
    // })



    return res.status(200).json({
  _id: assigenment.order._id,
  user: assigenment.order.user,
  shopOrder,   // ✅ ab isme shop.name bhi aayega
  deliveryAddress: assigenment.order.deliveryAddress,
  deliveryBoyLocation,
  customerLocation
});
  
  } catch (error) {
     return res
      .status(500)
      .json({ message: ` current order error ${error.message}` });
  }
}


export const getOrderById = async(req,res)=>{
  try {
    const {orderId} = req.params;
    
    const order = await Order.findById(orderId).populate("user").populate({
      path:"shopOrders.shop",
      model:"Shop"
    }).populate({
      path:"shopOrders.assignedDilveryBoy",
      model:"User"
    }).populate({
      path:"shopOrders.shopOrderItems.item",
      model:"Item"
    }).lean()

    if(!order){
      return res.status(400).json({message:"order not found"})
    }

    return res.status(200).json(order)


    
  } catch (error) {
       return res
      .status(500)
      .json({ message: ` get by id order error ${error.message}` });
  }
}



export const sendDeliveryOtp = async(req,res)=>{
  try {
    console.log("send otp")
    const {orderId,shopOrderId} = req.body;
    const order = await Order.findById(orderId).populate("user")
    const shopOrder = order.shopOrders.id(shopOrderId)
    if(!order ||  !shopOrder){
           return res.status(400).json({message:"Enter valid order/shopOrderId"})
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString()
    shopOrder.deliveryOtp = otp
    shopOrder.otpExpires = Date.now() + 5*60*1000
    await order.save()
    console.log(process.env.USER_EMAIL)
console.log(process.env.USER_PASSWORD)
    console.log(order.user)
     console.log(otp)
    
    console.log("before calling rhr sendotp mail")
    await sendDeliveryOtpMail(order.user,otp)
    console.log("after calling rhr sendotp mail")
    return res.status(200).json({message:`Otp send Successfully ${order.user?.fullName}`})
  } catch (error) {
      return res
      .status(500)
      .json({ message: ` send otp error ${error.message}` });
  }
}



export const verifyDeliveryOtp = async (req, res) => {
  try {
    const { orderId, shopOrderId, otp } = req.body;
  // const order = await Order.findById(orderId)
  // .populate("user", "socketId")
  // .populate({
  //   path: "shopOrders.shop",
  //   populate: { path: "owner", select: "socketId fullName email" }
  // });

  // const order = await Order.findById(orderId)
  // .populate("user", "socketId fullName")
  // .populate({
  //   path: "shopOrders.shop",
  //   populate: { path: "owner", select: "socketId fullName email" }
  // });


  const order = await Order.findById(orderId)
  .populate("user", "socketId fullName")
  .populate({
    path: "shopOrders.shop",
    populate: { path: "owner", select: "socketId fullName email" }
  });


  


    const shopOrder = order.shopOrders.id(shopOrderId);

    if (!order || !shopOrder) {
      return res.status(400).json({ message: "Invalid order/shopOrderId" });
    }

    if (
      shopOrder.deliveryOtp !== otp ||
      !shopOrder.otpExpires ||
      shopOrder.otpExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid / Expired Otp" });
    }

    shopOrder.status = "delivered";
    shopOrder.deliveredAt = Date.now();
    await order.save();

    await DilveryAssignment.deleteOne({
      shopOrderId: shopOrder._id,
      order: order._id,
      assignedTo: shopOrder.assignedDilveryBoy,
    });

const io = req.app.get("io");

// 🔔 Notify Owner
// const ownerSocketId = shopOrder.shop?.owner?.socketId;
// if (ownerSocketId) {
//   io.to(ownerSocketId).emit("orderDelivered", {
//     orderId: order._id,
//     shopOrderId: shopOrder._id,
//     deliveryBoy: shopOrder.assignedDilveryBoy
//   });
// }

const ownerSocketId = shopOrder.shop?.owner?.socketId;
if (ownerSocketId) {
  io.to(ownerSocketId).emit("orderDelivered", {
    orderId: order._id,
    shopOrderId: shopOrder._id,
    deliveryBoy: shopOrder.assignedDilveryBoy
  });
}



// 🔔 Notify User
if (order.user?.socketId) {
  io.to(order.user.socketId).emit("orderDelivered", {
    orderId: order._id,
    shopOrderId: shopOrder._id,
  });
}

// 🔔 Notify Delivery Boy (optional if needed)
if (shopOrder.assignedDilveryBoy) {
  const deliveryBoy = await User.findById(shopOrder.assignedDilveryBoy).select("socketId");
  if (deliveryBoy?.socketId) {
    io.to(deliveryBoy.socketId).emit("orderDelivered", {
      orderId: order._id,
      shopOrderId: shopOrder._id,
    });
  }
}


    return res.status(200).json({ message: "Order Delivered Successfully !" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `verify delivery otp error ${error.message}` });
  }
};



export const getTodayDelivaries = async(req,res)=>{
  try {
   const deliveryBoyId = req.userId;
   const startsDay = new Date()
   startsDay.setHours(0,0,0,0)
   const orders = await Order.find({
    "shopOrders.assignedDilveryBoy":deliveryBoyId,
    "shopOrders.status":"delivered",
     "shopOrders.deliveredAt":{$gte:startsDay}
   }).lean()

   let todaysDeliveries = []
   orders.forEach(order => {
    order.shopOrders.forEach(shopOrder =>{
      if(shopOrder.assignedDilveryBoy == deliveryBoyId && shopOrder.status == "delivered" && shopOrder.deliveredAt >= startsDay ){
        todaysDeliveries.push(shopOrder)
      }
    })
   })

  let stats = {}
  todaysDeliveries.forEach(shopOrder =>{
    const hour = new Date(shopOrder.deliveredAt).getHours()
    stats[hour]  = (stats[hour] || 0) + 1
  })
  
let formattedStats = Object.keys(stats).map(hour => ({
  hour:parseInt(hour),
  count:stats[hour]
}))

 formattedStats.sort((a,b)=>a.hour - b.hour)
return res.status(200).json(formattedStats)

  } catch (error) {
    return res
      .status(500)
      .json({ message: ` today deliveries error ${error.message}` });
  }
}
