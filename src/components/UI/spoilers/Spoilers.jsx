import React, { useState } from 'react'
import styles from './Spoilers.module.scss'

export default function Spoilers() {


    

    const [isSpoiler1, setIsSpoiler1] = useState(false)
    const rootStylesAnswer1 = [styles.gameIdPage__answer1]
    if(isSpoiler1) {
      rootStylesAnswer1.push(styles.active)
    }
  
    const [isSpoiler2, setIsSpoiler2] = useState(false)
    const rootStylesAnswer2 = [styles.gameIdPage__answer2]
    if(isSpoiler2) {
      rootStylesAnswer2.push(styles.active)
    }
  
    const [isSpoiler3, setIsSpoiler3] = useState(false)
    const rootStylesAnswer3 = [styles.gameIdPage__answer3]
    if(isSpoiler3) {
      rootStylesAnswer3.push(styles.active)
    }
  
    const [isSpoiler4, setIsSpoiler4] = useState(false)
    const rootStylesAnswer4 = [styles.gameIdPage__answer4]
    if(isSpoiler4) {
      rootStylesAnswer4.push(styles.active)
    }
  
 



  return (
    <>
    <div className={styles.gameIdPage__spoilers}>
        <div 
            className={styles.gameIdPage__question}
            onClick={ () => {isSpoiler1 ? setIsSpoiler1(false) : setIsSpoiler1(true)}}
        >
            <h2>Вопрос1</h2>
        </div>
        <div className={rootStylesAnswer1.join(' ')}>
            <h2>Ответ1</h2>
        </div>


        <div 
            className={styles.gameIdPage__question}
            onClick={ () => {isSpoiler2 ? setIsSpoiler2(false) : setIsSpoiler2(true)}}
        >
            <h2>Вопрос2</h2>
        </div>
        <div className={rootStylesAnswer2.join(' ')}>
            <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, quae modi ipsa ipsam libero nihil provident iure cum praesentium, ab id impedit iste dicta odio ipsum dolorum aliquid in nemo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur veritatis voluptatibus alias ea facere saepe commodi minus officiis in error! Pariatur omnis recusandae nobis, odit aliquid aliquam maxime dignissimos labore?</h2>
        </div>


        <div 
            className={styles.gameIdPage__question}
            onClick={ () => {isSpoiler3 ? setIsSpoiler3(false) : setIsSpoiler3(true)}}
        >
            <h2>Вопрос3</h2>
        </div>
        <div className={rootStylesAnswer3.join(' ')}>
            <h2>Ответ3</h2>
        </div>


        <div 
            className={styles.gameIdPage__question}
            onClick={ () => {isSpoiler4 ? setIsSpoiler4(false) : setIsSpoiler4(true)}}
        >
            <h2>Вопрос4</h2>
        </div>
        <div className={rootStylesAnswer4.join(' ')}>
            <h2>Ответ4</h2>
        </div>
    </div>


    </>
  )
}
