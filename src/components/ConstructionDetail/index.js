import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ITEMS } from '../../services/constants/construction';

class ConstructionDetail extends Component {
  constructor(props) {
    super(props)


    this.initialState = this.initialState.bind(this);
    this.getItems = this.getItems.bind(this);

    this.state = this.initialState(props);
  }

  initialState(props = this.props) {
    const state = { title: '', description: '', area: '', src: '' };
    return state;
  }

  getItems(query = {}) {
    const component = { ...this , ...query};
    const { state } = component;
    // 추후 데이터 db에서 가져오게 변경 예정
    const item = ITEMS.filter(c => c.id === query.id);
    return { ...item }
  }
  
  render() {
    const { endpoint, getItems } = this;
    const { history, match, location, root, id } = this.props;
    const query = {id}
    const { title, description, area, src } = getItems(query);

    const listProps = {
      endpoint,
      root,
      history,
      match,
      title,
      description,
      area,
      src
    }
    return (
        <>
        냠
        </>
    )
  }
}
ConstructionDetail.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    root: PropTypes.string,
    id: PropTypes.number
}
  
ConstructionDetail.defaultProps = {
    history: {},
    location: {},
    root:'',
    id: -1
  }
export default ConstructionDetail