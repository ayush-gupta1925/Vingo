import mongoose, { mongo } from "mongoose";

const itemsSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  shop:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Shop"
  },
  category:{
    type:String,
    enum:["Snacks","Main Course","Desserts","Pizza","Burgers","Sandwiches","South Indian","North Indian","Chinese","Fast Food" ,"Others"],
    required:true
  },
  price:{
    type:Number,
    min:0,
    required:true
  },
 foodType:{
  type:String,
  enum:["veg","non veg"],
  required:true
  },
 rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      value: { type: Number, min: 1, max: 5 }
    }
  ]
},{timestamps:true})

const Item = mongoose.model("Item",itemsSchema)
export default Item; 