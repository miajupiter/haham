import * as Pages from './pages'

import { withNavigationWatcher } from './providers/navigation'

var routes = [
  {
    path: '/tasks',
    element: Pages.TasksPage
  },
  {
    path: '/profile',
    element: Pages.ProfilePage
  },
  {
    path: '/home',
    element: Pages.HomePage
  },
  {
    path: '/machines',
    element: Pages.MachinesPage
  },
  {
    path: '/data-logs',
    element: Pages.DataLogsPage
  },
  {
    path: '/machine-logs',
    element: Pages.MachineLogsPage
  },
  {
    path: '/machine-status',
    element: Pages.MachineStatusPage
  }

]

export default routes.map(route => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path)
  }
})
