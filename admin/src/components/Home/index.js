import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Wrapper } from './utils';
import Table from './Table'
import _ from 'lodash'
import { fromUser } from 'src/store/selectors'
import { HELLO } from '../../services/constants/hello';
import api from 'src/services/api';

class Home extends Component {
  constructor(props) {
    super(props)

    this.initialState = this.initialState.bind(this);
    this.initialize = this.initialize.bind(this);
    this.getHistory = this.getHistory.bind(this);
    this.handle = this.handle.bind(this);
    this.handleSaveHistory = this.handleSaveHistory.bind(this);
    this.convertArrayToObject = this.convertArrayToObject.bind(this);

    this.state = this.initialState(props)
  }
  componentDidMount() {
    this._mounted = true
    this.initialize()
  }

  componentDidUpdate(prevProps) {
    if (!this._mounted) { return }
    const curProps = this.props
    if (JSON.stringify(prevProps.user) !== JSON.stringify(curProps.user)) { return this.setState(this.initialState(curProps), () => this.initialize()) }
  }

  initialState(props = this.props) {
    const state = { loading: true, error: false, histories: {}, hello: '' }
    return state
  }

  componentWillUnmount() {
    this._mounted = false
  }

  convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };
  
  getHistory(cb = () => {}) {
    return api.get(`/histories`)
      .then(({count, rows}) => this.setState({ histories: {...this.convertArrayToObject(rows, 'id')}, loading: true, error: false }))
      .catch(e => this.setState({ histories: {}, loading: true, error: e.message }))
  }

  getHello() {
    this.setState({
      hello: HELLO,      
      loading: true,
      error: false
    })
  }

  initialize() {
    this.getHistory();
    this.getHello();
    return ;
  }

  handle() {
    const next = { ...this.state }, values = arguments
    if (typeof values[0] === 'string') {
      _.set(next, values[0], values[1])
      return this.setState(next, () => values[2] ? values[2](null, next) : null)
    }
    if (typeof values[0] === 'object' && !values[0].length) { Object.keys(values[0]).forEach(key => _.set(next, key, values[0][key])) }
    if (typeof values[0] === 'object' && values[0].length) { values[0].forEach(e => Object.keys(e).forEach(key => _.set(next, key, e[key]))) }
    return this.setState(next, () => values[1] ? values[1](null, next) : null)
  }

  handleSaveHistory(id, cb = () => {}) {
    const { user, history } = this.props
    const { histories } = this.state

    var item = histories[id]
    if (user.role !== 'admin') { return alert('관리자만 가능합니다.') }
    
    return api[!item.id ? `post` : `put`](!item.id ? `/histories` : `/histories/${item.id}`, { ...item })
    .then((next) => {
      this.initialize()
    })
    .then(cb)
    .catch((error) => alert(`문제가 발생하였습니다.(${error.message})`))
  }

  render(){
    const { handle, handleSaveHistory } = this
    const { history, match, location, root } = this.props;
    const { loading, error, histories, hello } = this.state;

    const commonProps = {
      root,
      history,
      match,
    }
    const tableProps = {
      ...commonProps,
      histories, handle, handleSaveHistory
    }
    console.log(histories);
    return (
      <Wrapper>
        <Wrapper.Hello>
          <Wrapper.Title>
            인사말
          </Wrapper.Title>
          <Wrapper.HelloWord>
            { hello }
          </Wrapper.HelloWord>
        </Wrapper.Hello>

        <Wrapper.History>
          <Wrapper.Title>
            회사연혁
          </Wrapper.Title>
          <Table { ...tableProps }/>
        </Wrapper.History>

        <Wrapper.Organization>
          <Wrapper.Title>
            조직도
          </Wrapper.Title>
          
        </Wrapper.Organization>

        <Wrapper.Prize>
          <Wrapper.Title>
            등록/면허/수상
          </Wrapper.Title>
          
        </Wrapper.Prize>

        <Wrapper.Road>
          <Wrapper.Title>
            오시는 길
          </Wrapper.Title>
          
        </Wrapper.Road>
      </Wrapper>
    )
  }
}

Home.defaultProps = {
}

Home.propTypes = {
}


const mapStateToProps = (state) => ({
  user: fromUser.getInfo(state),
})

export default withRouter(connect(mapStateToProps, null)(Home))
