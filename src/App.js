import React from 'react';
import MyComponent from './components/MyComponent';
import Counter from './components/Counter'
import './App.css';
import Categories from './components/Categories';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        username:null
    };
  }

  componentDidMount() {
    fetch('api')
      .then(res=>res.json())
      .then(data=>this.setState({username: data.username}))
  }

  render() {
    const {username} = this.state;
    return (
        <div className="App">
            <Categories />
          <header className="App-header">
            {username ? `Hello ${username}` : 'Hello World'}
            <MyComponent>백</MyComponent>
            <Counter />
          </header>
        </div>
    );
  }
}

export default App;