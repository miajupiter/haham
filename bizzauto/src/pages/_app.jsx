import { SessionProvider } from 'next-auth/react'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'
import { Provider as WrapBalancerProvider } from 'react-wrap-balancer'
// import { appWithTranslation, nextI18NextConfig } from 'next-i18next'
// import { I18nContext,initReactI18next,I18nextProvider,appWithTranslation, useTranslation } from 'react-i18next'
// import {getInitialProps} from '@/utils/translate'
// import cookieCutter from 'cookie-cutter'
// import Cookies from 'cookies'

import '@/styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <WrapBalancerProvider>
        <ThemeProvider
          enableSystem={false}
          attribute='class'
          defaultTheme='dark'
          storageKey='theme'
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </WrapBalancerProvider>
    </SessionProvider>
  )
}

export default MyApp
// export default appWithTranslation(MyApp)
