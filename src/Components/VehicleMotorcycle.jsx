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

function VehicleMotorcycle() {

    const [VehicleMotorcycleapi, setVehicleMotorcycleapi] = useState([])
    const [selectedBrands, setselectedBrands] = useState([])
    const [selectedCategory, setselectedCategory] = useState('')
    const [sidepageshow, setsidepageshow] = useState(false)

    // for search query
    const {searchQuery} = useSearch()

    useEffect(() => {
        axios.all([
            axios.get('https://dummyjson.com/products/category/vehicle'),
            axios.get('https://dummyjson.com/products/category/motorcycle'),
        ])
        .then(axios.spread((Vehicle,Motorcycle)=>{
            const CombinedData = [
                ...Vehicle.data.products,
                ...Motorcycle.data.products,
            ]
            console.log(CombinedData)
            setVehicleMotorcycleapi(CombinedData)
        }))

        .catch(()=> console.log("Network Error"))
    },[])

    const NamesofBrand = [...new Set(VehicleMotorcycleapi.map((products)=> products.brand))]
    const VMCategories = [...new Set(VehicleMotorcycleapi.map((Category)=> Category.category))]

    function handlebrandselection(brand){
        setselectedBrands((prevSelectedBrands)=>{
            if(prevSelectedBrands.includes(brand)){
                return prevSelectedBrands.filter((selectedBrand) => selectedBrand !== brand)
            }
            else{
                return [...prevSelectedBrands, brand]
            }
        })
    }

    function handleCategorySelection(category){
        setselectedCategory(category === selectedCategory ? '' : category)
    }

    const filteredProducts = VehicleMotorcycleapi.filter((product)=>
    (selectedBrands.length === 0 || selectedBrands.includes(product.brand ? product.brand : "Unknown")) && 
    (!selectedCategory || selectedCategory === product.category) &&
    (!searchQuery ||
        (product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase()))
    )
)

    // const filteredProducts = selectedBrands.length > 0
    // ? VehicleMotorcycleapi.filter((product)=> selectedBrands.includes(product.brand))
    // : VehicleMotorcycleapi;

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

            <div className='VehicleMotorcycle-begin'>
                <div className={`SidepageHandle ${sidepageshow ? "active" : ""}`}>
                    <SidePage BrandNames={NamesofBrand} handlebrandselection={handlebrandselection}
                    Categories = {VMCategories} 
                    handleCategorySelection={handleCategorySelection}
                    HandleCategories={HandleCategories}
                    />
                </div>

                <div>
                    <SmallCarousel CarouselImg1={CarouselImg1} CarouselImg2={CarouselImg2} CarouselImg3={CarouselImg3}
                        CarouselImg4={CarouselImg4} CarouselImg5={CarouselImg5} />
                </div>
            </div>

            <div className='VehicleMotorcycle-Content-div'>
                <ContentCards filteredProducts={filteredProducts} />
            </div>
        </>
    )
}

export default VehicleMotorcycle