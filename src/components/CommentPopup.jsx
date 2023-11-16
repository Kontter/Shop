import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../Styles/CommentPopup.module.scss'
import Button from '../components/UI/button/Button'

export default function CommentPopup({isCommentPopup, setIsCommentPopup, addComment, setTypeOfComment, typeOfComment}) {

  const [textareaComment, setTextareaComment] = useState('')
  const [isTypeOfComment, setIsTypeOfComment] = useState(false)   // Выбран ли какой-нибудь тип комментария



  const selectedTypeOfComment = (typeOfComment) => {
    setIsTypeOfComment(true)
    setTypeOfComment(typeOfComment)
  }


  
  const createComment = () => {

    let user = ''
    if(localStorage.getItem('admin')) {
      user = 'admin'
    } else if(localStorage.getItem('user1')) {
      user = 'user1'
    } else if(localStorage.getItem('user2')) {
      user = 'user2'
    }


    let initialPositiveComment = ''
    let initialNegativeComment = ''
    if(typeOfComment === 'positive') {
      initialPositiveComment = typeOfComment
    } else {
      initialNegativeComment = typeOfComment
    }

    const newComment = {
      id: Date.now(),
      user: user,
      date: new Intl.DateTimeFormat('ru', {day: 'numeric',month: 'long', year: 'numeric'}).format(new Date),
      dateSort: Date.now().toString(),
      positiveComment: initialPositiveComment,
      negativeComment: initialNegativeComment,
      body: textareaComment
    }
    addComment(newComment)
  }


  const rootStyles = [styles.popup]
  if(isCommentPopup) {
    rootStyles.push(styles.active)
  }



  const { t } = useTranslation()


  return (
    <div className={rootStyles.join(' ')}>
      <div style={{maxWidth: 530, width: '100%', padding: '0 15px'}}>
        <div className={styles.popup__content} onClick={(e) => e.stopPropagation()}>
          {isTypeOfComment
            ?
              <>
                <textarea 
                  style={ textareaComment.length > 300 ? {borderColor: 'red'} : {borderColor: 'green'}} 
                  className={styles.popup__textarea}
                  value={textareaComment}
                  onChange={ (e) => setTextareaComment(e.target.value)}
                >
                </textarea>
                <div 
                  style={ textareaComment.length > 300 ? {color: 'red'} : {}} 
                  className={styles.popup__counter} >{textareaComment.length}
                  / 300
                </div>

                {textareaComment.length <= 300 && textareaComment.length >= 1
                  ?
                    <Button 
                      onClick={ () => createComment(textareaComment)}
                    >{t('publish')}</Button>
                  :
                    <Button disabled 
                      style={{borderColor: 'rgba(0, 140, 255, .4)'}}
                      onClick={ () => createComment(textareaComment)}
                    >{t('publish')}</Button>   
                }
              </>
            :
              <div>
                <h2 style={{marginBottom: 15, color: '#000'}}>{t('commentType')}</h2>
                <button className={styles.popup__positiveBtn} onClick={ () => selectedTypeOfComment('positive')}>{t('positiveComment')}</button>
                <button className={styles.popup__negativeBtn} onClick={ () => selectedTypeOfComment('negative')}>{t('negativeComment')}</button>
              </div>
          }
        </div>
      </div>
    </div>
  )
}
