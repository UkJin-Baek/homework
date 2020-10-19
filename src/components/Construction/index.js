import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import List from './List';
import { ITEMS } from '../../services/constants/construction';

class Construction extends Component {
  constructor(props) {
    super(props)

    this.endpoint = 'construction'

    this.initialState = this.initialState.bind(this);
    this.getItems = this.getItems.bind(this);

    this.state = this.initialState(props);
  }

  initialState(props = this.props) {
    const state = { items: [], total: 0 };
    return state;
  }

  getItems(query = {}) {
    const component = { ...this , ...query};
    const { state } = component;
    // 추후 데이터 db에서 가져오게 변경 예정
    const items = ITEMS;
    return { count: items.length, items: items}
  }
  
  render() {
    const { endpoint, getItems } = this;
    const { history, match, root } = this.props;

    const { count, items } = getItems();

    const listProps = {
      endpoint,
      root,
      history,
      match,
      count,
      items
    }
    return <List { ...listProps}/>
  }
}

export default Construction