import React from 'react'
import styles from './Input.module.scss'

export default function Input(props) {
  return (
    <input {...props} className={styles.input}>

    </input>
  )
}
