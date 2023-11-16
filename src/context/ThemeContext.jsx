import React, { createContext, useEffect, useState } from 'react'

export const themeContext = createContext()


export default function ThemeContext({children}) {


const [darkMode, setDarkMode] = useState(false)


const isDarkMode = useEffect( () => {
    if(localStorage.getItem('darkMode')) {
        setDarkMode(true)
    } else {
        setDarkMode(false)
    }
}, [])



const changeTheme = () => {
  if(localStorage.getItem('darkMode')) {
    localStorage.removeItem('darkMode')
    setDarkMode(false)
  } else {
    localStorage.setItem('darkMode', 'true')
    setDarkMode(true)
  }
}


const body = document.querySelector('body')
  
if(darkMode) {
  body.classList.add('darkMode')
} else {
  body.classList.remove('darkMode')
}



const value = {
    darkMode,
    changeTheme
}

  return (
    
    <themeContext.Provider value={value}>{children}</themeContext.Provider>
  )
}
