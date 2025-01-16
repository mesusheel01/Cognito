import React from 'react'
import Navbar from './HomePage/Navbar'
import Hero from './HomePage/Hero'
import Footer from './Footer'

const Home = () => {
  return (
    <div className='bg-backCol h-screen w-screen'>
        <Navbar />
        <Hero />
        <Footer />
    </div>
  )
}

export default Home
