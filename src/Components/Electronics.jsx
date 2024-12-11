import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SidePage from './SidePage'
import SmallCarousel from './SmallCarousel'
// import Carousel from './Carousel'
import CarouselImg1 from './carousel image 1.png'
import CarouselImg2 from './carousel image 2.jpg'
import CarouselImg3 from './carousel image 3.jpg'
import CarouselImg4 from './carousel image 4.gif'
import CarouselImg5 from './carousel image 5.jpg'
import ContentCards from './ContentCards'
import { useSearch } from './SearchContext'
import { HorizontalRule } from '@mui/icons-material'

function Electronics() {

    const [Electronicsapi, setElectronicsapi] = useState([])
    const [selectedBrands, setselectedBrands] = useState([])
    const [selectedCategory, setselectedCategory] = useState('')
    const [sidepageshow, setsidepageshow] = useState(false)
    const {searchQuery} = useSearch()


    useEffect(() => {
        axios.all([
            axios.get('https://dummyjson.com/products/category/laptops'),
            axios.get('https://dummyjson.com/products/category/smartphones'),
            axios.get('https://dummyjson.com/products/category/tablets'),
        ])
            .then(axios.spread((LaptopsData, SmartphonesData, TabletsData) => {
                const CombinedData = [
                    ...LaptopsData.data.products,
                    ...SmartphonesData.data.products,
                    ...TabletsData.data.products
                ]
                console.log(CombinedData)
                setElectronicsapi(CombinedData)
            }))

            .catch(() => console.log("Network Error"))
    }, [])

    const ElectronicsBrands = [...new Set(Electronicsapi.map((electronicsbrand) => electronicsbrand.brand))]
    const ElectronicsCategories = [...new Set(Electronicsapi.map((Category)=> Category.category))]

    function handlebrandselection(ElectronicsBrand) {
        setselectedBrands((prevsdata) => {
            if (prevsdata.includes(ElectronicsBrand)) {
                return prevsdata.filter((selectbrand) => selectbrand !== ElectronicsBrand)
            }
            else {
                return [...prevsdata, ElectronicsBrand]
            }
        })
    }

    // For Category selection
    function handleCategorySelection(category){
        setselectedCategory(category === selectedCategory ? '' : category)
    }

    const filteredProducts = Electronicsapi.filter((product)=>
    (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
    (!selectedCategory || product.category === selectedCategory) &&
    (!searchQuery || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    // const filteredProducts = selectedBrands.length > 0
    //     ? Electronicsapi.filter((product) => selectedBrands.includes(product.brand))
    //     : Electronicsapi;

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

            <div className="Electronics-Begin">

                <div className={`SidepageHandle ${sidepageshow ? "active" : ""}`}>
                    <SidePage
                        BrandNames={ElectronicsBrands}
                        SelectedBrands={selectedBrands}
                        handlebrandselection={handlebrandselection}
                        Categories = {ElectronicsCategories}
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

            <div className='Electronics-content-div'>
                <ContentCards filteredProducts={filteredProducts} />
            </div>
        </>
    )
}

export default Electronics