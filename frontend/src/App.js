import React, { Fragment, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.css'
import Loading from './components/Loading'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'

const ProjectPage = React.lazy(() => import('./pages/ProjectPage'))
const ProjectRequirementsPage = React.lazy(() => import('./pages/ProjectRequirementsPage'))
const HomeworkPage = React.lazy(() => import('./pages/HomeworkPage'))
const DeveloperPage = React.lazy(() => import('./pages/DeveloperPage'))
const SeniorPage = React.lazy(() => import('./pages/SeniorPage'))
const MePage = React.lazy(() => import('./pages/MePage'))
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'))

const App = () => (
  <Fragment>
    <Navbar />
    <div className="App-page">
      <div className="App-content">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Redirect exact from="/" to="/project" />
            <Route path="/project" exact><ProjectPage /></Route>
            <Route path="/project/requirements" exact><ProjectRequirementsPage /></Route>
            <Route path="/homework" exact><HomeworkPage /></Route>
            <Route path="/developer" exact><DeveloperPage /></Route>
            <Route path="/senior" exact><SeniorPage /></Route>
            <PrivateRoute path="/me" exact><MePage /></PrivateRoute>
            <Route path="*"><NotFoundPage /></Route>
          </Switch>
        </Suspense>
      </div>
    </div>
  </Fragment>
)

export default App
