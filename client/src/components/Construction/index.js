import React, { Component } from 'react';
import List from './List';
import api from 'src/services/api'

class Construction extends Component {
  constructor(props) {
    super(props)

    this.endpoint = 'construction'

    this.initialize = this.initialize.bind(this)
    this.initialState = this.initialState.bind(this);
    this.getItems = this.getItems.bind(this);

    this.state = this.initialState(props);
  }

  componentDidMount() {
    this._mounted = true
    this.initialize()
  }

  componentDidUpdate(prevProps) {
    if (!this._mounted) { return }
    const curProps = this.props
    if (JSON.stringify(prevProps) !== JSON.stringify(curProps)) { return this.setState(this.initialState(curProps), () => this.initialize()) }
  }

  initialize() {
    if (!this._mounted) { return }
    
    const { match } = this.props
    
    this.root = match.url.slice(-1) === '/' ? match.url : `${match.url}/`

    this.getItems()
  }

  initialState(props = this.props) {
    const state = { items: [], total: 0 ,loading: true, error : false};
    return state;
  }

  getItems(query = {}) {
    const component = { ...this , ...query};
    const { state } = component;
    return api.get(`/${this.endpoint}`)
    .then(({ count, rows }) => this.setState({ items: rows, total: count, loading: false, error: false }))
    .catch(error => this.setState({ items: [], total: 0, loading: false, error: error.message }))
  }
  
  render() {
    const { endpoint } = this;
    const { history, match, root } = this.props;
    const { items, total } = this.state

    const listProps = {
      endpoint,
      root,
      history,
      match,
      items
    }
    return <List { ...listProps}/>
  }
}

export default Construction