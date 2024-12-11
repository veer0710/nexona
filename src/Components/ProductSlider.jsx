import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

function ProductSlider(props) {

    var settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 6,
        slidesToScroll: 4,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1030,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 430,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              initialSlide: 0,
              infinite: true,
            }
          },
          // {
          //   breakpoint: 480,
          //   settings: {
          //     slidesToShow: 1,
          //     slidesToScroll: 1
          //   }
          // }
        ]
      };

    return (
        <>
            <div className="carousel Product-slider">

                <div className='Product-slider-Heading-Div'>
                    <p className='Product-slider-heading'>{props.SliderHeading}</p>
                    <p>{props.SeeMore}</p>
                </div>

                <div className='Product-slider-cards'>
                    <Slider {...settings}>
                        
                    <div className='Product-slider-card'>
                    <Link to={props.ProductOneLink}><img className='Product-slider-card-ImageCSS' 
                        src={props.ProductOneImg} alt="Laptops" /></Link> 
                    </div>
                    
                    <div className='Product-slider-card'>
                    <Link to={props.ProductOneLink}><img className='Product-slider-card-ImageCSS' 
                        src={props.ProducttwoImg} alt="Laptops" /></Link> 
                    </div>

                    <div className='Product-slider-card'>
                    <Link to={props.ProductOneLink}><img className='Product-slider-card-ImageCSS' 
                        src={props.ProductthreeImg} alt="Laptops" /></Link> 
                    </div>

                    <div className='Product-slider-card'>
                    <Link to={props.ProductOneLink}><img className='Product-slider-card-ImageCSS' 
                        src={props.ProductfourImg} alt="Laptops" /></Link> 
                    </div>

                    <div className='Product-slider-card'>
                    <Link to={props.ProductOneLink}><img className='Product-slider-card-ImageCSS' 
                        src={props.ProductfiveImg} alt="Laptops" /></Link> 
                    </div>

                    <div className='Product-slider-card'>
                    <Link to={props.ProductOneLink}><img className='Product-slider-card-ImageCSS-Diff'  
                        src={props.ProductsixImg} alt="Laptops" /></Link> 
                    </div>

                    <div className='Product-slider-card'>
                    <Link to={props.ProductOneLink}><img className='Product-slider-card-ImageCSS-Diff' 
                        src={props.ProductsevenImg} alt="Laptops" /></Link> 
                    </div>

                    <div className='Product-slider-card'>
                    <Link to={props.ProductOneLink}><img className='Product-slider-card-ImageCSS-Diff' 
                        src={props.ProducteightImg} alt="Laptops" /></Link> 
                    </div>
                    
                    </Slider>
                </div>
            </div>
        </>
    )
}

export default ProductSlider