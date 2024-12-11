import React, { useEffect, useState } from 'react'
import SidePage from './SidePage'
import SmallCarousel from './SmallCarousel'
import CarouselImg1 from './carousel image 1.png'
import CarouselImg2 from './carousel image 2.jpg'
import CarouselImg3 from './carousel image 3.jpg'
import CarouselImg4 from './carousel image 4.gif'
import CarouselImg5 from './carousel image 5.jpg'
import axios from 'axios'
import ContentCards from './ContentCards'
import { Link } from 'react-router-dom'
import { useSearch } from './SearchContext'
import { HorizontalRule } from '@mui/icons-material'

function MobileAccessories() {

    const [MobileAccessoriesapidata, setMobileAccessoriesapidata] = useState([])
    const [selectedBrands, setselectedBrands] = useState([])
    const [sidepageshow, setsidepageshow] = useState(false)
    const {searchQuery} = useSearch()

    useEffect(()=>{
        axios.get('https://dummyjson.com/products/category/mobile-accessories')
        .then(response =>{
            console.log(response.data.products)
            setMobileAccessoriesapidata(response.data.products)
        })

        .catch(()=>console.log('Network Error'))
    },[])

    // For display brands
    const MobileAccessoriesBrands = [...new Set(MobileAccessoriesapidata.map((Accessories)=> Accessories.brand))]

    // a function for handeling selection of brands in sidepage 
    function handlebrandselection(MobileBrand){
        setselectedBrands((prevSelectedBrands)=>{
            if(prevSelectedBrands.includes(MobileBrand)){
                return prevSelectedBrands.filter((selectedBrand)=> selectedBrand !== MobileBrand)
            }
            else{
                return [...prevSelectedBrands, MobileBrand]
            }
        })
    }

    // for filter the data on display
    const filteredProducts = MobileAccessoriesapidata.filter((product)=>
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand ? product.brand : "Unknown")) &&
        (!searchQuery ||
            (product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand?.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    )

    // const filteredProducts = selectedBrands.length > 0
    // ? MobileAccessoriesapidata.filter((product)=> selectedBrands.includes(product.brand))
    // : MobileAccessoriesapidata;

    const HandleCategories = () => {
        setsidepageshow(!sidepageshow)
    
        const SidepageHandle = document.getElementsByClassName('SidepageHandle')[0]
        if (SidepageHandle) {
          SidepageHandle.style.display = sidepageshow ? "none" : "block"
          if (SidepageHandle.style.display === "block") {
            document.body.style.overflowY = "hidden"
          }
          else {
            document.body.style.overflowY = "visible"
          }
        }
        else {
          console.log("Sidepage not found");
        }
    
        const overlay = document.getElementById('overlaySidepage')
    
            overlay.classList.toggle('active')
      }

    return (
    <>
    <div className="Categories-BrandsforsmallerDeivesDiv">
        <div className='Categories-BrandsforsmallerDeives'>
          <p className='Categories-BrandsforsmallerDeives-Categories' onClick={HandleCategories}>Categories</p>
          <p><HorizontalRule className='Categories-BrandsforsmallerDeives-divider' /></p>
          <p className='Categories-BrandsforsmallerDeives-Brands' onClick={HandleCategories}>Brands</p>
        </div>
      </div>
      <div className="overlaySidepage" id='overlaySidepage'></div>

    <div className='MobileAccessories-begin'>
        <div className={`SidepageHandle ${sidepageshow ? "active" : ""}`}>
            <SidePage BrandNames={MobileAccessoriesBrands} 
            SelectedBrands={selectedBrands} handlebrandselection={handlebrandselection}
            FirstCategory ={<Link>Mobile Accessories</Link>} 
            HandleCategories={HandleCategories}
            />
        </div>

        <div className='smallCarouselDiv'>
            <SmallCarousel CarouselImg1={CarouselImg1} CarouselImg2={CarouselImg2} CarouselImg3={CarouselImg3}
            CarouselImg4={CarouselImg4} CarouselImg5={CarouselImg5}/>
        </div>
    </div>

    <div className="MobileAccessories-Content-div">
        <ContentCards filteredProducts={filteredProducts}/>
    </div>
    </>
  )
}

export default MobileAccessories