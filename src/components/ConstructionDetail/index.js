import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ITEMS } from '../../services/constants/construction';
import Table from './Table';
import Carousel from './Carousel';


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
    const item = ITEMS.filter(c => c.id == query.id);
    return { ...item[0] }
  }
  
  render() {
    const { endpoint, getItems } = this;
    const { history, match, location, root, id } = this.props;
    const query = { id: match.params.id };
    const { title, description, constructionArea, images, startDate, endDate } = getItems(query);
    const commonProps = {
      endpoint,
      root,
      history,
      match,
    }
    const tableProps = {
        ...commonProps,
        constructionArea,
        description,
        startDate,
        endDate
    }
    const carouselProps = {
        ...commonProps,
        images
    }
    return (
        <>
            <h2>{title}</h2>
            <Carousel { ...carouselProps }/>
            <Table { ...tableProps }/>
        </>
    )
  }
}
ConstructionDetail.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    root: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    constructionArea: PropTypes.object,
    images: PropTypes.arrayOf(PropTypes.object),
    startDate: PropTypes.any,
    endDate: PropTypes.any,
}
  
ConstructionDetail.defaultProps = {
    history: {},
    location: {},
    root:'',
    id: -1,
    title: '',
    description: '',
    constructionArea: {},
    images: [],
    startDate: '',
    endDate: '',
  }
export default ConstructionDetail