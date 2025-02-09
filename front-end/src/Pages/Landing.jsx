import React from 'react'
import Navbar from '../components/Navbar'
import HeroSlider from '../components/HeroSlider'
import EventCards from '../components/EventCards'
import Footer from '../components/Footer'

const Landing = () => {
  return (
    <div>
        <Navbar/>
        <HeroSlider/>
        <EventCards/>
        <Footer/>
    </div>
  )
}

export default Landing