import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectcloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import buyRouter from "./routes/buyRouter.js"
import chatbotRoutes from "./routes/chatbotRoutes.js"


// app config

const app = express()
const port = process.env.Port || 4000

connectDB()
connectcloudinary()

//middleware

app.use(express.json())
app.use(cors())


// app end points

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/buy',buyRouter)
app.use('/api/order',orderRouter)
app.use('/api/chatbot',chatbotRoutes);
app.get('/',(req,res)=>{
    res.send("Api Working")
})
app.listen(port, console.log('Server is running on PORT :'+ port))

