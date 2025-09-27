import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// export const addItem = async(req,res)=>{
//   try {
//     const {name,category,foodType,price} = req.body;
//     let image;
//     if(req.file){
//       image = await uploadOnCloudinary(req.file.path)
//     }
//     const shop = await Shop.findOne({owner:req.userId})

//    if(!shop){
//     return res.status(400).json({message:"shop not found"})
//    }

//     const item = await Item.create({
//       name,category,foodType,price,image,shop:shop._id
//     })

//     shop.items.push(item._id)
//     await shop.save()
//  // yahan chaining ki jagah array pass karein
// await shop.populate([
//   { path: "owner" },
//   { path: "items", options: { sort: { updatedAt: -1 } } }
// ]);
//     return res.status(201).json(shop)

//   } catch (error) {
//      return res.status(400).json({message:`add item error ${error}`})

//   }
// }



// export const addItem = async (req, res) => {
//   try {

//       console.log("Body:", req.body);
//     console.log("File:", req.file);
//     console.log("UserId:", req.userId);
//     const { name, category, foodType, price } = req.body;

//     if (!name || !category || !foodType || !price) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     let image = null;
//     if (req.file) {
//       try {
//         image = await uploadOnCloudinary(req.file.path);
//       } catch (err) {
//         return res.status(500).json({ message: `Image upload failed: ${err.message}` });
//       }
//     }

//     const shop = await Shop.findOne({ owner: req.userId });
//     if (!shop) {
//       return res.status(404).json({ message: "Shop not found for this user" });
//     }

//     const item = await Item.create({
//       name,
//       category,
//       foodType,
//       price,
//       image,
//       shop: shop._id,
//     });

//     shop.items.push(item._id);
//     await shop.save();

//     await shop.populate([
//       { path: "owner" },
//       { path: "items", options: { sort: { updatedAt: -1 } } },
//     ]);

//     return res.status(201).json(shop);
//   } catch (error) {
//     console.error("Add Item Error:", error);
//     return res.status(500).json({ message: `Server error: ${error.message}` });
//   }
// };


