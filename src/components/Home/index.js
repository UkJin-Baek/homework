import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './utils';
import Table from './Table'

import { HISTORIES } from '../../services/constants/history';
import { HELLO } from '../../services/constants/hello';

class Home extends Component {
  constructor(props) {
    super(props)

    this.initialState = this.initialState.bind(this);
    this.initialize = this.initialize.bind(this);
    this.getHistory = this.getHistory.bind(this);

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
    const state = { loading: true, error: false, histories: [], hello: '' }
    return state
  }

  componentWillUnmount() {
    this._mounted = false
  }

  getHistory(cb = () => {}) {
    // 추후 데이터 db에서 가져오게 변경 예정
    const histories = HISTORIES;

    this.setState({
      histories: HISTORIES,
      loading: true,
      error: false
    })
    return { ...histories }
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

  render(){
    const { history, match, location, root } = this.props;
    const { loading, error, histories, hello } = this.state;

    const commonProps = {
      root,
      history,
      match,
    }
    const tableProps = {
      ...commonProps,
      histories
  }
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

export default Home