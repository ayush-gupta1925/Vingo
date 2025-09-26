import express from "express"

import isAuth from "../middlewares/isAuth.js";
import { acceptOrder,getAvailableDeliveryBoys, getCurrentOrder, getDeliveryBoyAssignment, getMyOrders, getOrderById, getTodayDelivaries, placeOrder, sendDeliveryOtp, updateOrderStatus, verifyDeliveryOtp, verifyPayment } from "../controllers/order.controllers.js";

const orderRouter = express.Router()

orderRouter.post("/place-order", isAuth , placeOrder)

orderRouter.get("/my-orders", isAuth ,getMyOrders)

orderRouter.get("/get-assigments", isAuth ,getDeliveryBoyAssignment)

orderRouter.post("/update-status/:orderId/:shopId", isAuth ,updateOrderStatus)

orderRouter.get("/accept-order/:assignmentId", isAuth ,acceptOrder)

orderRouter.get("/get-current-order", isAuth ,getCurrentOrder)

orderRouter.get("/get-order-by-id/:orderId", isAuth ,getOrderById)



orderRouter.post("/send-delivery-otp", isAuth ,sendDeliveryOtp)
orderRouter.post("/verify-delivery-otp", isAuth ,verifyDeliveryOtp)

orderRouter.post("/verify-payment", isAuth ,verifyPayment)


// backend route
orderRouter.get("/available-boys/:orderId/:shopId", isAuth, getAvailableDeliveryBoys);

orderRouter.get("/get-today-deliveries", isAuth , getTodayDelivaries);


export default orderRouter;