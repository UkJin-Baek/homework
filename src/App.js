import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Counter from './components/Counter'
import './App.css';

import ConstructionPage from './components/pages/ConstructionPage'
import ConstructionDetailPage from './components/pages/ConstructionDetailPage'
import IndexPage from './components/pages/IndexPage'

import store from './store'

function App() {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //       username:null
  //   };
  // }

  // componentDidMount() {
  //   fetch('api')
  //     .then(res=>res.json())
  //     .then(data=>this.setState({username: data.username}))
  // }

  // render() {
    const routes = [
      
      { path: '/construction', render: (props) => <ConstructionPage { ...props } /> },
      { path: '/construction/:id', render: (props) => <ConstructionDetailPage { ...props } /> },
    ];

    return (
      <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            {routes.map((route, index) => <Route key={`AppRoute_${index}`} path={route.path} component={route.render} />)}
            <Route path='/'component={(props) => <IndexPage { ...props }/>} />
            <Route component={(props) => <div>404</div>} />
          </Switch>
        </Router>
        {/*<Counter />*/}
      </div>
      </Provider>
    );
  // }
}

export default App;