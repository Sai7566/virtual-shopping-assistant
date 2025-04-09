import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import banner from '../assets/banner.png';

const Banners = () => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-[1440px] px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-center bg-white">
        
        {/* Left Side (Text) */}
        <div className="text-center md:text-left flex-1 px-5 xl:px-12 mb-5 md:mb-0">
          <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-semibold">
            {t('banner.title')} {/* Multilingual Title */}
          </h2>
          <h3 className="text-lg md:text-xl uppercase mt-2">
            {t('banner.subtitle')} {/* Multilingual Subtitle */}
          </h3> 
          <div className="flex justify-center md:justify-start mt-5">
            <Link to={'/collection'} className="btn-secondary py-2 px-4 rounded-full flex items-center gap-x-2">
              {t('banner.button')} {/* Multilingual Button */}
              <FaArrowRight className="bg-white text-tertiary rounded-full h-8 w-8 p-2 transition-all duration-500" />
            </Link>
          </div>
        </div>

        {/* Right Side (Image) */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img 
            src={banner} 
            alt={t('banner.altText')}  // Alt text is also translated
            className="rounded-tl-3xl rounded-bl-3xl w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Banners;

