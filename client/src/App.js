import React from 'react';
import { Provider } from 'react-redux'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import theme from 'src/components/themes'

import Page from 'src/components/layouts/Page'

import IndexPage from './components/pages/IndexPage'
import Exception from './components/utils/Exception';
import Home from './components/Home';

import store from './store'

function App() {

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Router>
              <Switch>
                <Route path='/:nav' component={(props) => <IndexPage { ...props }/>} />
                <Route path='/' component={(props) => <Page><Home { ...props }/></Page>} />
                <Route component={(props) => <Exception message={<>404<br/>페이지가 없습니다</>} {...props} />} />
              </Switch>
            </Router>
          </div>
        </ThemeProvider>
      </Provider>
    );
}

export default App