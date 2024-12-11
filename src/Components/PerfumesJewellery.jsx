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

function PerfumesJewellery() {

    // For API 
    const [PerfumesJewelleryapi, setPerfumesJewelleryapi] = useState([])
    // For selecting state of brandnames in sidepage
    const [selectedState, setselectedState] = useState([])
    const [selectedCategory, setselectedCategory] = useState('')

    const [sidepageshow, setsidepageshow] = useState(false)

    // For search query
    const {searchQuery} = useSearch()

    useEffect(() => {
        axios.all([
            axios.get('https://dummyjson.com/products/category/fragrances'),
            axios.get('https://dummyjson.com/products/category/womens-jewellery'),
        ])
        .then(axios.spread((Fragrances,Jewellery)=>{
            const CombinedData = [
                ...Fragrances.data.products,
                ...Jewellery.data.products,
            ]
            console.log(CombinedData)
            setPerfumesJewelleryapi(CombinedData)
        }))

        .catch(()=> console.log("Network Error"))
    },[])

    const NamesofBrand = [...new Set(PerfumesJewelleryapi.map((product)=> product.brand ? product.brand : "Unknown"))]
    const PJCategories = [...new Set(PerfumesJewelleryapi.map((Category)=> Category.category))]

    function handlebrandselection(brands){
        setselectedState((prevselectedBrand)=>{
            if(prevselectedBrand.includes(brands)){
                return prevselectedBrand.filter((selectedbrand)=> selectedbrand !== brands)
            }
            else{
                return [...prevselectedBrand, brands]
            }
        })
    }

    function handleCategorySelection(category){
        setselectedCategory(category === selectedCategory ? '' : category)
    }

    const filteredProducts = PerfumesJewelleryapi.filter((product)=>
    (selectedState.length === 0 || selectedState.includes(product.brand ? product.brand : "Unknown")) &&
    (!selectedCategory || selectedCategory === product.category) &&
    (!searchQuery ||
        (product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase()))
    )
)

    // const filteredProducts = selectedState.length > 0 
    // ? PerfumesJewelleryapi.filter((product)=> selectedState.includes(product.brand ? product.brand : "Unknown"))
    // : PerfumesJewelleryapi

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

            <div className='PerfumesJewellery-begin'>
                <div className={`SidepageHandle ${sidepageshow ? "active" : ""}`}>
                    <SidePage BrandNames={NamesofBrand} handlebrandselection={handlebrandselection}
                    Categories = {PJCategories} 
                    handleCategorySelection={handleCategorySelection}
                    HandleCategories={HandleCategories}
                    />
                </div>

                <div className='smallCarouselDiv'>
                    <SmallCarousel CarouselImg1={CarouselImg1} CarouselImg2={CarouselImg2} CarouselImg3={CarouselImg3}
                        CarouselImg4={CarouselImg4} CarouselImg5={CarouselImg5} />
                </div>
            </div>

            <div className='PerfumesJewellery-Content-div'>
                <ContentCards filteredProducts={filteredProducts}/>
            </div>
        </>
    )
}

export default PerfumesJewellery