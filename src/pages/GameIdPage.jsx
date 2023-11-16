import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/UI/navbar/Navbar'
import styles from '../Styles/GameIdPage.module.scss'
import {basketContext} from '../context/BasketContext'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../Styles/Slider.css'
import CommentPopup from '../components/CommentPopup'
import { useTranslation } from 'react-i18next'
import { languageContext } from '../context/LanguageContext'
import { languagesListContext } from '../context/LanguagesListContext'
import { ReactComponent as AccountIcon} from '../images/account_circle_FILL0_wght400_GRAD0_opsz48.svg'
import Dropdown from '../components/UI/dropdown/Dropdown'
import Spoilers from '../components/UI/spoilers/Spoilers'
import { useFetching } from '../hooks/useFetching'
import Service from '../API/Service'
import Button from '../components/UI/button/Button'
import Comments from '../components/UI/comments/Comments'
import { themeContext } from '../context/ThemeContext'
import { burgerMenuContext } from '../context/BurgerMenuContext'







export default function GameIdPage() {

  const params = useParams()
  const [game, setGame] = useState({})
  const [comments, setComments] = useState([])
  const [price, setPrice] = useState(0)
  const [isCommentPopup, setIsCommentPopup] =useState(false)
  const [typeOfComment, setTypeOfComment] = useState('') // false- отрицательный коммент, true- положительный коммент
  const [dropdownActive, setDropdownActive] = useState(false)
  const [dropdownValue, setDropdownValue] = useState('Сортировка')
  const [arrowActive, setArrowActive] = useState(false)
  const [fetchingByScroll, setFetchingByScroll] = useState(true)
  const [currentPage, setCurrentPage] = useState(2)
  const [showMore, setShowMore] = useState(false)

  const {basket, setBasket, removeGames} = useContext(basketContext)
  const {darkMode} = useContext(themeContext)
  const {isBurgerActive, setIsBurgerActive} =useContext(burgerMenuContext)


  const [adminLibrary, setAdminLibrary] = useState([])
  const [user1Library, setUser1Library] = useState([])
  const [user2Library, setUser2Library] = useState([])
  const [isInLibrary, setIsInLibrary] = useState(false)
  const [admin, setAdmin] = useState({})
  const [user1, setUser1] = useState({})
  const [user2, setUser2] = useState({})



  

    // ЗАГРУЗКА ИНФОРМАЦИИ ОБ ИГРЕ
    const [fetchGame, gameError] = useFetching( async (id) => {
      const game = await Service.getGameById(id)
      setGame(game)
    })


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


  
    // ДОБАВЛЕНИЕ ИГРЫ В КОРЗИНУ
    const addGame = (game) => {
  
      let isInBasket = false
      let isInLibrary = false
  
      basket.forEach( g => {
      if( g.id === game.id) {
          return isInBasket = true
      }
      })
  
  
      // проверка наличия игры в корзине
      if(localStorage.getItem('admin')) {
        adminLibrary.forEach( g => {
          if(g.id === game.id) {
            return isInLibrary = true
          }
        })
      }
      if(localStorage.getItem('user1')) {
        user1Library.forEach( g => {
          if(g.id === game.id) {
            return isInLibrary = true
          }
        })
      }
      if(localStorage.getItem('user2')) {
        user2Library.forEach( g => {
          if(g.id === game.id) {
            return isInLibrary = true
          }
        })
      }
  
  
  
      if(isInLibrary) {
        return
      } else {
        if(!isInBasket) {
          setBasket([game, ...basket])
          if(localStorage.getItem('admin')) {
            setAdmin({...admin, basket: admin.basket.push(game)})
            axios.put(`http://localhost:3001/users/1`, admin)     
          } else if(localStorage.getItem('user1')) {
            setUser1({...user1, basket: user1.basket.push(game)})
            axios.put(`http://localhost:3001/users/2`, user1)     
          } else if(localStorage.getItem('user2')) {
            setUser2({...user2, basket: user2.basket.push(game)})
            axios.put(`http://localhost:3001/users/3`, user2)     
          }
        }
      }
    }
  
  
  
  
  
  // ПРОВЕРКА НАЛИЧИЯ ИГРЫ В БИБЛИОТЕКЕ
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



    // ЗАГРУЗКА КОММЕНТАРИЕВ
    const [fetchComments, commentsError] = useFetching( async () => {
      const comments = await Service.getComments()
      setComments(comments)             
    })
  


    // ДОБАВЛЕНИЕ КОММЕНТАРИЯ
    const addComment = (comment) => {
      setIsCommentPopup(false)
      setComments([comment, ...comments])
      axios.post(`http://localhost:3001/comments`, comment)
    }
  
  

//                                               КОММЕНТАРИИ С ФИЛЬТРАМИ ОДНОГО ПРИНЯТОГО МАССИВА


    // СОРТИРОВКА КОММЕНТАРИЕВ
    const sortComments = (sort) => {
      if(sort === 'Последние') {
        setNumberOfLastComment(0)
        setComments(comments.sort((a,b) => b["dateSort"].localeCompare(a["dateSort"])))
      } else if(sort === 'Первые') {
        setNumberOfLastComment(0)
        setComments(comments.sort((a,b) => a["dateSort"].localeCompare(b["dateSort"])))
      } else if(sort === 'Отрицательные') {
        setNumberOfLastComment(0)
        SortedNegativeComments()
      } else if(sort === 'Положительные') {
        setNumberOfLastComment(0)
        SortedPositiveComments()
      }
    }
  

    // отображение положительных комментариев
    const SortedPositiveComments = async () => {
      const response = await axios.get(`http://localhost:3001/comments`)
      setComments(response.data.filter( comm => comm.positiveComment === 'positive'))
    }

    // отображение отрицательных комментариев
    const SortedNegativeComments = async () => {
      const response = await axios.get(`http://localhost:3001/comments`)
      setComments(response.data.filter( comm => comm.negativeComment === 'negative'))
    }




    const [numberOfLastComment, setNumberOfLastComment] = useState(0)

    // ПОДГРУЗКА КОММЕНТАРИЕВ
    useEffect( () => {
      if(fetchingByScroll) {  
        
        setNumberOfLastComment( prevCount => prevCount + 3)
        setFetchingByScroll(false)
      }  
    }, [fetchingByScroll])



    // ОТСЛЕЖИВАНИЕ СКРОЛЛА
    useEffect( () => {
      document.addEventListener('scroll', scrollHandler)
      return function () {
        document.removeEventListener('scroll', scrollHandler)
      }
    }, [])

    const scrollHandler = (e) => {
      if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && comments.length < 100)   {
        setFetchingByScroll(true)
      }
    }




  useEffect( () => {
    fetchGame(params.id)
    fetchComments()
    fetchUsers()
    window.scrollTo(0, 0)
  }, [])




