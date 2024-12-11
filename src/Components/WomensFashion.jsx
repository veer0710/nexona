import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SidePage from './SidePage'
import SmallCarousel from './SmallCarousel'
import CarouselImg1 from './carousel image 1.png'
import CarouselImg2 from './carousel image 2.jpg'
import CarouselImg3 from './carousel image 3.jpg'
import CarouselImg4 from './carousel image 4.gif'
import CarouselImg5 from './carousel image 5.jpg'
import ContentCards from './ContentCards'
import { useSearch } from './SearchContext'
import { HorizontalRule } from '@mui/icons-material'

function WomensFashion() {

  const [womenapi, setwomenapi] = useState([])
  const [womenselectedBrands, setwomenselectedBrands] = useState([])
  const [selectedCategory, setselectedCategory] = useState('')
  const [sidepageshow, setsidepageshow] = useState(false)

  const {searchQuery} = useSearch()

  useEffect(() => {
    axios.all([
      axios.get('https://dummyjson.com/products/category/womens-dresses'),
      axios.get('https://dummyjson.com/products/category/womens-bags'),
      axios.get('https://dummyjson.com/products/category/womens-shoes'),
      axios.get('https://dummyjson.com/products/category/womens-watches'),
      axios.get('https://dummyjson.com/products/category/tops'),
    ])

      .then(axios.spread((WomenDresses, WomenBags, WomenShoes, WomenWatches,Tops) => {
        const WomenCombinedData = [
          ...WomenDresses.data.products,
          ...WomenBags.data.products,
          ...WomenShoes.data.products,
          ...WomenWatches.data.products,
          ...Tops.data.products,
        ]
        console.log(WomenCombinedData)
        setwomenapi(WomenCombinedData)
      }))

      .catch(() => console.log("Network Error"))
  }, [])

  const WomenBrands = [...new Set(womenapi.map((womenproductbrands) => womenproductbrands.brand ? womenproductbrands.brand : "Unknown"))]
  const ProductsCategories = [...new Set(womenapi.map((Category)=> Category.category))]

  function handlebrandselection(womenbrand){
    setwomenselectedBrands((prevSelectedBrand)=>{
      if(prevSelectedBrand.includes(womenbrand)){
        return prevSelectedBrand.filter((womenselectedBrand)=> womenselectedBrand !== womenbrand)
      }
      else{
        return [...prevSelectedBrand, womenbrand]
      }
    })
  }

  function handleCategorySelection(category){
    setselectedCategory(category === selectedCategory ? '' : category)
  }

  const filteredProducts = womenapi.filter((products)=>
    (womenselectedBrands.length === 0 || womenselectedBrands.includes(products.brand ? products.brand : "Unknown")) &&
  (!selectedCategory || products.category === selectedCategory) &&
  (!searchQuery || 
    products.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    products.brand.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // const filteredProducts = womenselectedBrands.length > 0 
  // ? womenapi.filter((product) => womenselectedBrands.includes(product.brand ? product.brand : "Unknown"))
  // : womenapi ;

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

      <div className="WomensBegin">
        <div className={`SidepageHandle ${sidepageshow ? "active" : ""}`}>
          <SidePage 
            BrandNames ={WomenBrands} SelectedBrands={womenselectedBrands}
            handlebrandselection={handlebrandselection}
            Categories = {ProductsCategories} 
            handleCategorySelection={handleCategorySelection}
            HandleCategories={HandleCategories}
            />
        </div>

        <div className='smallCarouselDiv'>
          <SmallCarousel CarouselImg1={CarouselImg1} CarouselImg2={CarouselImg2} CarouselImg3={CarouselImg3}
            CarouselImg4={CarouselImg4} CarouselImg5={CarouselImg5}/>
        </div >

      </div>

      <div className="WomensFashion-Content-div">
        <ContentCards filteredProducts={filteredProducts}/>
      </div>
    </>
  )
}

export default WomensFashion