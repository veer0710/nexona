import React, { useEffect, useState } from 'react'
import { useBuynow } from './BuynowContext'
import { useCart } from './AddToCart'
import { useLocation, useNavigate } from 'react-router'
import { Remove } from '@mui/icons-material'
import { Add } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function Buynow() {

    const navigate = useNavigate()
    const { state } = useLocation()

    const { Buynow, removebuynow, setBuynow, Buynowaddproduct, Buynowsubtractproduct } = useBuynow()
    const { addtocart } = useCart()

    const [BuynowselectedItems, setBuynowselectedItems] = useState([])
    const [BuynowSelectCheckbox, setBuynowSelectCheckbox] = useState(true)
    const [SelectAllText, setSelectAllText] = useState("Select all")

    const HandleSelection = () => {
        if (BuynowSelectCheckbox) {
            setBuynowselectedItems([])
            setSelectAllText("Select all")
        }
        else {
            setBuynowselectedItems(Buynow.map((item) => item.id))
            setSelectAllText("Deselect all")
        }
        setBuynowSelectCheckbox((prev) => !prev)
    }

    const handlecheckboxOnchange = (productID) => {
        setBuynowselectedItems((prevSelectedItem) => {
            if (prevSelectedItem.includes(productID)) {
                return prevSelectedItem.filter((id) => id !== productID)
            }
            else {
                return [...prevSelectedItem, productID]
            }
        })
    }

    const totalPrice = Buynow
        .filter((item) => BuynowselectedItems.includes(item.id))
        .reduce(
            (acc, item) =>
                acc +
                Math.round((item.price - (item.discountPercentage / 100) * item.price) * 84.08) *
                item.quantity,
            0
        ).toLocaleString();

    const DiscountedValue = Buynow
        .filter((item) => BuynowselectedItems.includes(item.id))
        .reduce(
            (acc, item) =>
                acc +
                Math.round((item.price * 84.08) -
                    ((item.price - (item.discountPercentage / 100) * item.price) * 84.08)) *
                item.quantity,
            0
        ).toLocaleString();

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setBuynow([])
        alert("Thank you for placing a delivery order at Nexona! We are preparing your order now. We'll let you know when it's on the way")
        navigate('/')
    }

    useEffect(() => {
        if (state && state.selectedItems) {
            setBuynow(state.selectedItems); // Initialize Buynow with passed data
        }
    }, [state, setBuynow]);
    return (
        <>
            <div className="BuynowBegin">

            {Buynow && Buynow.length > 0 ? (
                    <div className='BuynowProductBill'>
                        <h4>Order Summary</h4>
                        <div className="BuynowUnderline"></div>
                        <div className="BuynowBillingPrice">
                            <p>Items</p>
                            <p>₹{totalPrice}</p>
                        </div>
                        <div className='BuynowBillingDiscount'>
                            <p>Discount</p>
                            <p>₹{DiscountedValue}</p>
                        </div>
                        <div className="BuynowDeliveryCharges">
                            <p>Delivery Charges</p>
                            <p className='BuynowDeliveryChargesFree'><span>₹70</span> Free</p>
                        </div>
                        <div className="DottedUnderline"></div>
                        <div className="TotalAmount">
                            <p>Order Total</p>
                            <p>₹{totalPrice}</p>
                        </div>
                        <div className="DottedUnderline"></div>
                        <div className="BuynowYouwillSave">
                            <p>You will save ₹{DiscountedValue} on this order</p>
                        </div>

                        <div className="BillPlaceOrderDiv">
                            <button className="BillPlaceOrder" onClick={handlePlaceOrder} >
                                <p>Place Order</p>
                            </button>
                            <div className="BillPlaceOrderTotalTextDiv">
                                <p className="BillPlaceOrderDescText">By placing your order, you agree to Nexona's <Link>privacy</Link> notice and <Link>conditions</Link> of use.</p>
                            </div>

                        </div>

                    </div>

                )
                    : ""}

                <div className="BuynowData">
                    <h4>Checkout</h4>
                    {Buynow && Buynow.length > 0 ? (
                        <div className='BuynowSelectALL'>
                            <p onClick={HandleSelection}>{SelectAllText}</p>
                            <div className="BuynowCheckoutUnderline"></div>
                        </div>
                    )
                        : ""}
                    {Buynow && Buynow.map((product) => {
                        return <>
                            <div className="BuynowProductInfoandDelivery">
                                <input className='Buynowinputselect' type="checkbox" key={product.id}
                                    checked={BuynowselectedItems.includes(product.id)}
                                    onChange={() => handlecheckboxOnchange(product.id)}
                                />
                                <img src={product.thumbnail} className='Buynowimg' alt='' />
                                <div className='BuynowProductInfo'>
                                    <p className='BuynowDesc'>{product.description && (product.description).length > 60 ? (product.description).slice(0, 60) + '...' : product.description}</p>
                                    <p className='BuynowBrand'>{(product && product.brand) ? product.brand : "Unknown"}</p>
                                    <p className='BuynowBuyPrice'>₹ {Math.round(((product && product.price)
                                        - ((product && product.discountPercentage / 100)
                                            * (product && product.price))) * 84.08).toLocaleString("en-IN")}</p>
                                    <div className="BuynowPrice">
                                        <p className='BuynowOriginalPrice'>₹{Math.round((product && product.price) * 84.08).toLocaleString("en-IN")}</p>
                                        <p className='Buynowdiscount'>{Math.round(product && product.discountPercentage)}% off</p>
                                    </div>
                                    <div className="BuynowDeleteAddtoCart">

                                        {/* For quantity */}
                                        <div className="BuynowquantityDiv">
                                            <div className="Buynowminus" onClick={() => Buynowsubtractproduct(product.id)}>
                                                <Remove id="BuynowRemove" />
                                            </div>
                                            <div className="Buynowcounting">
                                                <p>{product.quantity}</p>
                                            </div>
                                            <div className="Buynowadd" onClick={() => Buynowaddproduct(product.id)}>
                                                <Add id="BuynowPlus" />
                                            </div>
                                        </div>

                                        <button className="BuynowAddtocartbtn" onClick={() => addtocart(product)}>Add to Cart</button>
                                        <button className="BuynowDeletebtn" onClick={() => removebuynow(product.id)}>Remove</button>
                                    </div>
                                </div>

                                <div className="BuynowDelivery">
                                    <p className='BunowDeliveryDay'>Delivery by 11 PM, Tomorrow |</p>
                                    <p className='BuynowFreeDelivery'><span>₹70</span> Free</p>
                                </div>
                            </div>


                        </>
                    })}

                    {Buynow && Buynow.length > 0 ? (
                        <div className="PlaceOrderDiv">
                        <button className="PlaceOrder" onClick={handlePlaceOrder} >
                            <p>Place Order</p>
                        </button>
                        <div className="PlaceOrderTotalTextDiv">
                            <p className="PlaceOrderTotalText">Order Total: ₹{totalPrice}</p>
                            <p className='PlaceOrderDescText'>By placing your order, you agree to Nexona's <Link>privacy</Link> notice and <Link>conditions</Link> of use.</p>
                        </div>
                    </div>
                    )
                : ""}

                </div>


                

            </div>
        </>
    )
}

export default Buynow