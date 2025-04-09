import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import searchIcon from '../assets/search_icon.png';
import crossIcon from '../assets/cross_icon.png';
import { useLocation } from 'react-router-dom';

const ShowSearch = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes('collection'));
  }, [location]);

  return showSearch && visible ? (
    <div className="bg-gray-100 border-b border-gray-300 py-4">
      <div className="flex items-center justify-center w-full px-4">
        <div className="flex items-center w-full sm:w-2/3 lg:w-1/2 bg-white border border-gray-300 rounded-full shadow-sm px-4 py-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none bg-transparent text-sm text-gray-700"
            type="text"
            placeholder="Search here..."
          />
          <img src={searchIcon} alt="Search" className="w-5 h-5 opacity-75 hover:opacity-100 transition" />
        </div>
        <button onClick={() => setShowSearch(false)} className="ml-3 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
          <img src={crossIcon} alt="Close" className="w-4 h-4" />
        </button>
      </div>
    </div>
  ) : null;
};

export default ShowSearch;


