import React, { useState, useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'

import '@/styles/index.css'
import { ThemeProvider } from 'next-themes'
import {Login} from '@/components/Login/Login'

export const Menu=(props)=>{

  return (
    <>
    <h2>Admin menu</h2>
    </>
  )
}


export default function App({ Component, pageProps }) {
  const [loggedIn, setLoggedIn] = useState()
  useEffect(() => {
    const val = localStorage.getItem('theme') || 'dark'
    localStorage.setItem('theme', val)
    if(localStorage.getItem('loggedIn')==='true'){
      setLoggedIn(true)
    }else{
      setLoggedIn(false)
    }
  }, [])

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CLIENT_ID}
    >
      <ThemeProvider
        enableSystem={false}
        attribute='class'
        defaultTheme='dark'
        storageKey='theme'
      >
        {loggedIn?(<Component {...pageProps} />):(<Login />)}
      </ThemeProvider>
    </GoogleOAuthProvider>
  )
}
