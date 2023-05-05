import { HomePage, TasksPage, ProfilePage, AccountingPage } from './pages'
import { withNavigationWatcher } from './contexts/navigation'

const routes = [
  {
    path: '/tasks',
    element: TasksPage
  },
  {
    path: '/profile',
    element: ProfilePage
  },
  {
    path: '/home',
    element: HomePage
  },
  {
    path: '/accounting',
    element: AccountingPage
  }
]

export default routes.map(route => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path)
  }
})
