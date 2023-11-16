import React from 'react'
import styles from '../Styles/DeleteGamePopup.module.scss'
import Button from '../components/UI/button/Button'

export default function DeleteGamePopup({isDeleteGamePopup, setIsDeleteGamePopup, setIsDeleteGame, confirmDeleteGame, setGameToDelete}) {


    const rootStyles = [styles.popup]
    if(isDeleteGamePopup) {
      rootStyles.push(styles.active)
      document.querySelector('body').classList.add('block-scroll')
    } 

    

  return (
    <div 
      className={rootStyles.join(' ')}
      onClick={ () => {
        setIsDeleteGamePopup(false)
        setIsDeleteGame(false)
        setGameToDelete({})
      }}
    >
      <div 
        className={styles.popup__content}
        onClick={ (e) => e.stopPropagation()}
      >
        <h2 style={{marginBottom: 10}}>Вы уверены что хотите удалить игру из списка?</h2>
        <Button onClick={ () => confirmDeleteGame()} style={{marginRight: 20}}>Удалить</Button>
        <Button 
          onClick={ () => {
            setIsDeleteGamePopup(false)
            setIsDeleteGame(false)
            setGameToDelete({})
          }}
          delete
        >
          Отмена</Button>
      </div>
    </div>
  )
}
