import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

import ConstructionPage from './components/pages/ConstructionPage'
import ConstructionDetailPage from './components/pages/ConstructionDetailPage'
import PartnerPage from './components/pages/PartnerPage'
import IndexPage from './components/pages/IndexPage'

import store from './store'

function App() {

    const routes = [
      { path: '/construction', exact:true, render: (props) => <ConstructionPage { ...props } /> },
      { path: '/construction/:id', render: (props) => <ConstructionDetailPage { ...props } /> },
      { path: '/partner', render: (props) => <PartnerPage { ...props } /> },
    ];

    return (
      <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            {routes.map((route, index) => <Route key={`AppRoute_${index}`} path={route.path} component={route.render} exact={route.exact}/>)}
            <Route path='/' exact={true} component={(props) => <IndexPage { ...props }/>} />
            <Route component={(props) => <div>404</div>} />
          </Switch>
        </Router>
      </div>
      </Provider>
    );
}

export default App;