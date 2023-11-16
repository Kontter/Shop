import React, { createContext, useState } from 'react'



export const burgerMenuContext = createContext()



export default function BurgerMenuContext({children}) {

    const [isBurgerActive, setIsBurgerActive] = useState(false)
    const value = {
        isBurgerActive,
        setIsBurgerActive
    }

  return (
    <burgerMenuContext.Provider value={value}>{children}</burgerMenuContext.Provider>
  )
}
