import React from 'react'
import styles from '../button/Button.module.scss'

export default function Button({children, ...props}) {

    const rootStyles = [styles.button]
    if(props.delete) {
        rootStyles.push(styles.delete)
    }
    if(props.disabled) {
        rootStyles.push(styles.disabled)
    }


  return (
    <button {...props} className={rootStyles.join(' ')}>
        {children}
    </button>
  )
}
