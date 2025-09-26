import mongoose from "mongoose";

const deliveryAssignmentSchema = new mongoose.Schema({
  order:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Order"
  },
  shop:{
      type:mongoose.Schema.Types.ObjectId,
    ref:"Shop"
  },
  shopOrderId:{
          type:mongoose.Schema.Types.ObjectId,
  required:true
  },
  broadcastedTo:[{
    type:mongoose.Schema.Types.ObjectId,
ref:"User"
  }],
  assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
ref:"User",
default:null
  },
  status:{
    type:String,
    enum:["brodcasted","assigned","completed"],
    default:"brodcasted"
  },acceptedDate:Date

},{timestamps:true})

const DilveryAssignment = mongoose.model("DilveryAssignment",deliveryAssignmentSchema)
export default DilveryAssignment