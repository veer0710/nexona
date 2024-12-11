import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

function Carousel(props) {

  const [currentslide, setcurrentslide] = useState(0)
  const totalslides = 5

  const nextslide =()=>{
    setcurrentslide((prevslide)=> (prevslide + 1) % totalslides)
  }

  const prevslide =()=>{
    setcurrentslide((prevslide)=> (prevslide - 1 + totalslides) % totalslides)
  }

  return (
    <>
        <div className="container" id="carousel-body">
          {/* <button className="carousel-btn2"></button> */}
            <div className="wrapper">
            <button className="carousel-btn left-carousel-btn" onClick={prevslide}><ChevronLeft id="carousel-arrow"/></button>
                <div className="Carousel" style={{transform: `translateX(-${currentslide * 100}%)`}}>       
                    <div className="card"><img className='carousel-images' src={props.CarouselImg1} alt="Carousel1" /></div>
                    <div className="card"><img className='carousel-images' src={props.CarouselImg2} alt="Carousel2" /></div>
                    <div className="card"><img className='carousel-images' src={props.CarouselImg3} alt="Carousel3" /></div>
                    <div className="card"><img className='carousel-images' src={props.CarouselImg4} alt="Carousel4" /></div>
                    <div className="card"><img className='carousel-images' src={props.CarouselImg5} alt="Carousel5" /></div>
                </div>
                <button className="carousel-btn right-carousel-btn" onClick={nextslide}><ChevronRight id="carousel-arrow"/></button>
            </div>
        </div>
    </>
  )
}

export default Carousel