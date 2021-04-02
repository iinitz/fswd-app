import React, { Fragment, Suspense, useMemo } from 'react'
import { Link, NavLink } from 'react-router-dom'

import './Navbar.css'
import { useSession } from '../../contexts/SessionContext'

const LoginForm = React.lazy(() => import('../LoginForm'))

const Navbar = () => {
  const { loading, user, logout: handleLogout } = useSession()
  const userBox = useMemo(
    () => {
      if (loading) {
        return null // <span className="Navbar-user">Loading ...</span>
      }
      if (user) {
        return (
          <Fragment>
            <NavLink className="Navbar-user" to="/me">{user?.name}</NavLink>
            <button className="Button Button-border Navbar-button" type="button" onClick={handleLogout}>Logout</button>
          </Fragment>
        )
      }
      return (
        <LoginForm />
      )
    },
    [handleLogout, loading, user],
  )
  return (
    <nav className="Navbar-nav">
      <Link className="Navbar-title" to="/">FsWD</Link>
      <NavLink className="Navbar-menu" activeClassName="Navbar-menu-active" to="/project">Project</NavLink>
      <NavLink className="Navbar-menu" activeClassName="Navbar-menu-active" to="/homework">Homework</NavLink>
      <NavLink className="Navbar-menu" activeClassName="Navbar-menu-active" to="/developer">Developer</NavLink>
      <NavLink className="Navbar-menu" activeClassName="Navbar-menu-active" to="/senior">Senior</NavLink>
      <div className="Space" />
      <Suspense fallback={null}>
        {userBox}
      </Suspense>
    </nav>
  )
}

export default Navbar
