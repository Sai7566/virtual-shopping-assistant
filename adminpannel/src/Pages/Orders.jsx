import React, { useState, useEffect } from "react";
import { TfiPackage } from "react-icons/tfi";
import {
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShippingFast
} from "react-icons/fa";
import { backend_url } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = ({ token, currency = "₹" }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(`${backend_url}/api/order/list`, {}, {
        headers: { token },
      });

      if (response.data?.orders && Array.isArray(response.data.orders)) {
        setOrders(response.data.orders.slice().reverse());
      } else {
        toast.error(response.data?.message || "Unexpected response format");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        `${backend_url}/api/order/status`,
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <TfiPackage className="text-indigo-600 text-xl sm:text-2xl" />
        Your Orders
      </h2>

      <div className="flex flex-col gap-6">
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders available.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-xl p-4 sm:p-6 border border-gray-200 flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              {/* Order Icon */}
              <div className="self-center sm:self-start p-3 bg-blue-100 text-blue-600 rounded-full">
                <TfiPackage className="text-2xl sm:text-3xl" />
              </div>

              {/* Order Details */}
              <div className="flex-1 space-y-2">
                <p className="text-gray-800 text-base sm:text-lg font-semibold">
                  Order ID: <span className="text-gray-900">{order._id}</span>
                </p>
                <p className="text-gray-700 text-sm sm:text-base flex items-center">
                  <FaMoneyBillWave className="mr-2 text-green-500" />
                  Total: <span className="font-semibold ml-1">{currency}{order.amount}</span>
                </p>
                <div className="flex items-center text-sm sm:text-base text-gray-700 font-semibold gap-2">
                  <FaShippingFast className="text-blue-500" />
                  Order Status:
                  <select
                    onChange={(e) => statusHandler(e, order._id)}
                    value={order.status}
                    className="ml-2 px-2 py-1 rounded-full text-sm border border-gray-300"
                  >
                    <option value="Packing" className="bg-yellow-100 text-yellow-700">Packing</option>
                    <option value="Shipped" className="bg-blue-100 text-blue-700">Shipped</option>
                    <option value="Out for Delivery" className="bg-purple-100 text-purple-700">Out for Delivery</option>
                    <option value="Delivered" className="bg-green-100 text-green-700">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              {order.address && (
                <div className="text-gray-700 text-sm sm:text-base">
                  <p className="font-semibold flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                    Delivery Address:
                  </p>
                  <p>{order.address.firstName} {order.address.lastName}</p>
                  <p>{order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipcode}</p>
                  <p>{order.address.country}</p>
                  <p className="font-semibold flex items-center mt-1">
                    <FaPhoneAlt className="mr-2 text-blue-500" />
                    {order.address.phone}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
