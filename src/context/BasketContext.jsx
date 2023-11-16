import React, { createContext, useState } from 'react'


  export const basketContext = createContext()

export default function BasketContext({children}) {

    const [basket, setBasket] = useState([])
    const removeGames = (game, e) => {
        e.stopPropagation()
        setBasket(basket.filter( g => g.id !== game.id))
    }

    const dataBasket = {
        basket,
        setBasket,
        removeGames
    }

  return (
    <basketContext.Provider value={dataBasket}>{children}</basketContext.Provider>
  )
}
