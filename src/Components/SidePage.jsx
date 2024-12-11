import React from 'react'
import { Link } from 'react-router-dom'
import { Close } from '@mui/icons-material'

function SidePage(props) {

  const DisplayBrandNames = props.BrandNames
  const SelectedBrands = props.selectedBrands
  const Handlebrandselection = props.handlebrandselection
  const DisplayCategories = props.Categories
  const handleCategorySelection = props.handleCategorySelection
  
  return (
    <>
      <div className='sidepage'>

        <ul>
          <div className="sidepageCloseBtnDiv">
          <p>Categories</p>
          <Close onClick={props.HandleCategories} className='sidepageCloseBtnDiv-Icon'/>
          </div>
          <li><Link>{props.FirstCategory}</Link></li>
          {DisplayCategories && DisplayCategories.map((category,index) => {
            return <li onClick={props.HandleCategories} key={index}>
            <Link onClick={() => handleCategorySelection(category)}>
            {(category && category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()).replace("-"," ")
            .split(" ").map((word,index)=> index === 1 ? word.charAt(0).toUpperCase() + word.slice(1) : word)
            .join(" ")}
            </Link></li>
          })}
          
        </ul>

        <div id="underline"></div>

        <ul>
          <p>Brands</p>
          {DisplayBrandNames && DisplayBrandNames.map((brand, index) => {
            return <li key={index} id='sidepage-brands-names'>
              <input type="checkbox" id='sidepage-brands-checkbox'
                value={brand}
                checked={SelectedBrands && SelectedBrands.includes(brand)}
                onChange={() => Handlebrandselection(brand)}
              />{brand}</li>
          })}
        </ul>

      </div>
    </>
  )
}

export default SidePage