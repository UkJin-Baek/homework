import React, { Component } from 'react';
import List from './List';
import { NOTICES } from '../../services/constants/board';

class Board extends Component {
  constructor(props) {
    super(props)

    this.endpoint = 'board'

    this.initialState = this.initialState.bind(this);
    this.getItems = this.getItems.bind(this);

    this.state = this.initialState(props);
  }

  initialState(props = this.props) {
    const state = { notices: [], total: 0 };
    return state;
  }

  getItems(query = {}) {
    const component = { ...this , ...query};
    const { state } = component;
    // 추후 데이터 db에서 가져오게 변경 예정
    const notices = NOTICES;
    return { count: notices.length, notices: notices}
  }
  
  render() {
    const { endpoint, getItems } = this;
    const { history, match, root } = this.props;

    const { count, notices } = getItems();

    const listProps = {
      endpoint,
      root,
      history,
      match,
      count,
      notices
    }
    return <List { ...listProps}/>
  }
}

export default Board