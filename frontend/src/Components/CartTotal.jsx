import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useTranslation } from 'react-i18next';

const CartTotal = () => {
  const { t } = useTranslation();
  const { currency, getCartAmount } = useContext(ShopContext);
  const subTotal = getCartAmount();
  const deliveryCharge = subTotal > 500 ? 0 : subTotal > 0 ? 10 : 0;

  return (
    <section className='w-full'>
      <h1 className='bold-20'>{t("cart")}<span className='text-secondary'>{t("total")}</span></h1>

      <div className='flexBetween pt-3'>
        <h5 className='h5'>{t("subtotal")}:</h5>
        <p className='h5'>{currency}{subTotal}</p>
      </div>

      <hr className='mx-auto h-[1px] w-full bg-gray-900/10 my-1'/>

      <div className='flexBetween pt-3'>
        <h5 className='h5'>{t("shipping_fee")}:</h5>
        <p className='h5'>{currency}{deliveryCharge}.00</p>
      </div>

      <hr className='mx-auto h-[1px] w-full bg-gray-900/10 my-1'/>

      <div className='flexBetween pt-3'>
        <h5 className='h5'>{t("total")}:</h5>
        <p className='h5'>{currency}{subTotal + deliveryCharge}</p>
      </div>

      <hr className='mx-auto h-[1px] w-full bg-gray-900/10 my-1'/>
    </section>
  );
};

export default CartTotal;

