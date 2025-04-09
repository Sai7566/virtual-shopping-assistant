import orderModel from "../models/orderModel.js"

import userModel from "../models/useModel.js"

// controller function for placing order using cod method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // **Basic validation**
    if (!userId || !items || items.length === 0 || !amount || !address) {
        return res.status(400).json({ success: false, message: "Invalid order data" });
    }

    // **Calculate subtotal**
    let subTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    // **Calculate Delivery Fee**
    let deliveryCharge = subTotal <= 500 ? 10 : 0;

    // **Total Order Amount**
    const totalAmount = subTotal + deliveryCharge;

    // **Prepare Order Data**
    const orderData = new orderModel({
        userId,
        items,
        amount: totalAmount,
        address,
        paymentMethod: "COD",
        payment: false,
        deliveryCharge,
        date: Date.now(),
    });

    // **Save Order**
    await orderData.save();

    // **Clear user's cart and buy data**
    await userModel.findByIdAndUpdate(userId, { cartData: {}, buyData: {} });

    res.json({ success: true, message: "Order Placed Successfully", totalAmount, deliveryCharge });

} catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
}
  };
  
  



// controller function for getting all order data from admin pannel
const allOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:true,message:error.message})
        
    }
}

// controller function for getting user order for frontend
const userOrders = async (req,res)=>{
    try {
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message}) 
    }
}

// controller function for updating order status for admin panel
const updateStatus = async (req,res)=>{
    try {
        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message}) 
    }
}



export {placeOrder,allOrders,userOrders,updateStatus}


