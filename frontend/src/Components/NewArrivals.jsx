import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';

import { useTranslation } from "react-i18next";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Item from './Item';
import { ShopContext } from '../Context/ShopContext';

const NewArrivals = () => {
  const {products} = useContext(ShopContext)
  const [newArrivals, setNewArrivals] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const data = products.slice(0, 10);
    setNewArrivals(data);
  }, [products]);

  return (
    <section className='max-padd-container pt-16 pb-16 bg-primary'>
      <Title title1={t('new')} title2={t('arrivals')} titleStyles={'pb-10'} paraStyles={'!block'} />
      {/* swiper container */}
      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          400: {
            slidesPerView: 1, // 1 slide per view on smaller screens
            spaceBetween: 30,
          },
          700: {
            slidesPerView: 2, // 2 slides per view on medium screens
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3, // 3 slides per view on larger screens
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 3, // 3 slides per view for extra large screens
            spaceBetween: 30,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]} 
        className="h-[555px] sm:h-[500px] md:h-[588px]"
      >
        {newArrivals.map((product) => (
          <SwiperSlide key={product._id}>
            <Item product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewArrivals;
