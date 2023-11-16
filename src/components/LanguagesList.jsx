import React, { useContext } from 'react'
import russianFlag from '../images/russia-flag.png'
import englishFlag from '../images/GB-flag.png'
import germanFlag from '../images/german-flag.png'
import styles from '../Styles/LanguagesList.module.scss'
import { languageContext } from '../context/LanguageContext'






export default function LanguagesList({SelectEnLanguage, SelectRuLanguage, SelectDeLanguage}) {


  const { enLanguage, selectEnLanguage, ruLanguage, selectRuLanguage, deLanguage, selectDeLanguage,} = useContext(languageContext)

  const rootStylesRu = [styles.languagesList__card]
  const rootStylesEn = [styles.languagesList__card]
  const rootStylesDe = [styles.languagesList__card]

  if(ruLanguage) {
    rootStylesRu.push(styles.active)
  }
  if(enLanguage) {
    rootStylesEn.push(styles.active)
  }
  if(deLanguage) {
    rootStylesDe.push(styles.active)
  }




  return (
    <div className={styles.languagesList}>
      <div className={rootStylesRu.join(' ')}
        onClick={ () => SelectRuLanguage('ru')}
      >
        <img className={styles.languagesList__img} src={russianFlag} alt="Изображение российского флага" />
        <p>Русский</p>
      </div>

      <div className={rootStylesEn.join(' ')}
        onClick={ () => SelectEnLanguage('en')}
      >
        <img className={styles.languagesList__img} src={englishFlag} alt="Изображение английского флага" />
        <p>English</p>
      </div>

      <div className={rootStylesDe.join(' ')}
        onClick={ () => SelectDeLanguage('de')}
      >
        <img className={styles.languagesList__img} src={germanFlag} alt="Изображение немецкого флага" />
        <p>German</p>
      </div>

    </div>
  )
}
