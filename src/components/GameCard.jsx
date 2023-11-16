import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../Styles/GameCard.module.scss'
import { ReactComponent as EditGame } from '../images/edit_FILL0_wght400_GRAD0_opsz48.svg'
import { ReactComponent as Basket } from '../images/add_shopping_cart_FILL0_wght400_GRAD0_opsz48.svg'
import { authContext } from '../context/AuthContext'
import Button from '../components/UI/button/Button'
import Service from '../API/Service'
import { useFetching } from '../hooks/useFetching'
import { useTranslation } from 'react-i18next'




export default function GameCard({game, addGames, deleteGame, changeGame, library,}) {

  const router = useNavigate()
  const {adminAuth, setAdminAuth, user1Auth, setUser1Auth, user2Auth, setUser2Auth} = useContext(authContext)
  const [isInLibrary, setIsInLibrary] = useState(false)
  const { t, i18n } = useTranslation()



  const [adminLibrary, setAdminLibrary] = useState([])
  const [user1Library, setUser1Library] = useState([])
  const [user2Library, setUser2Library] = useState([])
  


// ЗАГРУЗКА ПОЛЬЗОВАТЕЛЕЙ
const [fetchUsers, usersError] = useFetching( async () => {
  const users = await Service.getUsers()
  setAdminLibrary(users[0].library)
  setUser1Library(users[1].library)
  setUser2Library(users[2].library)
})
if(usersError) {
  console.log('Ошибка загрузки пользователей:', usersError);
}


  // проверка наличия игры в библиотеке
  const checkLibrary = (game) => {

    if(localStorage.getItem('admin')) {
      adminLibrary.forEach( g => {
        if( g.id === game.id) {
          return setIsInLibrary(true)
        }
        })
    }
    if(localStorage.getItem('user1')) {
      user1Library.forEach( g => {
        if( g.id === game.id) {
          return setIsInLibrary(true)
        }
        })
    }
    if(localStorage.getItem('user2')) {
      user2Library.forEach( g => {
        if( g.id === game.id) {
          return setIsInLibrary(true)
        }
        })
    }
  }



  useEffect( () => {
    fetchUsers()
  }, [])







const rootStyleGameCard = [styles.gameCard]
const rootStyleGameCard__image = [styles.gameCard__image]
const rootStyleGameCard__descr = [styles.gameCard__descr]
const rootStyleGameCard__descrFirst = [styles.gameCard__descrFirst]
const rootStyleGameCard__title = [styles.gameCard__title]
const rootStyleGameCard__genres = [styles.gameCard__genres]
const rootStyleGameCard__descrSecond = [styles.gameCard__descrSecond]
const rootStyleGameCard__price = [styles.gameCard__price]
const rootStyleGameCard__cartIcon = [styles.gameCard__cartIcon]

if(localStorage.getItem('viewCard')) {
  rootStyleGameCard.push(styles.view)
  rootStyleGameCard__image.push(styles.view)
  rootStyleGameCard__descr.push(styles.view)
  rootStyleGameCard__descrFirst.push(styles.view)
  rootStyleGameCard__title.push(styles.view)
  rootStyleGameCard__genres.push(styles.view)
  rootStyleGameCard__descrSecond.push(styles.view)
  rootStyleGameCard__price.push(styles.view)
  rootStyleGameCard__cartIcon.push(styles.view)
}



  
  return (
    <div onClick={ () => router(`/games/${game.id}`)} className={rootStyleGameCard.join(' ')}>
    {adminAuth &&
      <>
        <button className={styles.gameCard__editBtn}>
          <EditGame
            className={styles.gameCard__editBtnPencil}
            onClick={ (e) => changeGame(game, e)}
          />
        </button>
        <button className={styles.gameCard__deleteBtn} onClick={ (e) => deleteGame(game, e)}><span/><span/></button>
      </>
    }
    <div className={rootStyleGameCard__image.join(' ')} style={{backgroundImage: `url(${game.mainImage})`}}>
    </div>
    <div className={rootStyleGameCard__descr.join(' ')}>
      <div className={rootStyleGameCard__descrFirst.join(' ')}>
        <p className={rootStyleGameCard__title.join(' ')}>{game.name.length > 20 ? <span>{game.name.slice(0, 20)}...</span> : game.name}</p>
        <div className={rootStyleGameCard__genres.join(' ')}>
          {game.genresEn.slice(0,3).map( genre => 
            <span key={genre.id}>{genre.value.toLowerCase()} </span>
          )}
        </div>
      </div>
      <div className={rootStyleGameCard__descrSecond.join(' ')}>
        <p className={rootStyleGameCard__price.join(' ')}>{Number(game.price).toLocaleString()} руб</p>
        {isInLibrary  
          ?
            <h2>{t('alreadyBought')}</h2>
          : 
            <Button
              style={{width: '100%'}}
              onClick={ (e) => {
                addGames(game, e)
                checkLibrary(game)
              }}
            >
              <Basket className={rootStyleGameCard__cartIcon.join(' ')}/>
              {t('addToBasket')}
            </Button>
        }
      </div>
    </div>
  </div>
  )
}
