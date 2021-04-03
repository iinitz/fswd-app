import { Redirect, Route } from 'react-router-dom'

import { useSession } from '../contexts/SessionContext'

const PrivateRoute = (props) => {
  const { children, ...rest } = props
  const { user } = useSession()
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return (
            <Redirect to={{ pathname: '/404', state: { from: location } }} />
          )
        }
        return children
      }}
    />
  )
}

export default PrivateRoute
