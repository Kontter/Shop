import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Link} from "react-router-dom"
import Service from '../API/Service'
import Navbar from '../components/UI/navbar/Navbar'
import { basketContext } from '../context/BasketContext'
import { languagesListContext } from '../context/LanguagesListContext'
import { pay } from '../context/PayContext'
import { useFetching } from '../hooks/useFetching'
import '../Styles//App.scss'
import styles from '../Styles/GameCard.module.scss'
import basketStyles from '../Styles/Basket.module.scss'
import Button from '../components/UI/button/Button'
import { themeContext } from '../context/ThemeContext'
import { burgerMenuContext } from '../context/BurgerMenuContext'
import { useTranslation } from 'react-i18next'




export default function Basket() {


  const {basket, setBasket, removeGames} = useContext(basketContext)
  const {languagesList, setLanguagesList} = useContext(languagesListContext)
  const {isBurgerActive, setIsBurgerActive} =useContext(burgerMenuContext)
  const {darkMode} = useContext(themeContext)
  const {payPage, setPayPage} = useContext(pay)
  const [admin, setAdmin] = useState({})
  const [user1, setUser1] = useState({})
  const [user2, setUser2] = useState({})
  const { t, i18n } = useTranslation()

    



// ЗАГРУЗКА ПОЛЬЗОВАТЕЛЕЙ
const [fetchUsers, usersError] = useFetching( async () => {
  const users = await Service.getUsers()
  setAdmin(users[0])
  setUser1(users[1])
  setUser2(users[2])
})
if(usersError) {
  console.log('Ошибка загрузки пользователей:', usersError);
}




  // удаление игры
  const removeGame = (game, e) => {
    e.stopPropagation()
    if(localStorage.getItem('admin')) {
      setBasket(basket.filter( g => g.id !== game.id))
      axios.put(`http://localhost:3001/users/1`, {...admin, basket: admin.basket.filter( g => g.id !== game.id)})
    }
    if(localStorage.getItem('user1')) {
      setBasket(basket.filter( g => g.id !== game.id))
      axios.put(`http://localhost:3001/users/2`, {...user1, basket: user1.basket.filter( g => g.id !== game.id)})
    }
    if(localStorage.getItem('user2')) {
      setBasket(basket.filter( g => g.id !== game.id))
      axios.put(`http://localhost:3001/users/3`, {...user2, basket: user2.basket.filter( g => g.id !== game.id)})
    }
  }




  let totalPrice = 0

  basket.forEach( game => {
    if( game.price >= 0) 
      return totalPrice += +game.price    // Плюс перед game.price для того, чтобы преобразовать строку в число
  });
  

  // удаление всех игр из корзины
  const removeAllFromBasket = () => {
    if(localStorage.getItem('admin')) {
      setBasket([])
      axios.put(`http://localhost:3001/users/1`, {...admin, basket: []})
    }
    if(localStorage.getItem('user1')) {
      setBasket([])
      axios.put(`http://localhost:3001/users/2`, {...user1, basket: []})
    }
    if(localStorage.getItem('user2')) {
      setBasket([])
      axios.put(`http://localhost:3001/users/3`, {...user2, basket: []})
    }
  }


  
  useEffect( () => {
    fetchUsers()
  }, [basket])

  const router = useNavigate()




  // отправка игры на страницы покупки
  const buyGame = (e, game) => {
    e.stopPropagation()
    basket.forEach( g => {
      if(g.id === game.id)
      return setPayPage([game])
    })
  }


  return (
    <div 
      style={{height: 'calc(100vh - 63px)'}}
      onClick={ () => {
        setIsBurgerActive(false)
        setLanguagesList(false)}
      }
      >
    <Navbar/>
    <main>
      <div className={basketStyles.basket}>
        {basket.length === 0
          ? <h1 className={basketStyles.basket__title} style={darkMode ? {color: '#fff'} : {color: '#000'}}>{t('basketIsEmpty')}</h1>
          : 
            <div style={{marginTop: 20}}>
            <h1 className={basketStyles.basket__title} style={darkMode ? {color: '#fff'} : {color: '#000'}}>{t('basket')}</h1>
            <div className={basketStyles.basket__priceInfo}>
              <span className={basketStyles.basket__totalPrice} style={darkMode ? {color: '#fff'} : {color: '#000'}}>{t('total')}: {totalPrice.toLocaleString()} руб</span>
              <Button
                delete
                onClick={ () => removeAllFromBasket()}
              >
                {t('deleteEverything')}
              </Button>
            </div>
            <div className={basketStyles.basket__games}>

            {basket.map( game => 
              <div onClick={ () => router(`/games/${game.id}`)} key={game.id} className={styles.gameCard}>
                <div className={styles.gameCard__image} style={{backgroundImage: `url(${game.mainImage})`}}
                >
                </div>
                <div className={styles.gameCard__descr}>
                <p className={styles.gameCard__title}>{game.name.length > 20 ? <span>{game.name.slice(0, 16)}...</span> : game.name}</p>
                <div className={styles.gameCard__genres}>
                  {game.genresEn.slice(0,3).map( genre => 
                    <span key={genre.id}>{genre.value.toLowerCase()} </span>
                  )}
                </div>
                <p className={styles.gameCard__price}>{game.price.toLocaleString()} руб</p>
                <div className={basketStyles.basket__btns}>
                  <Link onClick={ (e) => {
                    buyGame(e, game)
                    removeGames(game, e)
                    }} to='/payPage'><Button>{t('buy')}</Button></Link>
                  <Button
                    delete
                    onClick={ (e) => removeGame(game, e)}
                  >
                    {t('delete')}
                  </Button>
                </div>
                </div>
              </div>
            )}
            
            </div>
            </div>
        }
      </div>
    </main>
    </div>
  )
}