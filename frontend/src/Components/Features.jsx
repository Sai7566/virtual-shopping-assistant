import React from 'react';
import { useTranslation } from 'react-i18next';  // Import useTranslation hook
import img1 from "../assets/features/feature1.png";
import img2 from "../assets/features/feature2.png";

const Features = () => {
  const { t } = useTranslation();  // Access the translation function

  return (
    <section className='max-padd-container pt-14 pb-20'>
      <div className='grid grid-cols-1 xl:grid-cols-[1.5fr_2fr] gap-6 gap-y-12 rounded-xl'>
        <div className='flexCenter gap-x-10'>
          <div>
            <img src={img1} alt={t("features.feature1Alt")} height={77} width={222} className='rounded-full' />
          </div>
          <div>
            <img src={img2} alt={t("features.feature2Alt")} height={77} width={222} className='rounded-full' />
          </div>
        </div>
        
        <div className='flexCenter flex-wrap sm:flex-nowrap gap-x-5'>
          <div className='p-4 rounded-3xl'>
            <h4 className='h4 capitalize'>{t('features.qualityProductTitle')}</h4>
            <p>{t('features.qualityProductDesc')}</p>
          </div>
          
          <div className='p-4 rounded-3xl'>
            <h4 className='h4 capitalize'>{t('features.fastDeliveryTitle')}</h4>
            <p>{t('features.fastDeliveryDesc')}</p>
          </div>
          
          <div className='p-4 rounded-3xl'>
            <h4 className='h4 capitalize'>{t('features.securePaymentsTitle')}</h4>
            <p>{t('features.securePaymentsDesc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
