import React, { useState } from 'react'
import { useCart } from './AddToCart'
import StarRating from './StarRating'
import { Remove } from '@mui/icons-material'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router'

function Cart() {

  const navigate = useNavigate()
  const { cart, removefromcart, addproduct, subtractproduct } = useCart()

  const [selectcheckbox, setselectcheckbox] = useState(true)
  const [Selectalltext, setSelectalltext] = useState('Deselect all')

  // For calculate the quantity and price of items
  const [selectedItems, setselectedItems] = useState(cart.map((item) => item.id))

  const handleProceedtobuy = (e) => {
    e.preventDefault();
    navigate("/Buynow", { state: { selectedItems: cart.filter(item => selectedItems.includes(item.id)) } })
  }

  const handleCheckboxOnchange =(ItemId)=>{
    setselectedItems((prevSelecteditem)=>{
      if(prevSelecteditem.includes(ItemId)){
        return prevSelecteditem.filter((id)=> id !== ItemId)
      }
      else {
        return [...prevSelecteditem, ItemId]
      }
    })
  }

  const handleSelection = () => {
    if (selectcheckbox) {
      setselectedItems([])
      setSelectalltext("Select all")
    }
    else {
      setselectedItems(cart.map((item)=> item.id))
      setSelectalltext("Deselect all")
    }
    setselectcheckbox((prev)=> !prev)
  }

  // Calculate total quantity and total price
  const totalQuantity = cart
    .filter((item) => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cart
    .filter((item) => selectedItems.includes(item.id))
    .reduce(
      (acc, item) =>
        acc +
        Math.round((item.price - (item.discountPercentage / 100) * item.price) * 84.08) * 
        item.quantity,
      0
    );

  return (
    <>
      <div className='cartDiv'>

      {cart && cart.length > 0 ? (
          
          <div className="CartDiv-Rightside">
          <p className='CartDiv-Rightside-Subtotal'>Subtotal({totalQuantity} items): <span>₹{totalPrice.toLocaleString("en-IN")}</span></p>
          <button className='CartDiv-Rightside-btn' onClick={handleProceedtobuy} disabled={selectedItems.length === 0}>Proceed to Buy</button>
        </div>
        
      )
        : ""}

        <div className="CartDiv-Leftside">
          <h5>Shopping Cart</h5>
          {cart && cart.length > 0 ? (
            <>
            <p onClick={handleSelection} className='cardSelectallText' style={{ cursor: "pointer" }}>{Selectalltext}</p>
            <div className='cartDiv-Top-Underline'></div>
            </>
          ) : ""}
          
          {cart && cart.length === 0 ? (<p style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>Oops, you forget to add...</p>) :
            (<div>
              {cart && cart.map((item) => (
                <div className='cartDiv-ProductDiv' key={item.id}>
                  <input type="checkbox" key={item.id}
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxOnchange(item.id)} />
                  <img src={item.thumbnail} alt={item.thumbnail} />

                  <div className='cartDiv-ProductDiv-Info'>
                    <p className='cartDiv-availabilityStatus'>{item.availabilityStatus}</p>
                    <p className='cartDiv-description'>{item.title}</p>
                    <StarRating Rating={item && item.rating} Fontsize='cartDivRatingFont' ID='cartDiv-rating' />

                    <p className='cartDiv-Price'>₹ {Math.round(((item && item.price) - ((item && item.discountPercentage / 100) * (item && item.price))) * 84.08).toLocaleString("en-IN")}</p>
                    <div id='cartDiv-Price-Discount'>
                      <p id='cartDiv-Price-BeforeDiscount'>₹{Math.round((item && item.price) * 84.08).toLocaleString("en-IN")}</p>
                      <p id='cartDiv-Price-DiscountPercentage'>{Math.round(item && item.discountPercentage)}% off</p>
                    </div>

                    <div className="CartBottomItems">
                      <div className="quantityDiv">
                        <div className="minus" onClick={() => subtractproduct(item.id)}>
                          <Remove id="Remove" />
                        </div>
                        <div className="counting">
                          <p>{item.quantity}</p>
                        </div>
                        <div className="add" onClick={() => addproduct(item.id)}>
                          <Add id="Plus" />
                        </div>
                      </div>

                      {/* for delete item */}
                      <div className='CartDelItem' onClick={() => removefromcart(item.id)}>
                        <p>Delete item</p>
                      </div>
                    </div>

                  </div>
                  <div className='cartDiv-Underline'></div>
                </div>
              ))}
            </div>
            )}
        </div>

        

      </div>
    </>
  )
}

export default Cart