import React, { createContext, useContext, useState } from 'react'

export const CreateBuynowContext = createContext()
export function BuynowContext({children}) {

    const [Buynow, setBuynow] = useState([])

    const addtobuynow =(product)=>{
        setBuynow((prevproduct)=>{
            const existingProduct = prevproduct.find((item) => item.id === product.id);
            if (!Array.isArray(prevproduct)) prevproduct = [];
            else if (existingProduct) {
                // If product already in cart, increase its quantity
                return prevproduct.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // If product is new, add it with initial quantity of 1
                return [...prevproduct, { ...product, quantity: 1 }];
            }
        })
    }

    // const removebuynow =(productId)=>{
    //     setBuynow((prevproduct)=>{
    //         prevproduct.filter((item)=> item.id !== productId)
    //     })
    // }
    const removebuynow = (productId) => {
        setBuynow((prevProduct) => {
            if (!Array.isArray(prevProduct)) {
                console.error("Buynow is not an array:", prevProduct);
                return [];
            }
            else{
                return prevProduct.filter((item) => item.id !== productId);
            }
            
        });
    };
    

    const Buynowaddproduct=(product)=>{
        setBuynow((prevproduct)=> prevproduct && prevproduct.map((item)=> item.id === product ? {...item, quantity: item.quantity + 1} : item))
    }

    const Buynowsubtractproduct=(product)=>{
        setBuynow((prevproduct)=> prevproduct && prevproduct.map((item)=> item.id === product ? {...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item))
    }

  return (
    <>
    <CreateBuynowContext.Provider value={{Buynow, setBuynow, addtobuynow, removebuynow, Buynowaddproduct, Buynowsubtractproduct}}>
        {children}
    </CreateBuynowContext.Provider>
    </>
  )
}

export const useBuynow =()=> useContext(CreateBuynowContext)