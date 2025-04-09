import userModel from "../models/useModel.js";
import productModel from "../models/productModel.js";

// controller function for add products to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] +=1

      }else{
        cartData[itemId][size] = 1
      }

      }else{
        cartData[itemId] = {}
        cartData[itemId][size] = 1
      }
      await userModel.findByIdAndUpdate(userId,{cartData})
      res.json({success:true,message:"Added to Cart"})
    }catch(error){
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  }

// controller function for update   cart
const updateCart = async (req, res) => {
  try {
    const {userId,itemId,size,quantity} = req.body

    const userData = await userModel.findById(userId)
    const cartData = await userData.cartData

    cartData[itemId][size] = quantity

    await userModel.findByIdAndUpdate(userId,{cartData})
    res.json({success:true,message:"Cart Updated"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    const cartData = userData?.cartData || {}; // Handle empty cart safely

    // Get all unique product IDs from cartData
    const productIds = Object.keys(cartData);

    if (productIds.length === 0) {
      return res.json({ success: true, cartData, subTotal: 0, deliveryCharge: 0, total: 0 });
    }

    // Fetch all products in one query
    const products = await productModel.find({ _id: { $in: productIds } });

    // Create a product map for quick lookup
    const productMap = {};
    products.forEach(product => {
      productMap[product._id.toString()] = product.price; // Convert _id to string for safety
    });

    // Calculate Subtotal (Ensure Number Type)
    let subTotal = 0;
    for (const itemId in cartData) {
      for (const size in cartData[itemId]) {
        const price = Number(productMap[itemId]) || 0; // Convert to Number
        const quantity = Number(cartData[itemId][size]) || 0; // Convert to Number
        subTotal += price * quantity;
      }
    }

    // **Fix: Ensure subtotal is a number**
    subTotal = Number(subTotal.toFixed(2)); // Round to 2 decimal places (for accuracy)

    // **✅ FIXED: Apply ₹10 Delivery Charge ABOVE ₹500**
    const deliveryCharge = subTotal > 500 ? 10 : 0;
    const totalAmount = subTotal + deliveryCharge;

    res.json({ success: true, cartData, subTotal, deliveryCharge, total: totalAmount });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export { addToCart, updateCart, getUserCart };
