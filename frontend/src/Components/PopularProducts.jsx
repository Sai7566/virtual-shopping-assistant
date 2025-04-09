import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { ShopContext } from '../Context/ShopContext';
import Item from './Item';
import { useTranslation } from 'react-i18next';

const PopularProducts = () => {
  const { products } = useContext(ShopContext);
  const [popularProducts, setPopularProducts] = useState([]);
  const { t, i18n } = useTranslation(); // Initialize translation hook

  

  useEffect(() => {
    if (products?.length) {
      const filteredProducts = products.filter((item) => item.popular);
      setPopularProducts(filteredProducts.slice(0, 5));
    }
  }, [products]);

  return (
    <section className='max-padd-container py-16 bg-primary'>
      {/* Using translation for the titles */}
      <Title
        title1={t('Elite')}   
        title2={t('Collection')}  
        titleStyles={'pb-10'}
        paraStyles={'!block'}
      />

      {/* Responsive Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
        {popularProducts.map((product) => (
          <Item key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;



