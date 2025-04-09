import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { ShopContext } from '../Context/ShopContext';
import Title from './Title';
import Item from './Item';

const RelatedProducts = ({ category, subCategory }) => {
  const { t } = useTranslation();
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product

  useEffect(() => {
    if (products.length > 0) {
      let filtered = products.filter((item) => item.category === category);

      if (subCategory) {
        filtered = filtered.filter((item) => item.subCategory === subCategory);
      }

      setRelated(filtered.slice(0, 5)); // Limit to 5 related products
    }
  }, [products, category, subCategory]);

  const handleProductClick = (productId) => {
    setSelectedProduct(productId);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top smoothly
  };

  return (
    <section>
      <Title title1={t("Related")} title2={t("Products")} title1Styles="pb-4" />
      <div className="flex gap-6 overflow-x-auto no-scrollbar">
        {related.length > 0 ? (
          related.map((product) => (
            <div
              key={product._id}
              className={`w-64 flex-shrink-0 p-2 rounded-lg transition-all duration-300 cursor-pointer
                ${selectedProduct === product._id ? "border-4 border-blue-500 shadow-lg scale-105" : "border border-gray-300"}
                hover:scale-105 hover:shadow-md hover:border-blue-300`
              }
              onClick={() => handleProductClick(product._id)}
            >
              <Item product={product} />
            </div>
          ))
        ) : (
          <p>{t("No related products found")}</p>
        )}
      </div>
    </section>
  );
};

export default RelatedProducts;
























