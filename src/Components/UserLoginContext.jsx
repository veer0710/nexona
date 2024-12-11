import React, { createContext, useContext, useState } from 'react'

export const UserLoginContext = createContext()

export function UserLoginContextProvider({children}) {
    const [loggedInUser, setloggedInUser] = useState(localStorage.getItem('loggedInUser'))
  return (
    <>
    <UserLoginContext.Provider value={{loggedInUser, setloggedInUser}}>
        {children}
    </UserLoginContext.Provider>
    </>
  )
}

export const useUserLoginContext =()=> useContext(UserLoginContext)