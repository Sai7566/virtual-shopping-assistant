import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { FaRegWindowClose } from 'react-icons/fa';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import BuyTotal from '../Components/BuyTotal';
import { useTranslation } from 'react-i18next';

const Buy = () => {
  const { t } = useTranslation();
  const { products, currency, buyItems, navigate, updateQuantitybuy } = useContext(ShopContext);
  const [buyData, setBuyData] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      const initialQuantities = {};

      for (const itemId in buyItems) {
        for (const size in buyItems[itemId]) {
          if (buyItems[itemId][size] > 0) {
            tempData.push({
              _id: itemId,
              size: size,
              quantity: buyItems[itemId][size],
            });
            initialQuantities[`${itemId}-${size}`] = buyItems[itemId][size];
          }
        }
      }
      setBuyData(tempData);
      setQuantities(initialQuantities);
    }
  }, [buyItems, products]);

  const increment = (id, size) => {
    const key = `${id}-${size}`;
    const newValue = quantities[key] + 1;
    setQuantities((prev) => ({ ...prev, [key]: newValue }));
    updateQuantitybuy(id, size, newValue);
  };

  const decrement = (id, size) => {
    const key = `${id}-${size}`;
    if (quantities[key] > 1) {
      const newValue = quantities[key] - 1;
      setQuantities((prev) => ({ ...prev, [key]: newValue }));
      updateQuantitybuy(id, size, newValue);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Buy Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-gray-800">
          {t('buy')} <span className="text-secondary">{t('list')}</span>
        </h1>
      </div>

      {/* Buy Items */}
      <div className="mt-6 space-y-6">
        {buyData.length > 0 ? (
          buyData.map((item, i) => {
            const ProductData = products.find((product) => product._id === item._id);
            if (!ProductData) return null;
            const key = `${item._id}-${item.size}`;

            return (
              <div
                key={i}
                className="flex items-center gap-6 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
              >
                {/* Product Image */}
                <img
                  src={ProductData.image[0]}
                  alt="Product"
                  className="w-20 h-20 object-cover rounded-lg"
                />

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h5 className="text-lg font-semibold text-gray-800">
                    {t(ProductData.name)}
                    </h5>
                    <button className="text-red-500 hover:text-red-700 transition">
                      <FaRegWindowClose
                        onClick={() => updateQuantitybuy(item._id, item.size, 0)}
                        size={18}
                      />
                    </button>
                  </div>

                  <p className="text-sm text-gray-500">{t('size')}: {item.size}</p>

                  {/* Quantity and Price */}
                  <div className="flex justify-between items-center mt-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-lg">
                      <button
                        onClick={() => decrement(item._id, item.size)}
                        className="text-gray-500 hover:text-gray-700 transition"
                      >
                        <FaMinus />
                      </button>
                      <p className="font-medium text-gray-800">{quantities[key]}</p>
                      <button
                        onClick={() => increment(item._id, item.size)}
                        className="text-gray-500 hover:text-gray-700 transition"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    {/* Product Price */}
                    <h4 className="text-lg font-semibold text-gray-800">
                      {currency}{ProductData.price}
                    </h4>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">{t('buy_list_empty')}</p>
        )}
      </div>

      {/* Buy Total and Checkout */}
      <div className='flex my-20'>
        <div className='w-full sm:w-[450px]'>
          <BuyTotal />
          <button
            onClick={() => navigate('/place-order')}
            className='btn-secondary mt-7'
          >
            {t('checkout')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Buy;

