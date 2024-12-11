import React, { useEffect, useState } from 'react'
import CarouselImg1 from './carousel image 1.png'
import CarouselImg2 from './carousel image 2.jpg'
import CarouselImg3 from './carousel image 3.jpg'
import CarouselImg4 from './carousel image 4.gif'
import CarouselImg5 from './carousel image 5.jpg'
import SidePage from './SidePage'
import SmallCarousel from './SmallCarousel'
import axios from 'axios'
import ContentCards from './ContentCards'
import {useSearch} from './SearchContext'
import { HorizontalRule } from '@mui/icons-material'

function HomeKitchenFurniture() {

    const [apidata, setapidata] = useState([])
    const [selectedBrands, setselectedBrands] = useState([])
    const [selectedCategory, setselectedCategory] = useState('')
    const [sidepageshow, setsidepageshow] = useState(false)
    const {searchQuery} = useSearch()

    useEffect(() => {
        axios.all([
            axios.get('https://dummyjson.com/products/category/home-decoration'),
            axios.get('https://dummyjson.com/products/category/kitchen-accessories'),
            axios.get('https://dummyjson.com/products/category/furniture'),
        ])
            .then(axios.spread((HomeDecoration, KitchenAccessories, Furniture) => {
                const CombinedData = [
                    ...HomeDecoration.data.products,
                    ...KitchenAccessories.data.products,
                    ...Furniture.data.products,
                ]
                console.log(CombinedData)
                setapidata(CombinedData)
            }))

            .catch(() => "Network Error")
    }, [])

    const BrandNames = [...new Set(apidata.map((Bnames => Bnames.brand ? Bnames.brand : "Unknown")))]
    const HKFCategories = [...new Set(apidata.map((Category)=> Category.category))]

    function handlebrandselection(brand) {
        setselectedBrands((prevselectedbrand) => {
            if (prevselectedbrand.includes(brand)) {
                return prevselectedbrand.filter((selectbrand) => selectbrand !== brand)
            }
            else {
                return [...prevselectedbrand, brand]
            }
        })
    }

    function handleCategorySelection(category){
        setselectedCategory(category === selectedCategory ? '' : category)
    }

    const filteredProducts = apidata.filter((product)=>
    (selectedBrands.length === 0 || selectedBrands.includes(product.brand ? product.brand : "Unknown" )) &&
    (!selectedCategory || selectedCategory === product.category) &&
    (!searchQuery || 
       (product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product.brand?.toLowerCase().includes(searchQuery.toLowerCase())))
    )

    // const filteredProducts = selectedBrands.length > 0
    //     ? apidata.filter((products) => selectedBrands.includes(products.brand ? products.brand : "Unknown"))
    //     : apidata;

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

            <div className="HomeKitchenFurniture-begin">

                <div className={`SidepageHandle ${sidepageshow ? "active" : ""}`}>
                    <SidePage
                        BrandNames={BrandNames}
                        SelectedBrands={selectedBrands}
                        handlebrandselection={handlebrandselection}
                        Categories = {HKFCategories}
                        handleCategorySelection={handleCategorySelection}
                        HandleCategories={HandleCategories}
                    />
                </div>

                <div className='smallCarouselDiv'>
                    <SmallCarousel
                        CarouselImg1={CarouselImg1} CarouselImg2={CarouselImg2} CarouselImg3={CarouselImg3}
                        CarouselImg4={CarouselImg4} CarouselImg5={CarouselImg5}
                    />
                </div>

            </div>

            <div className="HomeKitchenFurniture-content-div">

                <ContentCards filteredProducts={filteredProducts} />
            </div>
        </>
    )
}

export default HomeKitchenFurniture