import React from 'react'
import Hero from '../Components/Hero'
import Features from '../Components/Features'
import NewArrivals from '../Components/NewArrivals'
import Banners from '../Components/Banners'
import PopularProducts from '../Components/PopularProducts'
import Blog from '../Components/Blog'
import Footer from '../Components/Footer'
import Chatbot from '../Components/Chatbot'

const Home = () => {
  return (
    
    <>
    <Hero/>
    <Chatbot/>
    <Features/>
    <NewArrivals/>
    <Banners/>
    <PopularProducts/>
    <Blog/>
    <Footer/>
    </>
  )
}

export default Home