import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ITEMS } from '../../services/constants/construction';
import Table from './Table';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Wrapper } from './utils';


class ConstructionDetail extends Component {
  constructor(props) {
    super(props)

    this.initialState = this.initialState.bind(this);
    this.initialize = this.initialize.bind(this)
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
    if (JSON.stringify(prevProps) !== JSON.stringify(curProps)) { this.setState(this.initialState(curProps), () => null) }
  }

  componentWillUnmount() {
    this._mounted = false
  }

  initialState(props = this.props) {
    const state = { 
        loading: true, 
        error: false, 
        title: '', 
        description: '', 
        area: '', 
        src: '' 
    };
    return state;
  }

  initialize() {
    return this.getItems()
  }

  getItems(query = {}, cb = () => {}) {
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
    return (
        <>
            <h2>{title}</h2>
            <Carousel>
                {images.map((image, key) =>
                    <Wrapper key={`Construction_Carousel_${key}`}>
                        <img src={image.src} alt={image.description}/>
                        {/* <p className="legend">{image.description}</p> */}
                    </Wrapper>
                )}
            </Carousel>
            <Table { ...tableProps }/>
        </>
    )
  }
}
ConstructionDetail.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    root: PropTypes.string,
    id: PropTypes.string,
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
    id: '',
    title: '',
    description: '',
    constructionArea: {},
    images: [],
    startDate: '',
    endDate: '',
  }
export default ConstructionDetail