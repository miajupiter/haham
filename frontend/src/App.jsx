import 'devextreme/dist/css/dx.common.css'
import './assets/styles/theme.base.css'
import './assets/styles/theme.additional.css'
import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import './assets/styles/main.scss'
import LoadPanel from 'devextreme-react/load-panel'
import { NavigationProvider } from './providers/navigation'
import { AuthProvider, useAuth } from './providers/auth-provider'
import { useScreenSizeClass } from './utils/media-query'
import Content from './Content'
import UnauthenticatedContent from './UnauthenticatedContent'


function App() {
  // const { user, loading } = useAuth()
  // if (loading) {
  //   return <LoadPanel visible={true} />
  // }
  // if (!user) {
  //   return <Content />
  // }
  if(localStorage.getItem('token')){
    return <Content />
  }else{
    return <UnauthenticatedContent />
  }
  
}

export default function Root() {
  const screenSizeClass = useScreenSizeClass()

  return (
<Router>
      <AuthProvider>
        <NavigationProvider>
          <div className={`app ${screenSizeClass}`}>
            <App />
          </div>
        </NavigationProvider>
      </AuthProvider>
    </Router>
  )
}
