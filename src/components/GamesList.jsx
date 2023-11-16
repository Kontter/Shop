import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../context/AuthContext'
import styles from '../Styles/GamesList.module.scss'
import AddGamePopup from './AddGamePopup'
import ChangeGamePopup from './ChangeGamePopup'
import DeleteGamePopup from './DeleteGamePopup'
import GameCard from './GameCard'
import Button from '../components/UI/button/Button'
import { ReactComponent as ViewListIcon } from '../images/view_list.svg'
import { ReactComponent as ViewFlexIcon } from '../images/view_flex.svg'
import { useTranslation } from 'react-i18next'



export default function GamesList({
    gamesList, 
    addGames, 
    isCreateGamePopup, 
    setIsCreateGamePopup, 
    createGame, 
    deleteGame, 
    isDeleteGamePopup, 
    setIsDeleteGamePopup, 
    setIsDeleteGame, 
    confirmDeleteGame, 
    setGameToDelete,
    changeGame,
    isChangeGamePopup,
    gameToChange,
    confirmChangeGame,
    setGameToChange,
    setIsChangeGamePopup,
    library
    }) 

  {


  const {adminAuth, setAdminAuth, user1Auth, setUser1Auth, user2Auth, setUser2Auth} = useContext(authContext)
  const [isViewCard, setIsViewCard] = useState(false)
  const { t, i18n } = useTranslation()

  const changeViewCard = () => {
    if(isViewCard) {
      setIsViewCard(false)
      localStorage.removeItem('viewCard')
    } else {
      setIsViewCard(true)
      localStorage.setItem('viewCard', 'true')
    }
  }


  useEffect( () => {
    if(localStorage.getItem('viewCard')) {
      setIsViewCard(true)
    }
  }, [])
    

  return (
    <div className={styles.gamesList}>
      {adminAuth &&
        <>
          <Button
            style={{margin: '58px auto 0', display: 'block'}}
            onClick={ () => setIsCreateGamePopup(true)}
          >
            {t('addGame')}
          </Button>

          <AddGamePopup
            isCreateGamePopup={isCreateGamePopup}
            setIsCreateGamePopup={setIsCreateGamePopup}
            createGame={createGame}
          />
          <ChangeGamePopup
            isChangeGamePopup={isChangeGamePopup}
            gameToChange={gameToChange}
            confirmChangeGame={confirmChangeGame}
            setGameToChange={setGameToChange}
            setIsChangeGamePopup={setIsChangeGamePopup}
          />
          <DeleteGamePopup
            isDeleteGamePopup={isDeleteGamePopup}
            setIsDeleteGamePopup={setIsDeleteGamePopup}
            setIsDeleteGame={setIsDeleteGame}
            confirmDeleteGame={confirmDeleteGame}
            setGameToDelete={setGameToDelete}
          />
        </>
      }
      <div 
            className={styles.gamesList__viewBlock}
            onClick={ () => changeViewCard()}
            >
            <span className={styles.gamesList__viewBlockBackground} style={ isViewCard ? {left: 0} : {right: 0}}></span>
            <ViewListIcon className={styles.gamesList__listIcon}/>
            <ViewFlexIcon className={styles.gamesList__flexIcon}/>
      </div>
      <div className={styles.gamesList__content}>
        {gamesList.map( game =>
          <GameCard 
            addGames={addGames} 
            key={game.id} 
            game={game} 
            deleteGame={deleteGame} 
            changeGame={changeGame}
            library={library}
          />
        )}
      </div>
    </div>
  )
}
