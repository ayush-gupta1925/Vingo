import express from "express"
import isAuth from "../middlewares/isAuth.js";
import { addItem, deleteItem, editItem, getItemByCity, getItemById, getItemsByShop, getUserRating, rating, searchItems } from "../controllers/item.controllers.js";
import upload from "../middlewares/multer.js";


const itemRouter = express.Router()

itemRouter.post("/add-item", isAuth , upload.single("image"), addItem)
itemRouter.post("/edit-item/:itemId", isAuth , upload.single("image"), editItem)
itemRouter.get("/get-by-id/:itemId", isAuth ,getItemById  )
itemRouter.get("/delete/:itemId", isAuth ,deleteItem  )

itemRouter.get("/get-by-city/:city", isAuth ,getItemByCity)
itemRouter.get("/get-by-shop/:shopId", isAuth ,getItemsByShop  )

// routes
itemRouter.get("/search-items", isAuth, searchItems)

itemRouter.post("/rating", isAuth, rating)
itemRouter.get("/user-rating/:itemId", isAuth, getUserRating)



export default itemRouter;