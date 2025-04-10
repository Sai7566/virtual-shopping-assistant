import express from "express"
import { addProduct, listProduct, removeProduct, singleProduct } from "../controllers/productController.js"
import upload from "../middleware/multer.js"
import addAuth from "../middleware/adminAuth.js"

const productRouter = express.Router()
productRouter.post('/add',addAuth,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addProduct) 
productRouter.post('/remove',addAuth,removeProduct) 
productRouter.post('/single',singleProduct) 
productRouter.get('/list',listProduct)

export default productRouter









