import React, { createContext, useState } from 'react'


    export const pay = createContext()


export default function PayContext({children}) {


    const [payPage, setPayPage] = useState([])


    const value= {
        payPage,
        setPayPage
    }

  return (
    <pay.Provider value={value}>{children}</pay.Provider>
  )
}
