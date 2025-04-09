import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { products as initialProducts } from "../assets/data";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_charges = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [buyItems, setBuyItems] = useState({});
 
 // Load favorites from localStorage during initial state
const [favorites, setFavorites] = useState(() => {
  const storedFavorites = localStorage.getItem("favorites");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
});

// Save favorites to localStorage whenever the state updates
useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);

// Add a product to favorites (only if it's not already added)
const addToFavorites = (product) => {
  setFavorites((prev) => {
    if (!prev.some((fav) => fav._id === product._id)) {
      return [...prev, product];
    }
    return prev;
  });
};

// Remove a product from favorites
const removeFromFavorites = (productId) => {
  setFavorites((prev) => prev.filter((item) => item._id !== productId));
};

  // Sync cart data with localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Fetch products from backend
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products);  // Set products from the API
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
      getUserBuy(localStorage.getItem("token"));
    }
    getProductsData();
  }, []);

 

  // ✅ Add item to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select size to Add Cart");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  //get cart count
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  // update the quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
   
  // getting total cart amount
  const getCartAmount = () => {
    if (!products.length) return 0;

    // Convert products array into a lookup object
    const productMap = Object.fromEntries(products.map(p => [String(p._id), p]));

    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = productMap[itemId];

      if (!itemInfo) {
        console.warn(`⚠️ Product not found for ID: ${itemId}`);
        continue; // Skip missing products
      }

      for (const size in cartItems[itemId]) {
        if (typeof cartItems[itemId][size] === "number") {
          totalAmount += (itemInfo.price || 0) * cartItems[itemId][size];
        }
      }
    }
    return totalAmount;
  };

  // get user cart
  const getUserCart = async (token)=>{
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers:{token}})
      if (response.data.success) {
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  // ✅ Add item to buy
const addToBuy = async (itemId, size) => {
  if (!size) {
    toast.error("Please select size to Add Cart");
    return;
  }
  let buyData = structuredClone(buyItems);
  if (buyData[itemId]) {
    if (buyData[itemId][size]) {
      buyData[itemId][size] += 1;
    } else {
      buyData[itemId][size] = 1;
    }
  } else {
    buyData[itemId] = {};
    buyData[itemId][size] = 1;
  }
  setBuyItems(buyData);
  if(token){
    try {
      await axios.post(backendUrl + '/api/buy/add', {itemId,size},{headers:{token}})
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

}
// update the quantitybuy
const updateQuantitybuy = async (itemId, size, quantity) => {
  let buyData = structuredClone(buyItems);
  buyData[itemId][size] = quantity;
  setBuyItems(buyData);

  if (token) {
    try {
      await axios.post(backendUrl + '/api/buy/update',{itemId,size,quantity},{headers:{token}})
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

}
// get user cart
const getUserBuy = async (token)=>{
  try {
    const response = await axios.post(backendUrl + '/api/buy/get', {}, {headers:{token}})
    if (response.data.success) {
      setBuyItems(response.data.buyData)
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
}

// getting total buy amount
  const getBuyAmount = () =>{
    let totalAmount = 0
    for(const items in buyItems){
      let itemInfo = products.find((product)=>product._id === items)
      for(const item in buyItems[items]){
        try {
          if (buyItems[items][item] > 0) {
           totalAmount += itemInfo.price * buyItems[items][item] 
          }
        } catch (error) {
          console.log(error);
          
        }
      }
    }
    return totalAmount
  }

  
  // ✅ Context values
  const contextValues = {
    currency,
    delivery_charges,
    navigate,
    products,
    setProducts,
    token,
    setToken,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    buyItems,
    setBuyItems,
    addToCart,
    addToBuy,
    getCartCount,
    updateQuantity,
    updateQuantitybuy,
    getCartAmount,
    getBuyAmount,
    favorites, setFavorites,addToFavorites, removeFromFavorites,
    backendUrl,
  };

  return (
    <ShopContext.Provider value={contextValues}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

