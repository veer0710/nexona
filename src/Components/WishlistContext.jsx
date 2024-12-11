import React, { createContext, useContext, useState } from 'react'

export const WishlistContext = createContext() 

export function WishlistProvider({children}) {
    const [wishlist, setWishlist] = useState([])

    const toggleWishlistItem = (product) => {
        setWishlist((prevWishlist) =>
          prevWishlist.some((item) => item.id === product.id) // It will check the product whether it is in wishlist or not
            ? prevWishlist.filter((item) => item.id !== product.id) // It will remove the product from wishlist
            : [...prevWishlist, product] // It will add the product in wishlist
        );
      };

      const addToWishlist = (product)=>{
        setWishlist((prevWishlist)=>{
          if(!prevWishlist.some((item) => item.id === product.id)){
            return [...prevWishlist, product]
          }
          else{
            return prevWishlist;
          }
        })
      }

      const removeFromWishlist = (productId) => {
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
      };

  return (
    <>
    <WishlistContext.Provider value={{wishlist, toggleWishlistItem, removeFromWishlist, addToWishlist}}>
        {children}
    </WishlistContext.Provider>
    </>
  )
}

export const useWishlist = () => useContext(WishlistContext)