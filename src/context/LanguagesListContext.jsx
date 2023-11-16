import React, { useState } from 'react'
import { createContext } from 'react'


export const languagesListContext = createContext()

export default function LanguagesListContext({children}) {

    const [languagesList, setLanguagesList] = useState(false)

    const value = {
        languagesList,
        setLanguagesList
    }

  return (
    <languagesListContext.Provider value={value}>{children}</languagesListContext.Provider>
  )
}
