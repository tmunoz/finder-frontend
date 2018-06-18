// We only need to import the modules necessary for initial render
import { browserHistory } from 'react-router'

import loginRoute from './Login'
import dashboardRoute from './Dashboard'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

const isAuthenticated = () => {
  if (!sessionStorage.jwtToken)
    browserHistory.push('/')
}

const isLoggedIn = () => {
  if (sessionStorage.jwtToken)
    browserHistory.push('dashboard')
  else
    browserHistory.push('login')
}

const isBearerToken = () => {
  if (sessionStorage.jwtToken)
    browserHistory.push('/')
}

export const createRoutes = (store) => ({
  path        : '/',
  indexRoute  : loginRoute(store),
  childRoutes : [{
    path        : '/login',
    indexRoute  : loginRoute(store),
    onEnter     : isBearerToken,
  },
  {
    path        : '/dashboard',
    onEnter     : isAuthenticated,
    indexRoute  : dashboardRoute(store),
  }
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
