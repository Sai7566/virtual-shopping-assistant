import React from 'react';
import { useTranslation } from "react-i18next";
import { RiSecurePaymentLine } from 'react-icons/ri';
import { TbArrowBackUp, TbTruckDelivery } from 'react-icons/tb';

const ProductFeatures = () => {
  const { t } = useTranslation();

  return (
    <section className='bg-primary rounded-xl mt-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 rounded-xl'>
        <div className='flexCenter gap-x-4 p-2'>
          <div className='text-3xl'>
            <TbArrowBackUp className='mb-3 text-yellow-500' />
          </div>
          <div>
            <h4 className='h4 capitalize'>{t('Easy Return')}</h4>
            <p>{t('easy_return_description')}</p>
          </div>
        </div>
        
        <div className='flexCenter gap-x-4 p-2'>
          <div className='text-3xl'>
            <TbTruckDelivery className='mb-3 text-red-500' />
          </div>
          <div>
            <h4 className='h4 capitalize'>{t('Fast Delivery')}</h4>
            <p>{t('fast_delivery_description')}</p>
          </div>
        </div>
        
        <div className='flexCenter gap-x-4 p-2'>
          <div className='text-3xl'>
            <RiSecurePaymentLine className='mb-3 text-secondary' />
          </div>
          <div>
            <h4 className='h4 capitalize'>{t('Secure Payments')}</h4>
            <p>{t('secure_payments_description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;