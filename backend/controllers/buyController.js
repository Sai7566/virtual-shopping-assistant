import userModel from "../models/useModel.js";
import productModel from "../models/productModel.js";

// ✅ Add to Buy List
const addToBuy = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // ✅ Fix: Ensure buyData exists
    const buyData = userData.buyData || {}; 

    if (!buyData[itemId]) {
      buyData[itemId] = {};
    }
    buyData[itemId][size] = (buyData[itemId][size] || 0) + 1;

    // ✅ Fix: Update the database properly
    await userModel.findByIdAndUpdate(userId, { $set: { buyData } });

    res.json({ success: true, message: "Added to Buy List" });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Update Buy List
const updateBuy = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // ✅ Fix: Ensure buyData exists
    const buyData = userData.buyData || {}; 

    if (!buyData[itemId]) {
      buyData[itemId] = {};
    }
    buyData[itemId][size] = quantity;

    // ✅ Fix: Update the database properly
    await userModel.findByIdAndUpdate(userId, { $set: { buyData } });

    res.json({ success: true, message: "Buy List Updated" });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get User Buy List
const getUserBuy = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // ✅ Fix: Handle empty buy list
    const buyData = userData.buyData || {}; 

    const productIds = Object.keys(buyData);
    if (productIds.length === 0) {
      return res.json({ success: true, buyData, subTotal: 0, deliveryCharge: 0, total: 0 });
    }

    // Fetch all products in one query
    const products = await productModel.find({ _id: { $in: productIds } });

    // Map product prices
    const productMap = {};
    products.forEach(product => {
      productMap[product._id.toString()] = product.price; 
    });

    // Calculate Subtotal
    let subTotal = 0;
    for (const itemId in buyData) {
      for (const size in buyData[itemId]) {
        const price = Number(productMap[itemId]) || 0; 
        const quantity = Number(buyData[itemId][size]) || 0; 
        subTotal += price * quantity;
      }
    }

    subTotal = Number(subTotal.toFixed(2)); // Round to 2 decimal places

    // ✅ Fix: Apply ₹10 Delivery Charge ABOVE ₹500
    const deliveryCharge = subTotal > 500 ? 10 : 0;
    const totalAmount = subTotal + deliveryCharge;

    res.json({ success: true, buyData, subTotal, deliveryCharge, total: totalAmount });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToBuy, updateBuy, getUserBuy };

