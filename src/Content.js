import { Routes, Route, Navigate } from 'react-router-dom'
import appInfo from './app-info'
import routes from './app-routes'
import { AppLayout } from './layouts'
import { Footer } from './components'

export default function Content() {
  return (
    <AppLayout title={appInfo.title}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={element}
          />
        ))}
        <Route
          path='*'
          element={<Navigate to='/home' />}
        />
      </Routes>
      <Footer>
        Copyright © {new Date().getFullYear()} {appInfo.copyright}
      </Footer>
    </AppLayout>
  )
}
