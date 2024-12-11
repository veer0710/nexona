import React, { useEffect, useState } from 'react'
import Carousel from './Carousel'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MenWomenFashionBanner from './Men-Women Fashion.jpg'
import SportsTools from './sports-tools.jpg'
import CarouselImg1 from './carousel image 1.png'
import CarouselImg2 from './carousel image 2.jpg'
import CarouselImg3 from './carousel image 3.jpg'
import CarouselImg4 from './carousel image 4.gif'
import CarouselImg5 from './carousel image 5.jpg'
import ProductSlider from './ProductSlider'
import ThreeInOneDiv from './ThreeInOneDiv'
import Loader from './loader.gif'

function Home() {

  const [apidata, setapidata] = useState([])
  const [loading, setloading] = useState(true)

  useEffect(() => {
    setloading(true)
    axios.all([
      axios.get('https://dummyjson.com/products/category/mens-shirts'),
      axios.get('https://dummyjson.com/products/category/mens-shoes'),
      axios.get('https://dummyjson.com/products/category/mens-watches'),
      // Women's Fashion links
      axios.get('https://dummyjson.com/products/category/womens-dresses'),
      axios.get('https://dummyjson.com/products/category/womens-bags'),
      axios.get('https://dummyjson.com/products/category/womens-shoes'),
      axios.get('https://dummyjson.com/products/category/womens-watches'),
      // Electronics
      axios.get('https://dummyjson.com/products/category/laptops'),
      axios.get('https://dummyjson.com/products/category/smartphones'),
      axios.get('https://dummyjson.com/products/category/tablets'),
      // HomeKitchenFurniture
      axios.get('https://dummyjson.com/products/category/home-decoration'),
      axios.get('https://dummyjson.com/products/category/kitchen-accessories'),
      axios.get('https://dummyjson.com/products/category/furniture'),
      // MobileAccessories
      axios.get('https://dummyjson.com/products/category/mobile-accessories'),
      // BeautySkinCareGrocery
      axios.get('https://dummyjson.com/products/category/beauty'),
      axios.get('https://dummyjson.com/products/category/skin-care'),
      axios.get('https://dummyjson.com/products/category/groceries'),
      // PerfumesJewellery
      axios.get('https://dummyjson.com/products/category/fragrances'),
      axios.get('https://dummyjson.com/products/category/womens-jewellery'),
      // SportsSunglasses
      axios.get('https://dummyjson.com/products/category/sports-accessories'),
      axios.get('https://dummyjson.com/products/category/sunglasses'),
      // VehicleMotorcycle
      axios.get('https://dummyjson.com/products/category/vehicle'),
      axios.get('https://dummyjson.com/products/category/motorcycle'),

    ])

      .then(axios.spread((
        // Men's Fashion
        MensShirts, MensShoes, MensWatches,
        // // Women's Fashion
        WomenDresses, WomenBags, WomenShoes, WomenWatches,
        // Electronics
        Laptops, Smartphones, Tablets,
        // HomeKitchenFurniture
        HomeDecoration, KitchenAccessories, Furniture,
        // MobileAccessories
        MobileAccessories,
        // Beauty, Skincare, Groceries
        Beauty, Skincare, Groceries,
        // Fragrances,Jewellery
        Fragrances, Jewellery,
        // Sports,Sunglasses
        Sports, Sunglasses,
        // VehicleMotorcycle
        Vehicle, Motorcycle
      ) => {
        const AllApiCombined = [
          // Men's Fashion
          ...MensShirts.data.products,
          ...MensShoes.data.products,
          ...MensWatches.data.products,
          // Women's Fashion
          ...WomenDresses.data.products,
          ...WomenBags.data.products,
          ...WomenShoes.data.products,
          ...WomenWatches.data.products,
          // Electronics
          ...Laptops.data.products,
          ...Smartphones.data.products,
          ...Tablets.data.products,
          // HomeKitchenFurniture
          ...HomeDecoration.data.products,
          ...KitchenAccessories.data.products,
          ...Furniture.data.products,
          // MobileAccessories
          ...MobileAccessories.data.products,
          // Beauty, Skincare, Groceries
          ...Beauty.data.products,
          ...Skincare.data.products,
          ...Groceries.data.products,
          // // Fragrances,Jewellery
          ...Fragrances.data.products,
          ...Jewellery.data.products,
          // Sports,Sunglasses
          ...Sports.data.products,
          ...Sunglasses.data.products,
          // VehicleMotorcycle
          ...Vehicle.data.products,
          ...Motorcycle.data.products,

        ]
        console.log(AllApiCombined);
        setapidata(AllApiCombined)
        setloading(false)
      }))

      .catch(() => setloading(false))
  }, [])

  if (loading) {
    return <div className='loader'><img src={Loader} alt={Loader} id='Loader' /></div>
  }

  return (
    <>
      <div className='HomeResponsiveClass'>
        <Carousel CarouselImg1={CarouselImg1} CarouselImg2={CarouselImg2} CarouselImg3={CarouselImg3}
          CarouselImg4={CarouselImg4} CarouselImg5={CarouselImg5} />
        {/* Men-Women Fashion Start */}
        <div className="men-women-fashion">

          {/* Men's Fashion Start */}
          <div className="mens-fashion">
            <p id='mens-fashion-heading'>Deals on Men's Fashion</p>

            <div className="mens-fashion-cards">

              <div className='mens-fashion-card' >
                <Link to="/">
                  <div className='mens-fashion-card-image-div'>
                    <img src={apidata[0] && apidata[0].thumbnail} alt="thumbnail" className='mens-fashion-card-image' />
                  </div>
                  <div className='mens-fashion-card-image-info'>
                    <p>Men's Shirts</p>
                    <h6>Upto 18% off</h6>
                  </div>
                </Link>
              </div>


              <div className='mens-fashion-card' >
                <Link to="/">
                  <div className='mens-fashion-card-image-div'>
                    <img src={apidata[5] && apidata[5].thumbnail} alt="thumbnail" className='mens-fashion-card-image' />
                  </div>
                  <div className='mens-fashion-card-image-info'>
                    <p>Men's Shoes</p>
                    <h6>Upto 17% off</h6>
                  </div>
                </Link>
              </div>
            </div>

            <div className="mens-fashion-cards-2">
              <div className='mens-fashion-card' >
                <Link to="/">
                  <div className='mens-fashion-card-image-div'>
                    <img src={apidata[11] && apidata[11].thumbnail} alt="thumbnail" className='mens-fashion-card-image' />
                  </div>
                  <div className='mens-fashion-card-image-info'>
                    <p>Men's Watches</p>
                    <h6>Upto 15% off</h6>
                  </div>
                </Link>
              </div>

              <div className='mens-fashion-card' >
                <Link to="/">
                  <div className='mens-fashion-card-image-div'>
                    <img src={apidata[10] && apidata[10].thumbnail} alt="thumbnail" className='mens-fashion-card-image' />
                  </div>
                  <div className='mens-fashion-card-image-info'>
                    <p>Men's Watches</p>
                    <h6>Upto 15% off</h6>
                  </div>
                </Link>
              </div>
            </div>
            <p id='see-all-deals'><Link to="/MensFashion">See all deals</Link></p>
          </div>

          {/* Women's Fashion Start */}
          <div className="women-fashion">
            <p id='women-fashion-heading'>Deals on Women's Fashion</p>

            <div className="women-fashion-cards">

              <div className='women-fashion-card' >
                <Link to="/">
                  <div className='women-fashion-card-image-div'>
                    <img src={apidata[17] && apidata[17].thumbnail} alt="thumbnail" className='women-fashion-card-image' />
                  </div>
                  <div className='women-fashion-card-image-info'>
                    <p>Women Dresses</p>
                    <h6>Upto 19% off</h6>
                  </div>
                </Link>
              </div>


              <div className='women-fashion-card' >
                <Link to="/">
                  <div className='women-fashion-card-image-div'>
                    <img src={apidata[22] && apidata[22].thumbnail} alt="thumbnail" className='women-fashion-card-image' />
                  </div>
                  <div className='women-fashion-card-image-info'>
                    <p>Women Bags</p>
                    <h6>Upto 18% off</h6>
                  </div>
                </Link>
              </div>
            </div>

            <div className="women-fashion-cards-2">
              <div className='women-fashion-card' >
                <Link to="/">
                  <div className='women-fashion-card-image-div'>
                    <img src={apidata[28] && apidata[28].thumbnail} alt="thumbnail" className='women-fashion-card-image' />
                  </div>
                  <div className='women-fashion-card-image-info'>
                    <p>Women Shoes</p>
                    <h6>Upto 15% off</h6>
                  </div>
                </Link>
              </div>

              <div className='women-fashion-card' >
                <Link to="/">
                  <div className='women-fashion-card-image-div'>
                    <img src={apidata[33] && apidata[33].thumbnail} alt="thumbnail" className='women-fashion-card-image' />
                  </div>
                  <div className='women-fashion-card-image-info'>
                    <p>Women Watches</p>
                    <h6>Upto 19% off</h6>
                  </div>
                </Link>
              </div>
            </div>
            <p id='see-all-deals'><Link to="/WomensFashion">See all deals</Link></p>
          </div>

          <div className="Men-Women-Fashion-Banner-div">
            <img src={MenWomenFashionBanner} alt="MenWomenFashionBanner" id='Men-Women-Fashion-Banner-image' />
          </div>

        </div>

        {/* HOME ELECTRONICS START */}
        <div className="home-electronics">
          <ProductSlider SliderHeading={"Top Deals on Electronics"} SeeMore={<Link to="/Electronics" className='Product-slider-SeeMore'>See More</Link>}
            ProductOneImg={apidata[36] && apidata[36].thumbnail} ProductOneLink={"/Electronics"}
            ProducttwoImg={apidata[37] && apidata[37].thumbnail}
            ProductthreeImg={apidata[38] && apidata[38].thumbnail}
            ProductfourImg={apidata[39] && apidata[39].thumbnail}
            ProductfiveImg={apidata[40] && apidata[40].thumbnail}
            ProductsixImg={apidata[41] && apidata[41].images[1]}
            ProductsevenImg={apidata[57] && apidata[57].thumbnail}
            ProducteightImg={apidata[43] && apidata[43].images[1]} />
        </div>

        {/* Three in one div start */}
        <div className="threeDiv-begin">
          <ThreeInOneDiv
            // FirstDiv start
            FirstDivHeading={"Home, Kitchen, Furniture"}
            FirstDivLink={'/HomeKitchenFurniture'}
            FirstDivImg1={apidata[60] && apidata[60].thumbnail}
            FirstDivTitle1={apidata[60] && apidata[60].title} FirstDivh61={"Upto 19% off"}
            FirstDivImg2={apidata[61] && apidata[61].thumbnail}
            FirstDivTitle2={apidata[61] && apidata[61].title} FirstDivh62={"Upto 15% off"}
            FirstDivImg3={apidata[65] && apidata[65].thumbnail}
            FirstDivTitle3={apidata[65] && apidata[65].title} FirstDivh63={"Upto 15% off"}
            FirstDivImg4={apidata[95] && apidata[95].thumbnail}
            FirstDivTitle4={apidata[95] && apidata[95].title} FirstDivh64={"Upto 15% off"}
            // SecondDiv start
            SecondDivHeading={"Mobile Accessories"}
            SecondDivLink={'/MobileAccessories'}
            SecondDivImg1={apidata[100] && apidata[100].thumbnail}
            SecondDivTitle1={apidata[100] && apidata[100].title} SecondDivh61={"Upto 19% off"}
            SecondDivImg2={apidata[101] && apidata[101].thumbnail}
            SecondDivTitle2={apidata[101] && apidata[101].title} SecondDivh62={"Upto 15% off"}
            SecondDivImg3={apidata[102] && apidata[102].thumbnail}
            SecondDivTitle3={apidata[102] && apidata[102].title} SecondDivh63={"Upto 15% off"}
            SecondDivImg4={apidata[103] && apidata[103].thumbnail}
            SecondDivTitle4={apidata[103] && apidata[103].title} SecondDivh64={"Upto 15% off"}
            // ThirdDiv start
            ThirdDivHeading={"Beauty, Skin Care, Grocery"}
            ThirdDivLink={'/BeautySkinCareGrocery'}
            ThirdDivImg1={apidata[114] && apidata[114].thumbnail}
            ThirdDivTitle1={apidata[114] && apidata[114].title} ThirdDivh61={"Upto 19% off"}
            ThirdDivImg2={apidata[115] && apidata[115].thumbnail}
            ThirdDivTitle2={apidata[115] && apidata[115].title} ThirdDivh62={"Upto 15% off"}
            ThirdDivImg3={apidata[119] && apidata[119].thumbnail}
            ThirdDivTitle3={apidata[119] && apidata[119].title} ThirdDivh63={"Upto 15% off"}
            ThirdDivImg4={apidata[122] && apidata[122].thumbnail}
            ThirdDivTitle4={apidata[122] && apidata[122].title} ThirdDivh64={"Upto 15% off"}
          />
        </div>

        {/* Perfumes & Jewellery start */}
        <div className="Perfumes-Jewellery">
          <ProductSlider SliderHeading={"Best Deals on Perfumes & Jewellery"} SeeMore={<Link to="/PerfumesJewellery" className='Product-slider-SeeMore'>See More</Link>}
            ProductOneImg={apidata[149] && apidata[149].images[2]} ProductOneLink={"/PerfumesJewellery"}
            ProducttwoImg={apidata[150] && apidata[150].images[0]}
            ProductthreeImg={apidata[151] && apidata[151].images[1]}
            ProductfourImg={apidata[152] && apidata[152].images[1]}
            ProductfiveImg={apidata[153] && apidata[153].thumbnail}
            ProductsixImg={apidata[154] && apidata[154].images[1]}
            ProductsevenImg={apidata[155] && apidata[155].thumbnail}
            ProducteightImg={apidata[156] && apidata[156].images[1]} />
        </div>

        {/* Sports & sunglasses start */}
        <div className='SportsSunglasses-div'>

          {/* First Div start */}
          <div className="SportsSunglasses-FirstDiv">
            <p id='SportsSunglasses-FirstDiv-heading'>Deals on Sports & Sunglasses</p>

            <div className="SportsSunglasses-FirstDiv-cards">

              <div className='SportsSunglasses-FirstDiv-card' >
                <Link to="/">
                  <div className='SportsSunglasses-FirstDiv-card-image-div'>
                    <img src={apidata[157] && apidata[157].thumbnail} alt="thumbnail" className='SportsSunglasses-FirstDiv-card-image' />
                  </div>
                  <div className='SportsSunglasses-FirstDiv-card-image-info'>
                    <p>{apidata[157] && apidata[157].title ? (apidata[157].title.length > 17 ? apidata[157].title.slice(0, 17) + "..." : apidata[157].title) : ""}</p>
                    <h6>Upto 13% off</h6>
                  </div>
                </Link>
              </div>


              <div className='SportsSunglasses-FirstDiv-card' >
                <Link to="/">
                  <div className='SportsSunglasses-FirstDiv-card-image-div'>
                    <img src={apidata[158] && apidata[158].thumbnail} alt="thumbnail" className='SportsSunglasses-FirstDiv-card-image' />
                  </div>
                  <div className='SportsSunglasses-FirstDiv-card-image-info'>
                    <p>{apidata[158] && apidata[158].title ? (apidata[158].title.length > 17 ? apidata[158].title.slice(0, 17) + "..." : apidata[158].title) : ""}</p>
                    <h6>Upto 15% off</h6>
                  </div>
                </Link>
              </div>
            </div>

            <div className="SportsSunglasses-FirstDiv-cards-2">
              <div className='SportsSunglasses-FirstDiv-card' >
                <Link to="/">
                  <div className='SportsSunglasses-FirstDiv-card-image-div'>
                    <img src={apidata[175] && apidata[175].thumbnail} alt="thumbnail" className='SportsSunglasses-FirstDiv-card-image' />
                  </div>
                  <div className='SportsSunglasses-FirstDiv-card-image-info'>
                    <p>{apidata[175] && apidata[175].title ? (apidata[175].title.length > 17 ? apidata[175].title.slice(0, 17) + "..." : apidata[175].title) : ""}</p>
                    <h6>Upto 5% off</h6>
                  </div>
                </Link>
              </div>

              <div className='SportsSunglasses-FirstDiv-card' >
                <Link to="/">
                  <div className='SportsSunglasses-FirstDiv-card-image-div'>
                    <img src={apidata[176] && apidata[176].thumbnail} alt="thumbnail" className='SportsSunglasses-FirstDiv-card-image' />
                  </div>
                  <div className='SportsSunglasses-FirstDiv-card-image-info'>
                    <p>{apidata[176] && apidata[176].title ? (apidata[176].title.length > 17 ? apidata[176].title.slice(0, 17) + "..." : apidata[176].title) : ""}</p>
                    <h6>Upto 18% off</h6>
                  </div>
                </Link>
              </div>
            </div>
            <p id='see-all-deals'><Link to="/SportsSunglasses">See all deals</Link></p>
          </div>

          <div className="SportsSunglasses-Banner-div">
            <img src={SportsTools} alt="SportsSunglasses" id='SportsSunglasses-Banner-image' />
          </div>

        </div>

        <div className="vehicleMotorcycle">
          <ProductSlider SliderHeading={"Best Deals on Vehicle & Motorcycle"} SeeMore={<Link to="/VehicleMotorcycle" className='Product-slider-SeeMore'>See More</Link>}
            ProductOneImg={apidata[179] && apidata[179].images[0]} ProductOneLink={"/VehicleMotorcycle"}
            ProducttwoImg={apidata[180] && apidata[180].images[0]}
            ProductthreeImg={apidata[181] && apidata[181].images[0]}
            ProductfourImg={apidata[182] && apidata[182].images[0]}
            ProductfiveImg={apidata[183] && apidata[183].images[0]}
            ProductsixImg={apidata[184] && apidata[184].images[0]}
            ProductsevenImg={apidata[185] && apidata[185].images[0]}
            ProducteightImg={apidata[186] && apidata[186].images[0]} />
        </div>

      </div>
    </>
  )
}

export default Home