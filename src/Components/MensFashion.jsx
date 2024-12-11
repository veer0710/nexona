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
import axios from 'axios'
import { useSearch } from './SearchContext'
import { HorizontalRule } from '@mui/icons-material'

function MensFashion() {

  const [apidata, setapidata] = useState([])
  const [selectedBrands, setselectedBrands] = useState([])
  const [selectedCategory, setselectedCategory] = useState('')
  const [sidepageshow, setsidepageshow] = useState(false)
  // For search results
  const { searchQuery } = useSearch()

  // Fetching API
  useEffect(() => {
    axios.all([
      axios.get('https://dummyjson.com/products/category/mens-shirts'),
      axios.get('https://dummyjson.com/products/category/mens-shoes'),
      axios.get('https://dummyjson.com/products/category/mens-watches'),
    ])

      .then(axios.spread((MensShirts, MensShoes, MensWatches) => {
        const AllCombined = [
          ...MensShirts.data.products,
          ...MensShoes.data.products,
          ...MensWatches.data.products,
        ]
        console.log(AllCombined)
        setapidata(AllCombined)

      }))

    window.scrollTo(0, 0)
  }, [])

  const brands = [...new Set(apidata.map((product) => product.brand))]

  const ProductsCategories = [...new Set(apidata.map((Category) => Category.category))]

  function handlebrandselection(brand) {
    setselectedBrands((prevSelectedBrands) => {
      if (prevSelectedBrands.includes(brand)) {
        return prevSelectedBrands.filter((selectedBrand) => selectedBrand !== brand)
      }
      else {
        return [...prevSelectedBrands, brand]
      }

    })
  }

  // New function to handle category selection
  function handleCategorySelection(category) {
    setselectedCategory(category === selectedCategory ? '' : category)
  }

  const filteredProducts = apidata.filter((product) =>
    (selectedBrands.length === 0 || selectedBrands.includes(product.brand ? product.brand : "Unknown")) &&
    (!selectedCategory || product.category === selectedCategory) &&
    (!searchQuery ||
      product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // const filteredProducts = selectedBrands.length > 0
  //   ? apidata.filter((product) => selectedBrands.includes(product.brand))
  //   : apidata;

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
      
      <div className="MensFashion-Begin">
        <div className={`SidepageHandle ${sidepageshow ? "active" : ""}`}>
          <SidePage BrandNames={brands} SelectedBrands={selectedBrands}
            handlebrandselection={handlebrandselection}
            Categories={ProductsCategories}
            handleCategorySelection={handleCategorySelection}
            HandleCategories={HandleCategories}
          />
        </div>

        <div className='smallCarouselDiv'>
          <SmallCarousel CarouselImg1={CarouselImg1} CarouselImg2={CarouselImg2} CarouselImg3={CarouselImg3}
            CarouselImg4={CarouselImg4} CarouselImg5={CarouselImg5} />
        </div>

      </div>

      <div className="MensFashion-Content-div">
        <ContentCards filteredProducts={filteredProducts} />
      </div>

    </>
  )
}

export default MensFashion