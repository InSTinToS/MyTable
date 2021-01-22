import React from 'react'

import GlobalStyle from 'styles'

import Routes from 'routes'

import store from 'store'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />

      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  )
}

export default App
