import React, { useContext, useState } from 'react'
import Input from '../components/UI/input/Input'
import { authContext } from '../context/AuthContext'
import styles from '../Styles/LoginPage.module.scss'
import Button from '../components/UI/button/Button'

export default function LoginPage() {

  const {adminAuth, setAdminAuth, user1Auth, setUser1Auth, user2Auth, setUser2Auth} = useContext(authContext)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [wrongLogin, setWrongLogin] = useState(false)
  const [wrongPassword, setWrongPassword] = useState(false)



  const logIn = (e) => {
    e.preventDefault()
    setWrongLogin(false)
    setWrongPassword(false)

    switch (login) {
      case 'admin': 
        if (password === 'admin') {
          localStorage.setItem('admin', 'true')
          setAdminAuth(true)
        } else {
          setWrongPassword(true)
        }
        break
      case 'user1': 
        if (password === 'user1') {
          localStorage.setItem('user1', 'true')
          setUser1Auth(true)
        } else {
          setWrongPassword(true)
        }
        break
      case 'user2': 
        if (password === 'user2') {
          localStorage.setItem('user2', 'true')
          setUser2Auth(true)
        } else {
          setWrongPassword(true)
        }
        break
      default: 
            setWrongLogin(true)
    }



    switch (password) {
      case 'admin': 
        if (login === 'admin') {
          localStorage.setItem('admin', 'true')
          setAdminAuth(true)
        } else {
          setWrongLogin(true)
        }
        break
      case 'user1': 
        if (login === 'user1') {
          localStorage.setItem('user1', 'true')
          setUser1Auth(true)
        } else {
          setWrongLogin(true)
        }
        break
      case 'user2': 
        if (login === 'user2') {
          localStorage.setItem('user2', 'true')
          setUser2Auth(true)
        } else {
          setWrongLogin(true)
        }
        break
        default:
          setWrongPassword(true)
    }
  }




  return (
    <main>
      <div className={styles.login}>
        <form onSubmit={ (e) => logIn(e)} className={styles.login__form}>
          <Input
            value={login}
            onChange={ (e) => setLogin(e.target.value)}
            type='text'
            placeholder='Введите логин'/>
            {wrongLogin && <p style={{color: 'red',  marginBottom: 20}}>Проверьте правильность заполнения поля</p>}


          <Input
            value={password}
            onChange={ (e) => setPassword(e.target.value)}
            type='password'
            placeholder='Введите пароль'/>
            {wrongPassword && <p style={{color: 'red',  marginBottom: 20}}>Проверьте правильность заполнения поля</p>}

          <Button style={{display: 'block', margin: '0 auto'}}>Войти</Button>
        </form>


        
        <div className={styles.login__userBlock}>
          <h2>Админ</h2>
          <p>Логин: admin</p>
          <p>Пароль: admin</p>
        </div>
        <div className={styles.login__userBlock}>
          <h2>Пользователь 1</h2>
          <p>Логин: user1</p>
          <p>Пароль: user1</p>
        </div>
        <div className={styles.login__userBlock}>
          <h2>Пользователь 2</h2>
          <p>Логин: user2</p>
          <p>Пароль: user2</p>
        </div>
      </div>
    </main>
  )
}
