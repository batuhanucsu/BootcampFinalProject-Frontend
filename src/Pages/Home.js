import Navbar from '../components/Navbar';
import AlphabeticalLinks from '../components/AlphabeticalLinks';
import Carousel from '../components/Carousel';
import NewSeries from '../components/NewSeries';
import Footer from '../components/Footer';
import BestSeries from '../components/BestSeries';
import React from 'react'


function Home() {
  return (
    <div className="container">
            <Navbar/>
            <AlphabeticalLinks />
            <Carousel/>
            <NewSeries/>
            <BestSeries/>
            <Footer/>
      </div>
  )
}
export default Home;
