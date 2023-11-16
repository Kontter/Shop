import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Service from '../API/Service'
import Navbar from '../components/UI/navbar/Navbar'
import { burgerMenuContext } from '../context/BurgerMenuContext'
import { languagesListContext } from '../context/LanguagesListContext'
import { themeContext } from '../context/ThemeContext'
import { useFetching } from '../hooks/useFetching'
import styles from '../Styles/GameCard.module.scss'
import stylesLibrary from '../Styles/LibraryPage.module.scss'
import { useTranslation } from 'react-i18next'

export default function LibraryPage() {


    const router = useNavigate()
    const { t, i18n } = useTranslation()
    const {darkMode} = useContext(themeContext)
    const {languagesList, setLanguagesList} = useContext(languagesListContext)
    const {isBurgerActive, setIsBurgerActive} =useContext(burgerMenuContext)

    const [adminLibrary, setAdminLibrary] = useState([])
    const [user1Library, setUser1Library] = useState([])
    const [user2Library, setUser2Library] = useState([])
    const [libraryGames, setLibraryGames] = useState([])

    const [admin, setAdmin] = useState([])
    const [user1, setUser1] = useState([])
    const [user2, setUser2] = useState([])

    

    useEffect( () => {
        if(localStorage.getItem('admin')) {
            setLibraryGames(adminLibrary)
        }
        if(localStorage.getItem('user1')) {
            setLibraryGames(user1Library)
        }
        if(localStorage.getItem('user2')) {
            setLibraryGames(user2Library)
        }

    }, [user2Library])



    // ЗАГРУЗКА ПОЛЬЗОВАТЕЛЕЙ
    const [fetchUsers, usersError] = useFetching( async () => {
        const users = await Service.getUsers()
        setAdminLibrary(users[0].library)
        setUser1Library(users[1].library)
        setUser2Library(users[2].library)
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


    useEffect( () => {

        if(localStorage.getItem('admin')) {
            if(libraryGames.length < adminLibrary.length) {
                fetchUsers()
            }
        }
        if(localStorage.getItem('user1')) {
            if(libraryGames.length < user1Library.length) {
                fetchUsers()
            }
        }
        if(localStorage.getItem('user2')) {
            if(libraryGames.length < user2Library.length) {
                fetchUsers()
            }
        }

    },[libraryGames]) 


    // УДАЛЕНИЕ ИГРЫ ИЗ БИБЛИОТЕКИ
    const deleteGame = (game, e) => {
        e.stopPropagation()
        setLibraryGames(libraryGames.filter( g => g.id !== game.id))

        if(localStorage.getItem('admin')) {
            axios.put(`http://localhost:3001/users/1`, {...admin, library: admin.library.filter( g => g.id !== game.id)})
        }
        if(localStorage.getItem('user1')) {
            axios.put(`http://localhost:3001/users/2`, {...user1, library: user1.library.filter( g => g.id !== game.id)})
        }
        if(localStorage.getItem('user2')) {
            axios.put(`http://localhost:3001/users/3`, {...user2, library: user2.library.filter( g => g.id !== game.id)})
        }
    }


  return (
    <div
        style={{height: 'calc(100vh - 63px)'}}
        onClick={ () => {
            setLanguagesList(false)
            setIsBurgerActive(false)
        }}
    >
        <Navbar/>
        <main>
            <div className={stylesLibrary.library}>
                <h1 className={stylesLibrary.library__title} style={darkMode ? {color: '#fff'} : {color: '#000'}}>{t('library')}</h1>
                <div className={stylesLibrary.library__games}> 

                    {libraryGames.map( game => 
                            <div key={game.id}  onClick={ () => router(`/games/${game.id}`)} className={styles.gameCard}>
                                <button className={styles.gameCard__deleteBtn} onClick={ (e) => deleteGame(game, e)}><span/><span/></button>
                                <p className={styles.gameCard__image} style={{backgroundImage: `url(${game.mainImage})`}}
                                >
                                </p>
                                <p className={styles.gameCard__descr}>
                                    <p className={styles.gameCard__title}>{game.name.length > 30 ? <span>{game.name.slice(0, 31)}...</span> : game.name}</p>
                                    <p className={styles.gameCard__genres}>
                                        {game.genresEn.slice(0,3).map( genre => 
                                        <span key={genre.id}>{genre.value.toLowerCase()} </span>
                                        )} 
                                    </p>
                                </p>
                            </div>
                        )}
                </div>
            </div>
        </main>
    </div>
  )
}
