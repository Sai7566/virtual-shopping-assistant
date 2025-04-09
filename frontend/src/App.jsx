import React from 'react'
import Header from './Components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Collection from "./Pages/Collection"; // ✅ Correct way if there's a default export

import Product from './Pages/Product'

import ShowSearch from './Components/ShowSearch';
import Cart from './Pages/Cart';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlaceOrder from './Pages/PlaceOrder';
import Login from './Pages/Login';
import Orders from './Pages/Orders';
import ProductSatisfaction from './Pages/ProductSatisfaction';
import About from './Pages/About';
import Buy from './Pages/buy';

import Chatbot from './Components/Chatbot';


const App = () => {
  return (
    <main className='overflow-hidden text-[#404040]'>
      <ToastContainer/>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header/>
      <ShowSearch/>
      <Chatbot/>
      <Routes>
      
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/product-satisfaction' element={<ProductSatisfaction/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/buy' element={<Buy/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
       

        <Route path='/orders' element={<Orders/>}/>
       
      </Routes>
    </main>
  )
}

export default App