import React, { createContext, useEffect, useState } from 'react'


export const languageContext = createContext()

export default function LanguageContext({children}) {


    const [enLanguage, setEnLanguage] = useState(false)
    const [ruLanguage, setRuLanguage] = useState(true)
    const [deLanguage, setDeLanguage] = useState(false)

    const selectEnLanguage = () => {
        if(!localStorage.getItem('enLanguage')) {
            localStorage.removeItem('ruLanguage')
            localStorage.removeItem('deLanguage')
            localStorage.setItem('enLanguage', 'true')
            setRuLanguage(false)
            setDeLanguage(false)
            setEnLanguage(true)
        } else {
            setEnLanguage(true)
            setRuLanguage(false)
            setDeLanguage(false)
        }
    }

    const selectRuLanguage = () => {
        if(!localStorage.getItem('ruLanguage')) {
            localStorage.removeItem('enLanguage')
            localStorage.removeItem('deLanguage')
            localStorage.setItem('ruLanguage', 'true')
            setDeLanguage(false)
            setEnLanguage(false)
            setRuLanguage(true)
        } else {
            setRuLanguage(true)
            setDeLanguage(false)
            setEnLanguage(false)
        }
    }

    const selectDeLanguage = () => {
        if(!localStorage.getItem('deLanguage')) {
            localStorage.removeItem('ruLanguage')
            localStorage.removeItem('enLanguage')
            localStorage.setItem('deLanguage', 'true')
            setRuLanguage(false)
            setEnLanguage(false)
            setDeLanguage(true)
        } else {
            setDeLanguage(true)
            setRuLanguage(false)
            setEnLanguage(false)
        }
    }



    useEffect( () => {
        if(localStorage.getItem('enLanguage')) {
            setDeLanguage(false)
            setRuLanguage(false)
            setEnLanguage(true)
        }
        if(localStorage.getItem('ruLanguage')) {
            setDeLanguage(false)
            setEnLanguage(false)
            setRuLanguage(true)
        }
        if(localStorage.getItem('deLanguage')) {
            setEnLanguage(false)
            setRuLanguage(false)
            setDeLanguage(true)
        }
    }, [])



    const value = {
        enLanguage,
        selectEnLanguage,
        ruLanguage,
        selectRuLanguage,
        deLanguage,
        selectDeLanguage,
    }

  return (
    <languageContext.Provider value={value}>{children}</languageContext.Provider>
  )
}
