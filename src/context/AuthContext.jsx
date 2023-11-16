import React, { createContext, useState } from 'react'



    export const authContext = createContext()

export default function AuthContext({children}) {

    const [adminAuth, setAdminAuth] = useState(false)
    const [user1Auth, setUser1Auth] = useState(false)
    const [user2Auth, setUser2Auth] = useState(false)


    const value = {
        adminAuth,
        setAdminAuth,
        user1Auth,
        setUser1Auth,
        user2Auth,
        setUser2Auth
    }



  return (
   <authContext.Provider value={value}>{children}</authContext.Provider>
  )
}
