import React, { useContext, useState } from 'react';
import CartTotal from '../Components/CartTotal';
import BuyTotal from '../Components/BuyTotal';
import Footer from '../Components/Footer';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const { navigate, token, cartItems, setCartItems, getCartAmount, buyItems, setBuyItems, getBuyAmount, delivery_charges, products, backendUrl } = useContext(ShopContext);
  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", street: "", city: "", state: "", pincode: "", country: "", phone: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      const processItems = (items) => {
        let processedItems = [];
        for (const itemId in items) {
          for (const size in items[itemId]) {
            if (items[itemId][size] > 0) {
              const itemInfo = structuredClone(products.find(product => product._id === itemId));
              if (itemInfo) {
                itemInfo.size = size;
                itemInfo.quantity = items[itemId][size];
                processedItems.push(itemInfo);
              }
            }
          }
        }
        return processedItems;
      };

      const buyOrderItems = processItems(buyItems);
      const cartOrderItems = processItems(cartItems);

      orderItems = [...buyOrderItems, ...cartOrderItems];

      let cartAmount = getCartAmount();
      let buyAmount = getBuyAmount();
      let deliveryCharge = delivery_charges || 0;

      let totalAmount = Object.keys(buyItems).length > 0 ? buyAmount : cartAmount + deliveryCharge;

      if (isNaN(totalAmount) || totalAmount <= 0) {
        toast.error("Invalid total amount. Please try again.");
        return;
      }

      let orderData = { address: formData, items: orderItems, amount: totalAmount };

      const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
      if (response.data.success) {
        setBuyItems({});
        setCartItems({});
        navigate('/orders');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Order Error:", error);
    }
  };

  return (
    <div>
      <div className='bg-primary mb-16'>
        <form className='max-padd-container py-10' onSubmit={onSubmitHandler}>
          <div className='flex flex-col gap-10 md:gap-20 xl:flex-row xl:gap-28'>
            {/* Left Side - Delivery Information */}
            <div className='flex flex-1 flex-col gap-3 text-[95%]'>
              <h1 className='bold-20'>Delivery<span className='text-secondary'> Information</span></h1>
              <input onChange={onChangeHandler} value={formData.firstName} type='text' name='firstName' placeholder='First Name' required />
              <input onChange={onChangeHandler} value={formData.lastName} type='text' name='lastName' placeholder='Last Name' required />
              <input onChange={onChangeHandler} value={formData.email} type='email' name='email' placeholder='Email' required />
              <input onChange={onChangeHandler} value={formData.phone} type='number' name='phone' placeholder='Phone Number' required />
              <input onChange={onChangeHandler} value={formData.street} type='text' name='street' placeholder='Street' required />
              <input onChange={onChangeHandler} value={formData.city} type='text' name='city' placeholder='City' required />
              <input onChange={onChangeHandler} value={formData.state} type='text' name='state' placeholder='State' required />
              <input onChange={onChangeHandler} value={formData.pincode} type='number' name='pincode' placeholder='Pin Code' required />
              <input onChange={onChangeHandler} value={formData.country} type='text' name='country' placeholder='Country' required />
            </div>
            {/* Right Side - Order Summary & Payment */}
            <div className='flex flex-1 flex-col'>
              <CartTotal />
              <BuyTotal />
              <div className='my-6'>
                <h3 className='bold-20'>Payment <span className='text-secondary'>Method</span></h3>
                <div className='flex flex-col sm:flex-row gap-3'>
                  <div className='py-1 text-xs btn-dark'>Cash On Delivery</div>
                </div>
                <div className='mt-4'>
                  <button type='submit' className='btn-secondary py-2 px-4 rounded-md w-full sm:w-auto'>Place Order</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default PlaceOrder;