export const addItem = async (req, res) => {
  try {
     console.log("➡️ BODY:", req.body);
    console.log("➡️ FILE:", req.file);   // 👀 check multer file
    console.log("➡️ USER:", req.userId);

    const { name, category, foodType, price } = req.body;
    if (!name || !category || !foodType || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Upload image if file exists
    let image = null;
    if (req.file?.path) {
      try {
        image = await uploadOnCloudinary(req.file.path);
        if (!image) return res.status(400).json({ message: "Image upload failed" });
      } catch (err) {
        console.error("Cloudinary upload error:", err);
        return res.status(500).json({ message: `Image upload failed: ${err.message}` });
      }
    } else {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Find user's shop
    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res.status(404).json({ message: "Shop not found for this user" });
    }

    // Create item
    const item = await Item.create({
      name,
      category,
      foodType,
      price,
      image,
      shop: shop._id,
    });

    shop.items.push(item._id);
    await shop.save();

    await shop.populate([
      { path: "owner" },
      { path: "items", options: { sort: { updatedAt: -1 } } },
    ]);

    return res.status(201).json(shop);
  } catch (error) {
    console.error("Add Item Error:", error);
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
};


export const editItem = async(req,res)=>{
  try {
    const itemId = req.params.itemId;
    const {name,category,foodType,price} = req.body;
    let image ;
    if(req.file){
      image = await uploadOnCloudinary(req.file.path)
    }

    const item = await Item.findByIdAndUpdate(itemId,{
      name,category,foodType,price,image
    },{new:true})
    if(!item){
      return res.status(400).json({message:"item not found"})
    }
    const shop = await Shop.findOne({owner:req.userId}).populate([
  { path: "items", options: { sort: { updatedAt: -1 } } }
]);
     return res.status(201).json(shop)

  } catch (error) {
      return res.status(400).json({message:`edit item error ${error}`})
  }
} 

export  const getItemById = async(req,res)=>{
  try {
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId)
    if(!item){
    return res.status(400).json({message:"item not found"})
    }
    return res.status(200).json(item)

  } catch (error) {
     return res.status(400).json({message:`get item error ${error}`})
  }
}

export const deleteItem = async(req,res)=>{
  try {
    const itemId = req.params.itemId
    const item = await Item.findByIdAndDelete(itemId)
       if(!item){
    return res.status(400).json({message:"item not found"})
    }
    const shop = await Shop.findOne({owner:req.userId})
    shop.items = shop.items.filter(i=>i !== item._id)
    await shop.save()
    await shop.populate([
  { path: "items", options: { sort: { updatedAt: -1 } } }
]);
      return res.status(201).json(shop)
  } catch (error) {
       return res.status(400).json({message:`delete item error ${error}`})
  }
}


export const getItemByCity = async(req,res)=>{
  try {
     const {city} = req.params;

 if(!city){
      return res.status(400).json({message:"city is not found"})
    }
    const shops = await Shop.find({
  city: { $regex: new RegExp(`^${city}$`, "i") }
}).populate("items");

    if(!shops){
      return res.status(400).json({message:"shops not fond"})
    }
    const shopIds = shops.map((shop)=>shop._id)
    const items = await Item.find({shop:{$in:shopIds}})
    return res.status(200).json(items)
  } catch (error) {
      return res.status(400).json({message:`get  item by city error ${error}`})
  }
}

export const getItemsByShop = async(req,res)=>{
  try {
    const {shopId} =  req.params;
    const shop = await Shop.findById(shopId).populate("items")
    if(!shop){
      return res.status(400).json("shop not found")
    }
    return res.status(200).json({shop,items:shop.items})
  } catch (error) {
    return res.status(400).json({message:`get  item by shop error ${error}`})
  }
} 

export const searchItems = async(req,res)=>{

  try {
    const {query,city} = req.query;
  if(!query || !city){
    return null
  }
      const shops = await Shop.find({
    city: { $regex: new RegExp(`^${city}$`, "i") }
  }).populate("items");
  
      if(!shops){
        return res.status(400).json({message:"shops not fond"})
      }
      const shopIds = shops.map(s=>s._id)
      const items = await Item.find({
        shop:{$in:shopIds},
        $or:[
          {name:{$regex:query,$options:"i"}},
          {category:{$regex:query,$options:"i"}}
        ]
      }).populate("shop","name image")
      return res.status(200).json(items)
  } catch (error) {
    return res.status(400).json({message:`search  item error ${error}`})
  }
  

}



export const rating = async (req, res) => {
  try {
    const { itemId, rating } = req.body;
    const userId = req.userId; // 👈 middleware se aayega

    if (!itemId || !rating) {
      return res.status(400).json({ message: "ItemId and Rating is Required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be 1 to 5" });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(400).json({ message: "Item not Found" });
    }

    // 👇 Check agar user ne already rating di hai
    const existing = item.ratings.find(r => r.user.toString() === userId);
    if (existing) {
      return res.status(400).json({ message: "You have already rated this item" });
    }

    // 👇 New rating add
    item.ratings.push({ user: userId, value: rating });

    // Average update
    const newCount = item.rating.count + 1;
    const newAverage = (item.rating.average * item.rating.count + rating) / newCount;

    item.rating.count = newCount;
    item.rating.average = newAverage;

    await item.save();

    return res.status(200).json({
      rating: item.rating,
      userRating: rating
    });
  } catch (error) {
    return res.status(500).json({ message: `rating error ${error.message}` });
  }
};

// controllers/item.controller.js
export const getUserRating = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.userId;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }

    const userRating = item.ratings.find(r => r.user.toString() === userId);

    return res.status(200).json({
      userRating: userRating ? userRating.value : null
    });
  } catch (error) {
    return res.status(500).json({ message: `get user rating error ${error.message}` });
  }
};
