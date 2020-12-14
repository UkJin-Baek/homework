import React from 'react';
import { Provider } from 'react-redux'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import UploadProvider from 'src/components/utils/UploadProvider'
import theme from 'src/components/themes'

import IndexPage from './components/pages/IndexPage'
import JoinPage from './components/pages/JoinPage'
import LoginPage from './components/pages/LoginPage'

import store from './store'
import Exception from './components/utils/Exception';

function App() {
  const routes = [
    { path: '/join', render: (props) => <JoinPage { ...props } /> },
    { path: '/login', render: (props) => <LoginPage { ...props } /> },
  ];

  return (
    <Provider store={store}>
      <UploadProvider>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Router>
              <Switch>
                {routes.map((route, index) => <Route key={`AppRoute_${index}`} path={route.path} component={route.render} exact={route.exact}/>)}
                <Route path='/:nav' component={(props) => <IndexPage { ...props }/>} />
                <Route path='/' component={(props) => <LoginPage { ...props }/>} />
                <Route component={(props) => <Exception message={<>404<br/>페이지가 없습니다</>} {...props} />} />
              </Switch>
            </Router>
          </div>
        </ThemeProvider>
      </UploadProvider>
    </Provider>
  );
}

export default App;