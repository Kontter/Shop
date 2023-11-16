import React from 'react'
import AuthContext from '../context/AuthContext'
import BasketContext from '../context/BasketContext'
import BurgerMenuContext from '../context/BurgerMenuContext'
import LanguageContext from '../context/LanguageContext'
import LanguagesListContext from '../context/LanguagesListContext'
import PayContext from '../context/PayContext'
import ThemeContext from '../context/ThemeContext'

export default function Contexts({children}) {
  return (
    <>
    <BurgerMenuContext>
     <PayContext>
        <AuthContext>
          <LanguagesListContext>
            <LanguageContext>
              <ThemeContext>
                  <BasketContext>
                    {children}
                  </BasketContext>
              </ThemeContext>
            </LanguageContext>
          </LanguagesListContext>
        </AuthContext>
    </PayContext>
  </BurgerMenuContext>
  </>
  )
}
