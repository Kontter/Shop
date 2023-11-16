import React, { lazy, Suspense, useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { authContext } from '../context/AuthContext'
import Loader from './UI/loader/Loader'



const Basket = lazy( () => import('../pages/Basket'))
const GameIdPage = lazy( () => import('../pages/GameIdPage'))
const Shop = lazy( () => import('../pages/Shop'))
const LoginPage = lazy ( () => import('../pages/LoginPage'))
const LibraryPage = lazy ( () => import('../pages/LibraryPage'))
const PayPage = lazy ( () => import('../pages/PayPage'))




export default function AppRouter() {


    const {adminAuth, setAdminAuth, user1Auth, setUser1Auth, user2Auth, setUser2Auth} = useContext(authContext)

    useEffect( () => {
      if(localStorage.getItem('admin')) {
        setAdminAuth(true)
      } else if(localStorage.getItem('user1')) {
            setUser1Auth(true)
      } else if (localStorage.getItem('user2')) {
            setUser2Auth(true)
      } 
    }, [])

  return (
    adminAuth 
        ?
            <Routes>
                <Route path='/shop' element={<Suspense fallback={<Loader/>}><Shop /></Suspense>} />
                <Route path='/basket' element={<Suspense fallback={<Loader/>}><Basket/></Suspense>} />
                <Route path='/library' element={<Suspense fallback={<Loader/>}><LibraryPage/></Suspense>} />
                <Route path='/payPage' element={<Suspense fallback={<Loader/>}><PayPage/></Suspense>} />
                <Route path='/games/:id' element={<Suspense fallback={<Loader/>}><GameIdPage/></Suspense>} />
                <Route path='/*' element={<Suspense fallback={<Loader/>}><Shop/></Suspense>} />
            </Routes>
        :   user1Auth 
                ? 
                    <Routes>
                        <Route path='/shop' element={<Suspense fallback={<Loader/>}><Shop /></Suspense>} />
                        <Route path='/basket' element={<Suspense fallback={<Loader/>}><Basket/></Suspense>} />
                        <Route path='/library' element={<Suspense fallback={<Loader/>}><LibraryPage/></Suspense>} />
                        <Route path='/payPage' element={<Suspense fallback={<Loader/>}><PayPage/></Suspense>} />
                        <Route path='/games/:id' element={<Suspense fallback={<Loader/>}><GameIdPage/></Suspense>} />
                        <Route path='/*' element={<Suspense fallback={<Loader/>}><Shop/></Suspense>} />
                    </Routes>
                :   user2Auth
                        ?
                            <Routes>
                                <Route path='/shop' element={<Suspense fallback={<Loader/>}><Shop /></Suspense>} />
                                <Route path='/basket' element={<Suspense fallback={<Loader/>}><Basket/></Suspense>} />
                                <Route path='/library' element={<Suspense fallback={<Loader/>}><LibraryPage/></Suspense>} />
                                <Route path='/payPage' element={<Suspense fallback={<Loader/>}><PayPage/></Suspense>} />
                                <Route path='/games/:id' element={<Suspense fallback={<Loader/>}><GameIdPage/></Suspense>} />
                                <Route path='/*' element={<Suspense fallback={<Loader/>}><Shop/></Suspense>} />
                            </Routes>
                        :
                            <Routes>
                                <Route path='/login' element={<Suspense fallback={<Loader/>}><LoginPage/></Suspense>} />
                                <Route path='/*' element={<Suspense fallback={<Loader/>}><LoginPage/></Suspense>} />
                            </Routes>
  )
}
