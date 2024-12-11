import React, { createContext, useContext, useState } from 'react'

export const SearchContext = createContext()

export function SearchProvider({children}) {

    const [searchQuery, setsearchQuery] = useState('')
  return (
    <>
        <SearchContext.Provider value={{searchQuery, setsearchQuery}}>
            {children}
        </SearchContext.Provider>
    </>
  )
}

export const useSearch = () => useContext(SearchContext)