import React, { useEffect, useState } from 'react'
import SidePage from './SidePage'
import SmallCarousel from './SmallCarousel'
// import Carousel from './Carousel'
import CarouselImg1 from './carousel image 1.png'
import CarouselImg2 from './carousel image 2.jpg'
import CarouselImg3 from './carousel image 3.jpg'
import CarouselImg4 from './carousel image 4.gif'
import CarouselImg5 from './carousel image 5.jpg'
import axios from 'axios'
import ContentCards from './ContentCards'
import {useSearch} from './SearchContext'
import { HorizontalRule } from '@mui/icons-material'

function SportsSunglasses() {

    const [SportsSunglassesapi, setSportsSunglassesapi] = useState([])
    const [selectedBrands, setselectedBrands] = useState([])
    const [selectedCategory, setselectedCategory] = useState('')
    const [sidepageshow, setsidepageshow] = useState(false)

    // for search query
    const {searchQuery} = useSearch()

    useEffect(() => {
        axios.all([
            axios.get('https://dummyjson.com/products/category/sports-accessories'),
            axios.get('https://dummyjson.com/products/category/sunglasses'),
        ])
        .then(axios.spread((Sports,Sunglasses)=>{
            const CombinedData = [
                ...Sports.data.products,
                ...Sunglasses.data.products,
            ]
            console.log(CombinedData)
            setSportsSunglassesapi(CombinedData)
        }))

        .catch(()=> console.log("Network Error"))
    },[])

    const NameofBrands = [...new Set(SportsSunglassesapi.map((products)=> products.brand ? products.brand : "Unknown"))]
    const SSCategories = [...new Set(SportsSunglassesapi.map((Category)=> Category.category))]

    function handlebrandselection(brands){
        setselectedBrands((prevselectedBrand)=>{
            if(prevselectedBrand.includes(brands)){
                return prevselectedBrand.filter((selectedBrand)=> selectedBrand !== brands)
            }
            else{
                return [...prevselectedBrand, brands]
            }
        })
    }

    function handleCategorySelection(category){
        setselectedCategory(category === selectedCategory ? '' : category)
    }

    const filteredProducts = SportsSunglassesapi.filter((product)=>
    (selectedBrands.length === 0 || selectedBrands.includes(product.brand ? product.brand : "Unknown")) &&
    (!selectedCategory || selectedCategory === product.category) &&
    (!searchQuery ||
        (product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase()))
    )
)

    // const filteredProducts = selectedBrands.length > 0
    // ? SportsSunglassesapi.filter((products)=> selectedBrands.includes(products.brand ? products.brand : "Unknown"))
    // : SportsSunglassesapi

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

            <div className='SportsSunglasses-begin'>
                <div className={`SidepageHandle ${sidepageshow ? "active" : ""}`}>
                    <SidePage BrandNames={NameofBrands}
                     handlebrandselection={handlebrandselection}
                     Categories = {SSCategories} 
                     handleCategorySelection={handleCategorySelection}
                     HandleCategories={HandleCategories}
                    />
                </div>

                <div className='smallCarouselDiv'>
                    <SmallCarousel CarouselImg1={CarouselImg1} CarouselImg2={CarouselImg2} CarouselImg3={CarouselImg3}
                        CarouselImg4={CarouselImg4} CarouselImg5={CarouselImg5} />
                </div>
            </div>

            <div className='SportsSunglasses-Content-div'>
                <ContentCards filteredProducts={filteredProducts}/>
            </div>
        </>
    )
}

export default SportsSunglasses