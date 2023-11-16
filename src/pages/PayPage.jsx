import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/UI/navbar/Navbar'
import { pay } from '../context/PayContext'
import styles from '../Styles/GameCard.module.scss'
import {Link, useNavigate} from "react-router-dom"
import stylesPay from '../Styles/PayPage.module.scss'
import  SberLogo from '../images/logo-sberbank-online.png'
import  TinkoffLogo from '../images/logo-tinkoff-bank.png'
import  AlfaLogo from '../images/2422px-Logo_alfa-bank.svg.png'
import  GazpromLogo from '../images/Gazprombank-logotip-01.png'
import axios from 'axios'
import { useFetching } from '../hooks/useFetching'
import Service from '../API/Service'
import Button from '../components/UI/button/Button'
import { themeContext } from '../context/ThemeContext'
import { languagesListContext } from '../context/LanguagesListContext'
import { burgerMenuContext } from '../context/BurgerMenuContext'







export default function PayPage() {


    const router = useNavigate()
    const {payPage, setPayPage} = useContext(pay)
    const {darkMode} = useContext(themeContext)
    const {languagesList, setLanguagesList} = useContext(languagesListContext)
    const {isBurgerActive, setIsBurgerActive} =useContext(burgerMenuContext)
    const [admin, setAdmin] = useState({})
    const [user1, setUser1] = useState({})
    const [user2, setUser2] = useState({})
    const [adminBasket, setAdminBasket] = useState([])
    const [user1Basket, setUser1Basket] = useState([])
    const [user2Basket, setUser2Basket] = useState([])




    // ЗАГРУЗКА ПОЛЬЗОВАТЕЛЕЙ
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

      
    const buyGame = () => {

        if(localStorage.getItem('admin')) {
            setAdminBasket(adminBasket.filter( g => g.id !== payPage[0].id))
            setAdmin({...admin, library: admin.library.push(payPage[0])})
            axios.put(`http://localhost:3001/users/1`, {...admin, basket: admin.basket.filter( game => game.id !== payPage[0].id)})
            setPayPage([])
        } else if(localStorage.getItem('user1')) {
            setUser1Basket(user1Basket.filter( g => g.id !== payPage[0].id))
            setUser1({...user1, library: user1.library.push(payPage[0])})
            axios.put(`http://localhost:3001/users/2`, {...user1, basket: user1.basket.filter( game => game.id !== payPage[0].id)})
            setPayPage([])
        } else if(localStorage.getItem('user2')) {
            setUser2Basket(user2Basket.filter( g => g.id !== payPage[0].id))
            setUser2({...user2, library: user2.library.push(payPage[0])})
            axios.put(`http://localhost:3001/users/3`, {...user2, basket: user2.basket.filter( game => game.id !== payPage[0].id)})
            setPayPage([])
        }
    }

    
    useEffect( () => {
        fetchUsers()
    }, [])
   


    
  return (
    <>
        <Navbar/>
        {payPage.length === 1 
        ?
            <main>
                <div className={stylesPay.payPage__block} onClick={ () => {
                        setLanguagesList(false)
                        setIsBurgerActive(false)
                    }}>
                    <div className={stylesPay.payPage}>
                        <div className={stylesPay.payPage__gameCard}>
                            {payPage.map( game => 
                                <div key={game.id} onClick={ () => router(`/games/${game.id}`)} className={styles.gameCard}>
                                    <p className={styles.gameCard__image} style={{backgroundImage: `url(${game.mainImage})`}}
                                    >
                                    </p>
                                    <div className={styles.gameCard__descr}>
                                        <p className={styles.gameCard__title}>{game.name.length > 30 ? <span>{game.name.slice(0, 31)}...</span> : game.name}</p>
                                        <div className={styles.gameCard__genres}>
                                            {game.genresEn.slice(0,3).map( genre => 
                                            <span key={genre.id}>{genre.value.toLowerCase()} </span>
                                            )}
                                        </div>
                                    <p className={styles.gameCard__price}>{game.price.toLocaleString()} руб</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={stylesPay.payPage__payBlock}>
                            <h1 className={stylesPay.payPage__title} style={darkMode ? {color: '#fff'} : {color: '#000'}}>Способы оплаты</h1>
                            <div> 
                                <form className={stylesPay.payPage__form}>

                                    <div className={stylesPay.payPage__cardPay}>
                                        <input defaultChecked type='radio' name='pay' value='Тинькоф' id='Тинькоф'/>
                                        <label htmlFor='Тинькоф'><img src={TinkoffLogo} alt="" /></label>
                                    </div>

                                    <div className={stylesPay.payPage__cardPay}>
                                        <input type='radio' name='pay' value='Сбербанк' id='Сбербанк'/>
                                        <label htmlFor='Сбербанк'><img src={SberLogo} alt="" /></label>
                                    </div>

                                    <div className={stylesPay.payPage__cardPay}>
                                        <input type='radio' name='pay' value='Альфа-банк' id='Альфа-банк'/>
                                        <label htmlFor='Альфа-банк'><img src={AlfaLogo} alt="" /></label>
                                    </div>

                                    <div className={stylesPay.payPage__cardPay}>
                                        <input type='radio' name='pay' value='Газпромбанк' id='Газпромбанк'/>
                                        <label htmlFor='Газпромбанк'><img src={GazpromLogo} alt="" /></label>
                                    </div>

                                </form>
                                <Link onClick={ () => buyGame()} to='/library'><Button style={{margin: '0 auto', display: 'block'}}>Оплатить</Button></Link>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        : 
            <main>
                <div className={stylesPay.payPage__block} onClick={ () => setLanguagesList(false)}>
                    <h1 className={stylesPay.payPage__titleClear} style={darkMode ? {color: '#fff'} : {color: '#000'}}>Вы ничего не покупаете</h1>
                </div>
            </main>
        }
    </>
  )
}
