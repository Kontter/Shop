import React, { useContext, useEffect, useState } from 'react'
import styles from './Navbar.module.scss'
import {Link} from "react-router-dom"
import { basketContext } from '../../../context/BasketContext'
import { themeContext } from '../../../context/ThemeContext'
import { ReactComponent as DarkIcon} from '../../../images/dark_mode_FILL0_wght400_GRAD0_opsz48.svg'
import { ReactComponent as LightIcon} from '../../../images/light_mode_FILL0_wght400_GRAD0_opsz48.svg'
import { ReactComponent as LanguagesIcon } from '../../../images/language_FILL0_wght200_GRAD0_opsz48.svg'
import { useTranslation } from 'react-i18next'
import { languageContext } from '../../../context/LanguageContext'
import LanguagesList from '../../LanguagesList'
import { languagesListContext } from '../../../context/LanguagesListContext'
import { authContext } from '../../../context/AuthContext'
import { useFetching } from '../../../hooks/useFetching'
import Service from '../../../API/Service'
import Button from '../button/Button'
import { burgerMenuContext } from '../../../context/BurgerMenuContext'




export default function Navbar() {

  const {basket, setBasket, removeGames} = useContext(basketContext)  
  const {darkMode, changeTheme} = useContext(themeContext)
 

  const {languagesList, setLanguagesList} = useContext(languagesListContext)
  const { enLanguage, selectEnLanguage, ruLanguage, selectRuLanguage, deLanguage, selectDeLanguage,} = useContext(languageContext)
  const {adminAuth, setAdminAuth, user1Auth, setUser1Auth, user2Auth, setUser2Auth} = useContext(authContext)
  const {isBurgerActive, setIsBurgerActive} =useContext(burgerMenuContext)
  const [adminBasket, setAdminBasket] = useState([])
  const [user1Basket, setUser1Basket] = useState([])
  const [user2Basket, setUser2Basket] = useState([])
  const [admin, setAdmin] = useState({})
  const [user1, setUser1] = useState({})
  const [user2, setUser2] = useState({})
  const [currentUser, setCurrentUser] = useState('')




  useEffect( () => {
    if(localStorage.getItem('admin')) {
      setBasket(adminBasket)
      setCurrentUser(admin)
    }
    if(localStorage.getItem('user1')) {
      setBasket(user1Basket)
      setCurrentUser(user1)
    }
    if(localStorage.getItem('user2')) {
      setBasket(user2Basket)
      setCurrentUser(user2)
    }
  },[admin, user1, user2])



const [fetchUsers, usersError] = useFetching( async () => {
  const users = await Service.getUsers()
  setAdminBasket(users[0].basket)
  setUser1Basket(users[1].basket)
  setUser2Basket(users[2].basket)
  setAdmin(users[0])
  setUser1(users[1])
  setUser2(users[2])
})
if(usersError) {
  console.log('Ошибка загрузки пользователей:', usersError);
}



  useEffect( () => {
    fetchUsers()
  }, [])





  const { t, i18n } = useTranslation()

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  const SelectEnLanguage = (language) => {
    changeLanguage(language)
    selectEnLanguage()
  }

  const SelectRuLanguage = (language) => {
    changeLanguage(language)
    selectRuLanguage()
  }

  const SelectDeLanguage = (language) => {
    changeLanguage(language)
    selectDeLanguage()
  }

  

  const openAndCloseLanguagesList = (e) => {
    e.stopPropagation()
    setLanguagesList(!languagesList)
  }



  const logOut = () => {
    localStorage.removeItem('admin')
    setAdminAuth(false)
    localStorage.removeItem('user1')
    setUser1Auth(false)
    localStorage.removeItem('user2')
    setUser2Auth(false)
  }



  const rootStyleHeaderMenu = [styles.header__menu]
  const rootStyleBurgerMenu = [styles.header__burgerMenu]

  if(isBurgerActive) {
    rootStyleHeaderMenu.push(styles.active)
    rootStyleBurgerMenu.push(styles.active)
    document.querySelector('body').classList.add('block-scroll')
  } else {
    document.querySelector('body').classList.remove('block-scroll')
  }





  return (
    <header onClick={ () => setIsBurgerActive(false)}>
      <nav
        onClick={ () => setLanguagesList(false)} 
        className={styles.header__navbar}>

        <div className={styles.header__user}>
          <Button onClick={ () => logOut()} style={{marginRight: 20}} delete>{t('logOut')}</Button>
          <h2>{currentUser.user}</h2>
        </div>

        <div className={rootStyleHeaderMenu.join(' ')}>
          <Link className={styles.header__link} to='/shop'>{t('store')}</Link>
          <Link className={styles.header__link} to='/basket'>
            <span className={styles.header__basket}>{t('basket')}
              <span className={styles.header__basketTotalCount}>{basket.length}</span>
            </span>
          </Link>
          <Link className={styles.header__link} to='/library'>{t('library')}</Link>


          <div 
            onClick={ (e) => openAndCloseLanguagesList(e)}
            className={styles.header__languagesBlock}  
            style={{cursor: 'pointer'}}
          >
            <LanguagesIcon/>
            {languagesList &&
              <LanguagesList
                SelectEnLanguage={SelectEnLanguage}
                SelectRuLanguage={SelectRuLanguage}
                SelectDeLanguage={SelectDeLanguage}
              />
            }
          </div>


          <div 
            onClick={ (e) => {
              e.stopPropagation()
              changeTheme()
              setLanguagesList(false)
              }}
            className={styles.header__themeIcons}
          >
            <span 
              className={styles.header__iconsBackground}
              style={ darkMode ? {right: 4} : {left: 4}}
            >
            </span>
            <LightIcon 
              className={styles.header__lightIcon} 
              style={ darkMode ? {fill: 'black'} : {fill: 'white'}}
            />
            <DarkIcon 
              className={styles.header__darkIcon} 
              style={ darkMode ? {fill: 'white'} : {fill: 'black'}}
            />
          </div>         
        </div>

        <div 
          className={rootStyleBurgerMenu.join(' ')} 
          onClick={ (e) => {
            e.stopPropagation()
            setIsBurgerActive(!isBurgerActive)}
          }
            >
          <span></span>
        </div>


      </nav>
    </header>
  )
}
