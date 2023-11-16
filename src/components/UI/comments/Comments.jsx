import React from 'react'
import { ReactComponent as AccountIcon} from '../../../images/account_circle_FILL0_wght400_GRAD0_opsz48.svg'
import styles from './Comments.module.scss'

export default function Comments({comments, numberOfLastComment, darkMode}) {

  const rootStyle = [styles.comment]
  if(darkMode) {
    rootStyle.push(styles.opacity)
  }


  return (
    <>
    {comments.slice(0, numberOfLastComment).map( comm => 
      <div 
        className={rootStyle.join(' ')} 
        style={ comm.positiveComment ? {backgroundColor: '#00c800'} : {backgroundColor: 'red'}} 
        key={comm.id}>
        <div className={styles.comment__left}>
          <div className={styles.comment__user}>
            <AccountIcon/>
          </div>
          <h4 style={{marginBottom: 'auto'}}>{comm.user}</h4>
        </div>
        <div className={styles.comment__body}>
          <p>{comm.body}</p>
          <h4>{comm.date}</h4>
        </div>
      </div>
      )}
    </>
  )
}
