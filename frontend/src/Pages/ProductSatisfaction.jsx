import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck, FaStar } from 'react-icons/fa6';
import user1 from '../assets/testimonials/user1.png';
import user2 from '../assets/testimonials/user2.png';
import product1 from '../assets/product_1.png';
import product2 from '../assets/product_2_1.png';
import Footer from '../Components/Footer';

const ProductSatisfaction = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex flex-grow justify-center items-center py-12 px-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Header Section */}
          <div className="text-center mb-6 md:mb-8">
            <h5 className="text-2xl md:text-3xl font-bold text-gray-900">
              {t('productSatisfaction.whatPeople')} <span className="text-secondary">{t('productSatisfaction.say')}</span>
            </h5>
            <div className="flex justify-center items-center gap-2 mt-2 md:mt-3">
              <div className="flex text-secondary">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={16} className="md:size-18" />
                ))}
              </div>
              <p className="text-gray-700 text-xs md:text-sm">
                {t('productSatisfaction.moreThan')} <b>+25,000 {t('productSatisfaction.reviews')}</b>
              </p>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="space-y-5 md:space-y-6">
            {[
              {
                user: user1,
                name: 'Manikanta',
                title: t('productSatisfaction.highQuality'),
                review: t('productSatisfaction.review1'),
                products: [product1, product2],
              },
              {
                user: user2,
                name: 'Ananya',
                title: t('productSatisfaction.amazingFit'),
                review: t('productSatisfaction.review2'),
                products: [product1, product2],
              },
            ].map((review, index) => (
              <div key={index} className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md">
                {/* User Info & Verified Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.user}
                      alt="User"
                      className="w-10 h-10 md:w-14 md:h-14 rounded-full border"
                    />
                    <h5 className="text-sm md:text-lg font-semibold text-gray-800">
                      {review.name}
                    </h5>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-xs md:text-sm font-medium">
                    <FaCheck size={14} /> {t('productSatisfaction.verifiedBuyer')}
                  </div>
                </div>
                <hr className="border-gray-300 my-3 md:my-4" />

                {/* Stars */}
                <div className="flex text-secondary mb-2 md:mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={14} />
                  ))}
                </div>

                {/* Review Title & Text */}
                <h4 className="text-base md:text-lg font-bold text-gray-900">{review.title}</h4>
                <p className="text-sm md:text-base text-gray-700 mt-1 md:mt-2">{review.review}</p>

                {/* Product Images */}
                <div className="flex flex-wrap gap-2 md:gap-3 mt-3 md:mt-4">
                  {review.products.map((product, i) => (
                    <img
                      key={i}
                      src={product}
                      alt="Product"
                      className="w-16 h-16 md:w-20 md:h-20 rounded-lg shadow-md border"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductSatisfaction;



