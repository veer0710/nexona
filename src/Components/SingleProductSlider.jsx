import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

function SingleProductSlider(props) {

    const ProductSliderImages=props.ProductImages

    var settings = {
        dots: true,
        infinite: false,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            //   {
            //     breakpoint: 1030,
            //     settings: {
            //       slidesToShow: 4,
            //       slidesToScroll: 4,
            //       infinite: true,
            //       dots: true
            //     }
            //   },
            {
                breakpoint: 430,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    infinite: false,
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
            <div className="carousel SingleProduct-slider">

                <div className='SingleProduct-slider-cards'>
                    <Slider {...settings}>

                        {ProductSliderImages && ProductSliderImages.images && ProductSliderImages.images.map((img, ind)=>{
                            return <div key={ind} className='SingleProduct-slider-card'>
                            <img className='SingleProduct-slider-card-ImageCSS'
                                src={img} alt="product" />
                        </div>
                        })}

                    </Slider>
                </div>
            </div>
        </>
    )
}

export default SingleProductSlider