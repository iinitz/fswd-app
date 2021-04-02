import React, { Fragment, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.css'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'

const ProjectPage = React.lazy(() => import('./pages/ProjectPage'))
const HomeworkPage = React.lazy(() => import('./pages/HomeworkPage'))
const DeveloperPage = React.lazy(() => import('./pages/DeveloperPage'))
const SeniorPage = React.lazy(() => import('./pages/SeniorPage'))
const MePage = React.lazy(() => import('./pages/MePage'))

const App = () => (
  <Fragment>
    <Navbar />
    <div className="App-page">
      <div className="App-content">
        <Suspense fallback="Loading ...">
          <Switch>
            <Redirect exact from="/" to="/project" />
            <Route path="/project" exact><ProjectPage /></Route>
            <Route path="/homework" exact><HomeworkPage /></Route>
            <Route path="/developer" exact><DeveloperPage /></Route>
            <Route path="/senior" exact><SeniorPage /></Route>
            <PrivateRoute path="/me" exact><MePage /></PrivateRoute>
          </Switch>
        </Suspense>
      </div>
    </div>
  </Fragment>
)

export default App