// СЛАЙДЕР
const settings = {
  arrows: true,
  dots: true, 
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 1000,
  autoplay: true,
  waitForAnimate: false,
  autoplaySpeed: 4000,
  pauseOnFocus: true,
  pauseOnHover: true,
  pauseOnDotsHover: true,
  centerMode: false,
  variableWidth: false, 
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
      }
    },
  ]
};



  if(isCommentPopup) {
     document.querySelector('body').classList.add('block-scroll')
  } else {
    document.querySelector('body').classList.remove('block-scroll')
  }






  const rootStyleslimitedDescription = [styles.gameIdPage__descrBlock__limitedDescription]
  const rootStyleslimiterDescription = [styles.gameIdPage__descrBlock__limiterDescription]


  if(showMore) {
    rootStyleslimitedDescription.push(styles.active)
    rootStyleslimiterDescription.push(styles.active)
  }


  const { t } = useTranslation()


  const { enLanguage, selectEnLanguage, ruLanguage, selectRuLanguage, deLanguage, selectDeLanguage,} = useContext(languageContext)
  const {languagesList, setLanguagesList} = useContext(languagesListContext)






  return (
    <div
      onClick={ () => {
        setLanguagesList(false)
        setDropdownActive(false)
        setArrowActive(false)
        setIsCommentPopup(false)
        setIsBurgerActive(false)
      }}
    >
    <Navbar/>
    {gameError 
      ? 
        <h1 style={{marginTop: 58, textAlign: 'center', color: 'red'}}>Ошибка загрузки игры: {gameError}</h1>
      : 
        <main className={styles.gameIdPage} style={darkMode ? {color: '#fff', backgroundColor: 'transparent'} : {color: '#000'}}>
          <div className={styles.gameIdPage__mainInfoBlock}>
            <div className={styles.gameIdPage__leftBlock}>
              <img className={styles.gameIdPage__mainImage} src={game.mainImage} alt="Изображение игры" />
              <h2 className={styles.gameIdPage__price}>{Number(game.price).toLocaleString()} руб</h2>
              {isInLibrary 
                ?
                  <h2>{t('alreadyBought')}</h2>
                :
                  <Button
                    onClick={ () => {
                      addGame(game)
                      checkLibrary(game)
                    }}
                  >
                    {t('addToBasket')}
                  </Button>
              }
            </div>

            <div className={styles.gameIdPage__descrBlock}>
              <h1>{game.name}</h1>
              <p className={styles.gameIdPage__releaseDate}>{game.releaseDate}</p>
              <div className={rootStyleslimitedDescription.join(' ')}>
                <p className={styles.gameIdPage__descr1}>{ruLanguage ? <p>{game.RuDescription1}</p> : <>{enLanguage ? <p>{game.EnDescription1}</p> : <p>{game.DeDescription1}</p>}</>}</p>
                {game.RuDescription2 &&
                  <p className={styles.gameIdPage__descr2}>{ruLanguage ? <p>{game.RuDescription2}</p> : <>{enLanguage ? <p>{game.EnDescription2}</p> : <p>{game.DeDescription2}</p>}</>}</p>
                }
                <div className={rootStyleslimiterDescription.join(' ')}></div>
                <Button onClick={ () => setShowMore(true)}>Развернуть</Button>
              </div>

        

              <div className={styles.gameIdPage__infoBlock} style={darkMode ? {borderTop: '1px solid #fff', borderBottom: '1px solid #fff'} : {borderTop: '1px solid #000', borderBottom: '1px solid #000'}}>

                <div className={styles.gameIdPage__infoBlockItem}>
                  <p>{t('releaseDate')}:</p>
                  {ruLanguage ? <p>{game.RuReleaseDateCorrect}</p> : <>{enLanguage ? <p>{game.EnReleaseDateCorrect}</p> : <p>{game.DeReleaseDateCorrect}</p>}</>}
                </div>

                <div className={styles.gameIdPage__infoBlockItem}>
                  <p>{t('platforms')}:</p>
                  <p>{game.platforms}</p>
                </div>

                <div className={styles.gameIdPage__infoBlockItem}>
                  <p>{t('genres')}:</p>
                  <div style={{width: '100%'}}>
                    <span>{game.genre1}</span>
                    {game.genre2 &&
                    <span>, {game.genre2}</span>
                    }
                    {game.genre3 &&
                    <span>, {game.genre3}</span>
                    }
                    {game.genre4 &&
                    <span>, {game.genre4}</span>
                    }
                  </div>
                </div>

                <div className={styles.gameIdPage__infoBlockItem}>
                  <p>{t('publisher')}:</p>
                  <p>{game.publisher}</p>
                </div>

                <div className={styles.gameIdPage__infoBlockItem}>
                  <p>{t('developer')}:</p>
                  <p>{game.developer}</p>
                </div>

              </div>
            </div>
          </div>


          <div className={styles.gameIdPage__secondInfoBlock}>
            <div className={styles.gameIdPage__systemRequirements}>
              <h3 className={styles.gameIdPage__systemRequirementsTitle}>{t('minimumSystemRequirements')}</h3>

              <div className={styles.gameIdPage__systemRequirementsItem}>
                <p>{t('operatingSystem')}</p>
                <p>{game.minOperatingSystem}</p>
              </div>

              <div className={styles.gameIdPage__systemRequirementsItem}>
                <p>{t('processor')}</p>
                <p>{game.minProcessor}</p>
              </div>

              <div className={styles.gameIdPage__systemRequirementsItem}>
                <p>{t('graphics')}</p>
                <p>{game.minGraphics}</p>
              </div>

              <div className={styles.gameIdPage__systemRequirementsItem}>
                <p>{t('memory')}</p>
                <p>{game.minMemory}</p>
              </div>

              <div className={styles.gameIdPage__systemRequirementsItem}>
                <p>{t('hardDrive')}</p>
                <p>{game.minStorage}</p>
              </div>

            </div>


            <div className={styles.gameIdPage__systemRequirements}>
              <h3 className={styles.gameIdPage__systemRequirementsTitle}>{t('recommendedSystemRequirements')}</h3>

              <div className={styles.gameIdPage__systemRequirementsItem}>
                <p>{t('operatingSystem')}</p>
                <p>{game.recOperatingSystem}</p>
              </div>

              <div className={styles.gameIdPage__systemRequirementsItem}>
                <p>{t('processor')}</p>
                <p>{game.recProcessor}</p>
              </div>

              <div className={styles.gameIdPage__systemRequirementsItem}>
                <p>{t('graphics')}</p>
                <p>{game.recGraphics}</p>
              </div>

              <div className={styles.gameIdPage__systemRequirementsItem}>
                <p>{t('memory')}</p>
                <p>{game.recMemory}</p>
              </div>

              <div className={styles.gameIdPage__systemRequirementsItem}>
                <p>{t('hardDrive')}</p>
                <p>{game.recStorage}</p>
              </div>
      
            </div>

                

            <Slider {...settings} className='slider'>
              <div className='slider__item'>
                <img src={game.image1} alt="" />
              </div>
              <div className='slider__item'>
                <img src={game.image2} alt="" />
              </div>
              <div className='slider__item'>
                <img src={game.image3} alt="" />
              </div>
              <div className='slider__item'> 
                <img src={game.image4} alt="" />
              </div>
            </Slider>


            <Spoilers/>




            <h1 style={{marginBottom: 15}}>{t('comments')}:</h1>

            <Button onClick={ (e) => {
              e.stopPropagation()
              setIsCommentPopup(true)} 
            }
              style={{marginBottom: 50}}>{t('writeComment')}</Button>
            {isCommentPopup && 
              <CommentPopup
                setIsCommentPopup={setIsCommentPopup}
                isCommentPopup={isCommentPopup}
                addComment={addComment}
                setTypeOfComment={setTypeOfComment}
                typeOfComment={typeOfComment}
              />
            }

            <Dropdown
              dropdownActive={dropdownActive}
              setDropdownActive={setDropdownActive}
              dropdownValue={dropdownValue}
              setDropdownValue={setDropdownValue}
              sortComments={sortComments}
              arrowActive={arrowActive}
              setArrowActive={setArrowActive}
            />
            {commentsError
              ? 
                <h1 style={{textAlign: 'center', color: 'red'}}>Ошибка загрузки комментариев: {commentsError}</h1>
              :
                <Comments
                  comments={comments}
                  numberOfLastComment={numberOfLastComment}
                  darkMode={darkMode}
                />
            }
          </div>
          

          
        </main>
    }
    </div>
  )
}