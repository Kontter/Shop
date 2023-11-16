import React, { useContext, useEffect, useState } from 'react'
import Filters from '../components/Filters';
import GamesList from '../components/GamesList';
import Navbar from '../components/UI/navbar/Navbar';
import { basketContext } from '../context/BasketContext';
import '../Styles/App.scss';
import axios from 'axios'
import  { useGames } from '../hooks/useGames';
import { languagesListContext } from '../context/LanguagesListContext';
import { useFetching } from '../hooks/useFetching';
import Service from '../API/Service';
import { burgerMenuContext } from '../context/BurgerMenuContext';




export default function Shop() {

    const {basket, setBasket, removeGames} = useContext(basketContext)
    const {languagesList, setLanguagesList} = useContext(languagesListContext)
    const {isBurgerActive, setIsBurgerActive} =useContext(burgerMenuContext)
    const [games, setGames] = useState([])
    const [search, setSearch] = useState('')
    const [genre, setGenre] = useState('')
    const [isGenre, setIsGenre] = useState(false)
    const [priceFrom, setPriceFrom] = useState('')
    const [priceTo, setPriceTo] = useState('9999999')
    const [fetching, setFetching] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const sortedAndSearchedAndPriceGames = useGames(games, isGenre, genre, search, setSearch, priceFrom, priceTo, setPriceFrom, setPriceTo)
    const [isCreateGamePopup, setIsCreateGamePopup] = useState(false)
    const [isDeleteGamePopup, setIsDeleteGamePopup] = useState(false)
    const [isDeleteGame, setIsDeleteGame] = useState(false)
    const [gameToDelete, setGameToDelete] = useState({})
    const [isChangeGamePopup, setIsChangeGamePopup] = useState(false)
    const [gameToChange, setGameToChange] = useState({})



    const [adminLibrary, setAdminLibrary] = useState([])
    const [user1Library, setUser1Library] = useState([])
    const [user2Library, setUser2Library] = useState([])
    const [admin, setAdmin] = useState({})
    const [user1, setUser1] = useState({})
    const [user2, setUser2] = useState({})
    const [users, setUsers] = useState([])




    // ЗАГРУЗКА ПОЛЬЗОВАТЕЛЕЙ
    const [fetchUsers, usersError] = useFetching( async () => {
      const users = await Service.getUsers()
        setAdminLibrary(users[0].library)
        setUser1Library(users[1].library)
        setUser2Library(users[2].library)
        setAdmin(users[0])
        setUser1(users[1])
        setUser2(users[2])
        setUsers(users)
    })
    if(usersError) {
      console.log('Ошибка загрузки пользователей:', usersError);
    }


    const fetchGames = async () => {
      const response = await axios.get(`http://localhost:3001/games`)
      setGames(response.data)
    }
    
    useEffect(  () => {
      fetchGames()
      fetchUsers()
    }, [basket])





    // ДОБАВИТЬ НОВУЮ ИГРУ
    const createGame = (newGame) => {
      setGames([newGame, ...games])
      axios.post(`http://localhost:3001/games`, newGame)
      setIsCreateGamePopup(false)
    }



    // (1) УДАЛИТЬ ИГРУ
    const deleteGame = (game, e) => {

      e.stopPropagation()
      setGameToDelete(game)
      setIsDeleteGamePopup(true)
      setIsDeleteGame(true)
    }
    // (2) ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ ИГРЫ
    const confirmDeleteGame = () => {

      if(isDeleteGame) {
        axios.delete(`http://localhost:3001/games/${gameToDelete.id}`)
        setGames(games.filter( g => g.id !== gameToDelete.id))
        setIsDeleteGame(false)
        setIsDeleteGamePopup(false)
        setGameToDelete({})
      } 
    }



    // (1) ИЗМЕНЕНИЕ ИГРЫ
    const changeGame = (game, e) => {

      e.stopPropagation()
      setIsChangeGamePopup(true)
      setGameToChange(game)
    }
    // (2) ПОДТВЕРЖДЕНИЕ ИЗМЕНЕНИЯ ИГРЫ
    const confirmChangeGame = (changedGame) => {

      axios.put(`http://localhost:3001/games/${changedGame.id}`, changedGame)


      for(let i = 0; i < users.length; i++) {
        if(users[i].basket.length > 0) {
          for(let basketIndex = 0; basketIndex < users[i].basket.length; basketIndex++) {
            if(users[i].basket[basketIndex].id === changedGame.id) {
              users[i].basket[basketIndex] = changedGame
              axios.put(`http://localhost:3001/users/${users[i].id}`, users[i])
            }
          }
        }

        if(users[i].library.length > 0) {
          for(let libraryIndex = 0; libraryIndex < users[i].library.length; libraryIndex++) {
            if(users[i].library[libraryIndex].id === changedGame.id) {
              users[i].library[libraryIndex] = changedGame
              axios.put(`http://localhost:3001/users/${users[i].id}`, users[i])
            }
          }
        }
      }

      setIsChangeGamePopup(false)
      setGameToChange({})
      } 

    
  


    // СОРИТРОВКА ПО ЖАНРУ
    const selectedGenre = (genre) => {        
      setGenre(genre)
      setIsGenre(true)
    }

   
    
    // ДОБАВИТЬ ИГРУ В КОРЗИНУ
    const addGames = (game, e) => {

      let isInBasket = false
      let isInLibrary = false
      e.stopPropagation()

      // Проверка наличия игры в корзине
      if(localStorage.getItem('admin')) {
        basket.forEach( g => {
          if( g.id === game.id) {
            return isInBasket = true
          }
          })
      }
      if(localStorage.getItem('user1')) {
        basket.forEach( g => {
          if( g.id === game.id) {
            return isInBasket = true
          }
          })
      }
      if(localStorage.getItem('user2')) {
        basket.forEach( g => {
          if( g.id === game.id) {
            return isInBasket = true
          }
          })
      }





      // Проверка наличия игры в библиотеке
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
          if(localStorage.getItem('admin')) {
            setBasket([game, ...basket])
            setAdmin({...admin, basket: admin.basket.push(game)})
            axios.put(`http://localhost:3001/users/1`, admin)     
          } else if(localStorage.getItem('user1')) {
            setBasket([game, ...basket])
            setUser1({...user1, basket: user1.basket.push(game)})
            axios.put(`http://localhost:3001/users/2`, user1)     
          } else if(localStorage.getItem('user2')) {
            setBasket([game, ...basket])
            setUser2({...user2, basket: user2.basket.push(game)})
            axios.put(`http://localhost:3001/users/3`, user2)     
          }
        } 
      }

  }



    
    // ЖАНРЫ
    const genres = [
        {value: 'all', body: 'Все'},
        {value: 'action', body: 'Экшн'},
        {value: 'stealth', body: 'Стэлс'},
        {value: 'action/RPG', body: 'Экшн/РПГ'},
        {value: 'adventure', body: 'Приключение'},
        {value: 'race', body: 'Гонки'},
    ]

    // ФИЛЬТРЫ
    const filters = {
      search,
      setSearch,
      setPriceFrom,
      priceFrom,
      priceTo,
      setPriceTo,
    }








  return (
    <div 
      onClick={ () => {
        setLanguagesList(false)
        setIsBurgerActive(false)
      }}
      className="App">
      <Navbar/>
      <main>
        <div className="container">
          <Filters
            filters={filters}
            genres={genres}
            selectedGenre={selectedGenre}
          />
          <GamesList 
            gamesList={sortedAndSearchedAndPriceGames} 
            addGames={addGames}
            isCreateGamePopup={isCreateGamePopup} 
            setIsCreateGamePopup={setIsCreateGamePopup} 
            createGame={createGame} 
            deleteGame={deleteGame}
            isDeleteGamePopup={isDeleteGamePopup}
            setIsDeleteGamePopup={setIsDeleteGamePopup}
            setIsDeleteGame={setIsDeleteGame}
            confirmDeleteGame={confirmDeleteGame}
            setGameToDelete={setGameToDelete}
            changeGame={changeGame}
            isChangeGamePopup={isChangeGamePopup}
            gameToChange={gameToChange}
            confirmChangeGame={confirmChangeGame}
            setGameToChange={setGameToChange}
            setIsChangeGamePopup={setIsChangeGamePopup}
            />
        </div>
      </main>
    </div>
  )
}
