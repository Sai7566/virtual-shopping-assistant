import React, { useState, useEffect, useContext } from 'react';
import { TfiPackage } from 'react-icons/tfi';
import { FaCreditCard, FaSyncAlt } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../Context/ShopContext';
import { useTranslation } from 'react-i18next';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const loadOrderData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allOrdersItem = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });

        setOrders(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadOrderData();
  }, [token]);

  return (
    <div className='px-4 py-8 md:px-12 bg-gray-100 min-h-screen'>
      <h1 className='text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3'>
        <TfiPackage className='text-indigo-600 text-2xl' />
        {t('ordersLabel') || 'Your Orders'}
      </h1>

      {loading ? (
        <div className="text-center text-lg text-gray-500">{t('loading') || 'Loading...'}</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-400 text-base italic">
          {t('noOrdersFound') || 'No orders found.'}
        </div>
      ) : (
        <div className='grid gap-6'>
          {orders.map((item, index) => (
            <div
              key={index}
              className='bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300'
            >
              <div className='flex flex-col sm:flex-row gap-6'>
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className='w-28 h-28 object-cover rounded-xl border'
                />
                <div className='flex-1 space-y-2'>
                  <h2 className='text-xl font-semibold text-gray-800'>{item.name}</h2>
                  <div className='text-sm text-gray-600 space-y-1'>
                    <p>{t('price') || 'Price'}: <span className='font-medium'>{currency}{item.price}</span></p>
                    <p>{t('quantity') || 'Quantity'}: {item.quantity}</p>
                    <p>{t('size') || 'Size'}: {item.size}</p>
                  </div>
                  <div className='flex items-center gap-2 text-gray-500 text-sm pt-1'>
                    <MdDateRange className='text-base' />
                    <span>{new Date(item.date).toDateString()}</span>
                  </div>
                  <div className='flex items-center gap-2 text-gray-500 text-sm'>
                    <FaCreditCard className='text-base' />
                    <span>{item.payment} <span className='text-xs text-gray-400'>({item.paymentMethod})</span></span>
                  </div>
                </div>
              </div>

              <div className='flex flex-col md:flex-row justify-between items-start md:items-center mt-6 gap-4'>
                <div className='flex items-center gap-2'>
                  <span className='w-3 h-3 rounded-full bg-green-500 animate-pulse'></span>
                  <span className='text-sm md:text-base font-medium text-gray-700'>{item.status}</span>
                </div>
                <button
                  onClick={loadOrderData}
                  className='flex items-center gap-2 border border-indigo-600 text-indigo-600 px-4 py-2 text-sm font-semibold rounded-md hover:bg-indigo-100 transition-all'
                >
                  <FaSyncAlt />
                  {t('trackOrder') || 'Track Order'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
