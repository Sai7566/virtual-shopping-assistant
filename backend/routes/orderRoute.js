import express from "express"
import { allOrders,placeOrder, updateStatus, userOrders} from "../controllers/orderController.js"
import addAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"


const orderRouter = express.Router()
// for admin
orderRouter.post('/list',addAuth,allOrders)

orderRouter.post('/status',addAuth,updateStatus)


//for payment
orderRouter.post('/place',authUser,placeOrder)





// for user
orderRouter.post('/userorders',authUser,userOrders)



export default orderRouter

