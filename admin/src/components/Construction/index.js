import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fromUser } from 'src/store/selectors'
import api from 'src/services/api'
import List from './List';

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
    
    const { user, match } = this.props
    if (!user._prepare) { return }
    
    this.root = match.url.slice(-1) === '/' ? match.url : `${match.url}/`

    if (!user._prepare) { return }
    this.getItems()
  }

  initialState(props = this.props) {
    const state = { items: [], total: 0 ,loading: true, error : false};
    return state;
  }

  getItems(query = {}) {
    const component = { ...this , ...query};
    const { state } = component;
    // 추후 데이터 db에서 가져오게 변경 예정
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

const mapStateToProps = (state) => ({
  user: fromUser.getInfo(state),
})

export default withRouter(connect(mapStateToProps, null)(Construction))