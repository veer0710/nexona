import React from 'react'
import { useWishlist } from './WishlistContext'
import StarRating from './StarRating'
import { useCart } from './AddToCart'

function Wishlist() {

  const { wishlist, removeFromWishlist } = useWishlist()
  const {addtocart} = useCart()
  return (
    <>
      <div className='wishlistDiv'>
        <h5>My Wishlist</h5>
        {wishlist && wishlist.length === 0 ? (<p style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>Oops, you forget to add...</p>) :
          (<div>
            {wishlist && wishlist.map((item) => (
              <div className='wishlistDiv-ProductDiv' key={item.id}>
                <img src={item.thumbnail} alt={item.thumbnail} />

                <div className='wishlistDiv-ProductDiv-Info'>
                  <p className='wishlistDiv-availabilityStatus'>{item.availabilityStatus}</p>
                  <p className='wishlistDiv-description'>{item.description}</p>
                  <StarRating Rating={item && item.rating} Fontsize="16px" ID='wishlistDiv-rating' />

                  <p className='wishlistDiv-Price'>₹ {Math.round(((item && item.price) - ((item && item.discountPercentage / 100) * (item && item.price))) * 84.08).toLocaleString("en-IN")}</p>
                  <div id='wishlistDiv-Price-Discount'>
                    <p id='wishlistDiv-Price-BeforeDiscount'>₹{Math.round((item && item.price) * 84.08).toLocaleString("en-IN")}</p>
                    <p id='wishlistDiv-Price-DiscountPercentage'>{Math.round(item && item.discountPercentage)}% off</p>
                  </div>

                  {/* for move to cart and delete the item */}
                  <div className="MTC-Del">
                    <div className='MoveToCart'
                      onClick={(e) => {
                        e.preventDefault();
                        addtocart(item)
                      }}>
                      <p>Move to cart</p>
                    </div>

                    <div className='DeleteItemDiv'
                      onClick={() => removeFromWishlist(item.id)}>
                      <p>Delete this item</p>
                    </div>
                  </div>

                </div>


                <div className='wishlistDiv-Underline'></div>
              </div>
            ))}
          </div>
          )}
      </div>
    </>
  )
}

export default Wishlist