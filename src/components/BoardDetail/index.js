import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { NOTICES } from '../../services/constants/board';

class BoardDetail extends Component {
  constructor(props) {
    super(props)

    this.initialState = this.initialState.bind(this);
    this.getItems = this.getItems.bind(this);

    this.state = this.initialState(props);
  }

  initialState(props = this.props) {
    const state = { title: '', description: '', num: 0 };
    return state;
  }

  getItems(query = {}) {
    const component = { ...this , ...query};
    const { state } = component;
    // 추후 데이터 db에서 가져오게 변경 예정
    const notice = NOTICES.filter(c => c.id === query.id);
    return { ...notice }
  }
  
  render() {
    const { endpoint, getItems } = this;
    const { history, match, location, root, id } = this.props;
    const query = {id}
    const { title, description, num } = getItems(query);

    const listProps = {
      endpoint,
      root,
      history,
      match,
      title,
      description,
      num
    }
    return (
        <>
        메렁{listProps.num}
        </>
    )
  }
}
BoardDetail.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    root: PropTypes.string,
    id: PropTypes.number
}
  
BoardDetail.defaultProps = {
    history: {},
    location: {},
    root:'',
    id: -1
  }
export default BoardDetail