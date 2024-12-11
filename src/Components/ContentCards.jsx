import React from 'react'
import { Link } from 'react-router-dom'
import StarRating from './StarRating'
import { FavoriteBorder } from '@mui/icons-material'
import { Favorite } from '@mui/icons-material'
import { useWishlist } from './WishlistContext'

function ContentCards(props) {
  
  let FilterData = props.filteredProducts
  const { wishlist, toggleWishlistItem } = useWishlist();
  
  
  return (
    <>
      <div className="content">
        <div className='content-cards'>

          {FilterData && FilterData.map((apidata) => {
            const isInWishlist = wishlist ? wishlist.some((item) => item.id === apidata.id) : false;
            return (
            <Link key={apidata.id} to={`/SingleProductPage/${apidata.id}`}>
              <div className='content-card'>

                <img src={apidata && apidata.thumbnail} alt="Product" />
                <div className="Like-btnDiv" onClick={(e) => {
                  e.preventDefault(); // Prevents link navigation on click
                  toggleWishlistItem(apidata); // Toggles product in the wishlist
                }}>{isInWishlist ? <Favorite className='red-heart LikeBtn'/> : <FavoriteBorder className='LikeBtn'/>}
                </div>

                <div className='content-card-info' >
                  <p id='Product-Brand-Name'>{(apidata && apidata.brand) ? apidata.brand : "Unknown"}</p>
                  <p id='Product-Name'>{apidata && apidata.title && ((apidata.title).length > 18) ? (apidata.title.slice(0, 18) + "...") : apidata.title}</p>

                  <div id='StarRating-div'>
                    <StarRating Rating={apidata && apidata.rating} Fontsize='StarRatingFontSize' ID='content-card-rating' />
                    <p>{apidata && apidata.availabilityStatus}</p>
                  </div>

                  <p id='Product-Price'>₹ {Math.round(((apidata && apidata.price) - ((apidata && apidata.discountPercentage / 100) * (apidata && apidata.price))) * 84.08).toLocaleString("en-IN")}</p>
                  <div id='Product-Price-div'>
                    <p id='Product-Price-BeforeDiscount'>₹{Math.round((apidata && apidata.price) * 84.08).toLocaleString("en-IN")}</p>
                    <p id='Product-Price-DiscountPercentage'>{Math.round(apidata && apidata.discountPercentage)}% off</p>
                  </div>

                </div>
              </div>
            </Link>
            );
})}

        </div>
      </div>
    </>
  );
}

export default ContentCards