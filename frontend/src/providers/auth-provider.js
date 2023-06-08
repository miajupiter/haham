import React, { useState, useEffect, createContext, useContext, useCallback } from 'react'
import * as api from './_api'


function AuthProvider(props) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async function () {
        // const result = await getUser()
        // if (result.isOk) {
        //   setUser(result.data)
        // }
        // setLoading(false)
    })()
  }, [])

  const signIn = useCallback(async (email, password) => {
    // const result = await signIn(email, password)
    // if (result.isOk) {
    //   setUser(result.data)
    // }

    // return result
  }, [])

  const signOut = useCallback(() => {
    // setUser(undefined)
    localStorage.removeItem('token')
    window.location.href='/'
  }, [])


  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }} {...props} />
  )
}

const AuthContext = createContext({ loading: false })
const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
