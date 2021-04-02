import React from 'react'
import ReactDOM from 'react-dom'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import './index.css'
import App from './App'
import { SessionProvider } from './contexts/SessionContext'
import possibleTypes from './cache/possibleTypes.json'
import reportWebVitals from './reportWebVitals'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache({ possibleTypes }),
  credentials: 'include',
})

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <SessionProvider>
            <App />
          </SessionProvider>
        </ApolloProvider>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
