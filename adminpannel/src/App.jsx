
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Components/Sidebar';
import { Route, Routes } from "react-router-dom";
import Add from './Pages/Add';
import List from './Pages/List';
import Orders from './Pages/Orders';
import Login from './Components/Login';
import { useTranslation } from 'react-i18next';  // Import useTranslation

export const backend_url = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹";

const App = () => {
  const { t } = useTranslation();  // Initialize the translation function

  // Initialize token directly from localStorage
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Store token in localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  return (
    <main>
      <ToastContainer />
    
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div className='bg-primary text-[#404040]'>
          <div className='mx-auto max-w-[1440px] flex flex-col sm:flex-row'>
            <Sidebar setToken={setToken} />
            <Routes>
              <Route path='/' element={<Add token={token} />} />
              <Route path='/list' element={<List token={token} />} />
              <Route path='/orders' element={<Orders token={token} />} />
            </Routes>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
