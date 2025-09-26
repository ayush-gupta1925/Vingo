import mongoose, { mongo } from "mongoose"


const shopOrderItemSchema = new mongoose.Schema({
  item:{
      type:mongoose.Schema.Types.ObjectId, 
    ref:"Item",
    required:true 
  }, 
  name:String,
  price:Number,
  image: String,  // ✅ ensure this exists
  quantity:Number
},{timestamps:true})

const shopOrderSchema = new mongoose.Schema({
  shop:{
       type:mongoose.Schema.Types.ObjectId,
    ref:"Shop" 
  },
  owner:{
       type:mongoose.Schema.Types.ObjectId,
     ref:"User" 
  },
  subTotal:Number,
  shopOrderItems:[shopOrderItemSchema],
  status:{
    type:String,
    enum:["pending","preparing","out of delivery","delivered"],
    default:"pending"
  },
  assignment:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"DilveryAssignment",
     default:null
  },
  assignedDilveryBoy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
  },
  deliveryOtp:{
    type:String,
    default:null
  },
 
  otpExpires:{
    type:Date,
    default:null
  },

   deliveredAt:{
    type:Date,
    default:null
   }

},{timestamps:true})
const orderSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  paymentMethod:{
    type:String,
    enum:['cod',"online"],
    required:true

  },
  deliveryAddress:{
    text:String,
    lattitude:Number,
    longitude:Number
  },
  totalAmount:{
    type:Number
  },
  shopOrders:[
shopOrderSchema
  ],
  payment:{
    type:Boolean,
    default:false
  },
  razorpayOrderId:{
    type:String,
    default:""
  },
  razorpayPaymentId:{
    type:String,
    default:""
  }

},{timestamps:true})

const Order = mongoose.model("Order",orderSchema)
export default Order