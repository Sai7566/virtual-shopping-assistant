import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

const ProductDescription = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className='ring-1 ring-slate-900/10 rounded-lg'>
      {/* Tab Buttons */}
      <div className='flex gap-3'>
        <button 
          className={`medium-14 py-3 w-32 ${activeTab === 'description' ? 'border-b-2 border-secondary' : ''}`} 
          onClick={() => setActiveTab('description')}
        >
          {t('Description')}
        </button>
        <button 
          className={`medium-14 py-3 w-32 ${activeTab === 'careGuide' ? 'border-b-2 border-secondary' : ''}`} 
          onClick={() => setActiveTab('careGuide')}
        >
          {t('Care Guide')}
        </button>
        <button 
          className={`medium-14 py-3 w-32 ${activeTab === 'sizeGuide' ? 'border-b-2 border-secondary' : ''}`} 
          onClick={() => setActiveTab('sizeGuide')}
        >
          {t('Size Guide')}
        </button>
      </div>
      <hr className='h-[1px] w-full' />

      {/* Tab Content */}
      <div className='flex flex-col gap-3 p-3'>
        {activeTab === 'description' && (
          <div>
            <h5 className='h5'>{t('Detail')}</h5>
            <p className='text-sm'>{t('fashion_description')}</p>
            <h5 className='h5'>{t('Benefits')}</h5>
            <ul className='list-disc pl-5 text-sm text-gray-30 flex flex-col gap-1'>
              <li>{t('benefit_1')}</li>
              <li>{t('benefit_2')}</li>
              <li>{t('benefit_3')}</li>
            </ul>
          </div>
        )}

        {activeTab === 'careGuide' && (
          <div>
            <h5 className='h5'>{t('Care Guide')}</h5>
            <p className='text-sm'>{t('care_guide_description')}</p>
            <ul className='list-disc pl-5 text-sm text-gray-30 flex flex-col gap-1'>
              <li>{t('care_1')}</li>
              <li>{t('care_2')}</li>
              <li>{t('care_3')}</li>
              <li>{t('care_4')}</li>
              <li>{t('care_5')}</li>
            </ul>
          </div>
        )}

        {activeTab === 'sizeGuide' && (
          <div>
            <h5 className='h5'>{t('Size Guide')}</h5>
            <p className='text-sm'>{t('size_guide_description')}</p>
            <ul className='list-disc pl-5 text-sm text-gray-30 flex flex-col gap-1'>
              <li>{t('size_1')}</li>
              <li>{t('size_2')}</li>
              <li>{t('size_3')}</li>
              <li>{t('size_4')}</li>
              <li>{t('size_5')}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;

