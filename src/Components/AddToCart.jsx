import React, { createContext, useContext, useState } from 'react'

export const AddtoCartContext = createContext()
export function AddToCart({children}) {

    const [cart, setcart] = useState([]);

    const addtocart = (product) => {
        setcart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                // If product already in cart, increase its quantity
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // If product is new, add it with initial quantity of 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removefromcart = (product)=>{
        setcart((prevcart)=> prevcart.filter((item) => item.id !== product))
    }

    const addproduct = (product)=>{
        setcart((prevcart)=> 
            prevcart && prevcart.map((item)=> item.id === product ? {...item, quantity: item.quantity + 1} : item))
    }

    const subtractproduct = (product)=>{
        setcart((prevcart)=> 
            prevcart && prevcart.map((item)=> item.id === product ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item))
    }
  return (
    <>
    <AddtoCartContext.Provider value={{cart, addtocart, removefromcart, addproduct, subtractproduct}}>
        {children}
    </AddtoCartContext.Provider>

    </>
  )
}

export const useCart = ()=> useContext(AddtoCartContext)