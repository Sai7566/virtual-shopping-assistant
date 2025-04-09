import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item';
import Footer from '../Components/Footer';
import { FaFilter, FaTimes } from 'react-icons/fa';

const Collection = () => {
  const { t } = useTranslation();
  const { products, search, showSearch } = useContext(ShopContext);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 10;
  

 

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSortType('relevant');
  };
  const filterAndSortProducts = () => {
    let filtered = [...products];
  
    // Search Filtering
    if (search.trim() && showSearch) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  
    // Category Filtering
    if (category.length > 0) {
      filtered = filtered.filter((product) => category.includes(product.category));
    }
  
    // Subcategory Filtering
    if (subCategory.length > 0) {
      filtered = filtered.filter((product) => subCategory.includes(product.subCategory));
    }
  
    // Sorting Logic
    if (sortType === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }
  
    return filtered;
  };
  
  // Update the filtered products when dependencies change
  useEffect(() => {
    const result = filterAndSortProducts();
    setFilteredProducts(result);
    setCurrentPage(1);
  }, [category, subCategory, sortType, products, search, showSearch]);
  

  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const toggleFilter = (value, setFilter) => {
    setFilter((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value); // Remove item if already selected
      } else {
        return [...prev, value]; // Add item if not selected
      }
    });
  };
  

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <button
        onClick={() => setShowFilters(true)}
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md mb-4 md:hidden"
      >
        <FaFilter />
        {t('Filter')}
      </button>

      <div className="flex flex-col md:flex-row gap-8 mb-16">
        <div
          className={`fixed inset-0 bg-white shadow-lg transition-transform transform ${
            showFilters ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:relative md:min-w-72 p-5`}
          style={{ zIndex: 50 }}
        >
          <div className="flex justify-between items-center md:hidden">
            <h5 className="text-lg font-semibold">{t('Filters')}</h5>
            <button onClick={() => setShowFilters(false)} className="text-red-500">
              <FaTimes size={20} />
            </button>
          </div>

          <div className="mt-4">
            <div className="px-3 py-2 bg-white rounded-lg shadow-sm">
              <h5 className="text-md font-semibold mb-3">{t('Categories')}</h5>
              <div className="flex flex-col gap-1 text-sm font-light">
                {['Men', 'Women', 'Kids'].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 text-gray-700 cursor-pointer">
                    <input
                      onChange={(e) => toggleFilter(e.target.value, setCategory)}
                      type="checkbox"
                      checked={category.includes(cat)}
                      value={cat}
                      className="w-4 h-4 accent-blue-500"
                    />
                    {t(cat)}
                  </label>
                ))}
              </div>
            </div>

            <div className="px-3 py-2 mt-4 bg-white rounded-lg shadow-sm">
              <h5 className="text-md font-semibold mb-3">{t('Types')}</h5>
              <div className="flex flex-col gap-1 text-sm font-light">
                {['Topwear', 'Bottomwear', 'Winterwear'].map((subCat) => (
                  <label key={subCat} className="flex items-center gap-2 text-gray-700 cursor-pointer">
                    <input
                      onChange={(e) => toggleFilter(e.target.value, setSubCategory)}
                      type="checkbox"
                      checked={subCategory.includes(subCat)}
                      value={subCat}
                      className="w-4 h-4 accent-blue-500"
                    />
                    {t(subCat)}
                  </label>
                ))}
              </div>
            </div>

            <div className="px-3 py-2 mt-4 bg-white rounded-lg shadow-sm">
              <h5 className="text-md font-semibold mb-3">{t('Sort By')}</h5>
              <select
                onChange={(e) => setSortType(e.target.value)}
                value={sortType}
                className="border border-gray-300 text-gray-700 rounded-md px-2 py-1 w-full outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="relevant">{t('Sort by: Relevant')}</option>
                <option value="low-high">{t('Sort by: Low-High')}</option>
                <option value="high-low">{t('Sort by: High-Low')}</option>
              </select>
            </div>

            <button
              onClick={clearFilters}
              className="w-full mt-4 bg-red-500 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-red-600"
            >
              {t('Clear Filters')}
            </button>
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {getPaginatedProducts().length > 0 ? (
              getPaginatedProducts().map((product, index) => (
                <Item key={product.id || `product-${index}`} product={product} />
              ))
            ) : (
              <p className="text-center text-gray-500">{t('No products found.')}</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              {t('Previous')}
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={`page-${index + 1}`}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-2 py-1 mx-1 text-xs rounded-md ${
                  currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              {t('Next')}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Collection;


