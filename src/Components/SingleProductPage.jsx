import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import StarRating from './StarRating'
import ReturnOrder from './returnOrder.png'
import Shipping from './shipping.png'
import Warranty from './warranty.png'
import { AccountCircle } from '@mui/icons-material'
import { useCart } from './AddToCart'
import { useBuynow } from './BuynowContext'
import { Link } from 'react-router-dom'
import SingleProductSlider from './SingleProductSlider'

function SingleProductPage() {

    const { productId } = useParams()
    const [product, setProduct] = useState(null)
    const [MainImage, setMainImage] = useState('')

    const { addtocart } = useCart()

    const { Buynow, addtobuynow } = useBuynow()

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/${productId}`)
            .then((response) => {
                setProduct(response.data);
                setMainImage(response.data && response.data.images[0])
            })
            .catch((error) => console.error("Error fetching product:", error));
    }, [productId])

    if (!product) return <p>Loading...</p>

    const handleBuynow = (e) => {
        if (Buynow && Buynow.length > 0) {
            alert('You can only have one product in checkout page or you can add this product to your cart')

        }
        else {
            addtobuynow(product)
        }
    }

    return (
        <>
            <div className="singleproductpage">
                <div className="Imagesofsingleproductpage">

                    <div className='sideimagesDiv'>
                        {product && product.images && product.images.map((img, index) => {
                            return <div className="Image1" key={index}>
                                <img
                                    src={img}
                                    alt="productImage"
                                    id='sideimagesDivImage'
                                    className='sideimagesDivImage1'
                                    onClick={() => setMainImage(img)}
                                />
                            </div>
                        })}

                    </div>

                    <div className='singleproductpage-mainImage'>
                        <img src={MainImage} alt="" id='MainImageDivImage' />
                    </div>

                </div>

                {/* Product Info */}
                <div className='singleproductpage-productInfo'>
                    <p id='singleproductpage-productInfo-Brand-Name'>
                        {(product && product.brand) ? product.brand : "Unknown"}</p>
                    <p className='singleproductpage-productInfo-description'>{product && product.description}</p>

                    <div className="SingleProductSlider">
                        <SingleProductSlider
                            ProductImages={product && product}
                            />
                    </div>

                    <div id='singleproductpage-productInfo-div'>
                        <p id='singleproductpage-productInfo-Price'>
                            ₹ {Math.round(((product && product.price)
                                - ((product && product.discountPercentage / 100)
                                    * (product && product.price))) * 84.08).toLocaleString("en-IN")}</p>
                        <p id='singleproductpage-productInfo-Price-BeforeDiscount'>
                            ₹{Math.round((product && product.price) * 84.08).toLocaleString("en-IN")}</p>
                        <p id='singleproductpage-productInfo-Price-DiscountPercentage'>
                            {Math.round(product && product.discountPercentage)}% off</p>
                    </div>

                    <div className='singleproductpage-productInfo-Rating'>
                        <p className='singleproductpage-RatingInNumbers'>{product && product.rating ? Math.floor(product.rating * 10) / 10 : "No Rating"}</p>
                        <StarRating Rating={product && product.rating}
                            Fontsize='SingleProductStarRatingFontSize' ID="singleproductpage-Rating-stars" />
                        <p className='singleproductpage-reviews'>{product && product.reviews && (product.reviews).length} reviews and</p>
                        {product && product.reviews && (
                            <p className='singleproductpage-reviews'>{product.reviews.filter(review => review.rating !== undefined).length} ratings</p>
                        )}
                    </div>

                    <p id='AvailabilityStatus'>{product && product.availabilityStatus}</p>
                    <div className="facilitiesIcons">
                        <div>
                            <img src={ReturnOrder} alt={ReturnOrder} id='IconDescription' />
                            <p>{product && product.returnPolicy}</p>
                        </div>

                        <div>
                            <img src={Shipping} alt={Shipping} id='IconDescription' />
                            <p>{product && product.shippingInformation}</p>
                        </div>

                        <div>
                            <img src={Warranty} alt={Warranty} id='IconDescription' />
                            <p>{product && product.warrantyInformation}</p>
                        </div>

                    </div>

                    {/* Add to cart button */}

                    <div className="Add-To-Cart-div">

                        <div key={product.id} className='Add-To-Cart-btn' onClick={(e) => {
                            e.preventDefault();
                            addtocart(product)
                        }}>
                            <p>Add to Cart</p>
                        </div>

                        <Link to='/Buynow' className='BuyNow-btnLink'>
                            <div key={product.id} className='BuyNow-btn' onClick={handleBuynow}>
                                <p>Buy now</p>
                            </div>
                        </Link>
                    </div>

                    {/* Accordion start */}
                    <div id='Accordion-underline'></div>
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    Product Details
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <p>Width: {product && product.dimensions && product.dimensions.width} cm</p>
                                    <p>Height: {product && product.dimensions && product.dimensions.height} cm</p>
                                    <p>Depth: {product && product.dimensions && product.dimensions.depth} cm</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id='Accordion-underline'></div>
                    {/* Accordion end */}

                    {/* Ratings and reviews start */}
                    <div className='ratings-reviews-div'>
                        <p className='ratings-reviews-heading'>Ratings and Reviews</p>

                        {/* First user comment */}
                        <div className='ratings-reviews-userDiv'>
                            <div className='ratings-reviews-user'>
                                <div className='ratings-reviews-UserDPandName'>
                                    <AccountCircle id="ratings-reviews-icon" />
                                    <p id='ratings-reviews-userName'>{product && product.reviews[0] && product.reviews[0].reviewerName}</p>
                                </div>

                                <div>
                                    <p id='ratings-reviews-date'>{product && product.reviews[0] && (product.reviews[0].date).slice(0, 10)}</p>
                                </div>
                            </div>

                            <div className='ratings-reviews-commentDiv'>
                                <p id='ratings-reviews-rating'>{product && product.reviews[0] && product.reviews[0].rating}</p>
                                <p id='ratings-reviews-comment'>{product && product.reviews[0] && product.reviews[0].comment}</p>
                            </div>
                        </div>
                        <div id='ratings-reviews-Underline'></div>

                        {/* Second user comment */}
                        <div className='ratings-reviews-userDiv'>
                            <div className='ratings-reviews-user'>
                                <div className='ratings-reviews-UserDPandName'>
                                    <AccountCircle id="ratings-reviews-icon" />
                                    <p id='ratings-reviews-userName'>{product && product.reviews[1] && product.reviews[1].reviewerName}</p>
                                </div>

                                <div>
                                    <p id='ratings-reviews-date'>{product && product.reviews[1] && (product.reviews[1].date).slice(0, 10)}</p>
                                </div>
                            </div>

                            <div className='ratings-reviews-commentDiv'>
                                <p id='ratings-reviews-rating'>{product && product.reviews[1] && product.reviews[1].rating}</p>
                                <p id='ratings-reviews-comment'>{product && product.reviews[1] && product.reviews[1].comment}</p>
                            </div>
                        </div>
                        <div id='ratings-reviews-Underline'></div>

                        {/* Second user comment */}
                        <div className='ratings-reviews-userDiv'>
                            <div className='ratings-reviews-user'>
                                <div className='ratings-reviews-UserDPandName'>
                                    <AccountCircle id="ratings-reviews-icon" />
                                    <p id='ratings-reviews-userName'>{product && product.reviews[2] && product.reviews[2].reviewerName}</p>
                                </div>

                                <div>
                                    <p id='ratings-reviews-date'>{product && product.reviews[2] && (product.reviews[2].date).slice(0, 10)}</p>
                                </div>
                            </div>

                            <div className='ratings-reviews-commentDiv'>
                                <p id='ratings-reviews-rating'>{product && product.reviews[2] && product.reviews[2].rating}</p>
                                <p id='ratings-reviews-comment'>{product && product.reviews[2] && product.reviews[2].comment}</p>
                            </div>
                        </div>
                        <div id='ratings-reviews-Underline'></div>

                    </div>
                </div>

            </div>


        </>
    )
}

export default SingleProductPage