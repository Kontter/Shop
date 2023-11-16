import React, { useContext, useState } from 'react'
import styles from './Dropdown.module.scss'

export default function Dropdown({dropdownActive, setDropdownActive, dropdownValue, setDropdownValue, sortComments, arrowActive, setArrowActive}) {

    const options = ['Последние', 'Первые', 'Отрицательные', 'Положительные']

 

    const rootStylesLeft = [styles.dropdown__spanLeft]
    const rootStylesRight = [styles.dropdown__spanRight]
    if(arrowActive) {
        rootStylesLeft.push(styles.active)
        rootStylesRight.push(styles.active)
    }


  return (
    <div 
        className={styles.dropdown} 
        onClick={ (e) => {
            e.stopPropagation()
            if(dropdownActive) {
              setDropdownActive(false)
              setArrowActive(false)
            } else {
              setDropdownActive(true)
              setArrowActive(true)
            }
        }}
    >
      <div className={styles.dropdown__Btn}>
        {dropdownValue}
        <div className={styles.dropdown__arrow}>
            <span className={rootStylesLeft.join(' ')}></span>
            <span className={rootStylesRight.join(' ')}></span>
        </div>
      </div>
      {dropdownActive &&
        <div className={styles.dropdown__content}>
            <div>
                {options.map( option =>
                    <div 
                        className={styles.dropdown__item} 
                        key={option} 
                        onClick={ (e) => {
                            e.stopPropagation() 
                            setDropdownValue(e.target.textContent)
                            sortComments(e.target.textContent)
                            setArrowActive(false)
                            setDropdownActive(false)}
                    }>
                        {option}
                    </div>
                )}
            </div>
        </div>
      }
    </div>
  )
}
