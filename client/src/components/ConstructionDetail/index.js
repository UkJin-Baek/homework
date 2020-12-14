import React, { Component } from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'
import Table from './Table';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import api from 'src/services/api'
import { Wrapper, Title, Square } from './utils';


class ConstructionDetail extends Component {
  constructor(props) {
    super(props)

    this.endpoint = 'construction'

    this.initialState = this.initialState.bind(this);
    this.initialize = this.initialize.bind(this)
    this.loadItem = this.loadItem.bind(this);

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
    return { loading: true, error: false, item: { id: (props.itemId && props.itemId !== 'new') ? props.itemId : null } }
  }

  initialize() {
    return this.loadItem()
  }

  loadItem() {
    if (!this._mounted) { return }
    const { endpoint } = this
    const { item } = this.state

    return api.get(`/${endpoint}/${item.id}`)
      .then((item) => {
        if (!this._mounted) { return }
        this.setState({ item: item && item.id ? item : this.state.item, loading: false, error: false })
        return item
      })
      .catch((error) => {
        if (!this._mounted) { return }
        this.setState({ loading: false, error: error.message })
        return item
      })
  }
  
  render() {
    const { endpoint } = this;
    const { history, match, location, root} = this.props;
    const { item } = this.state
    const commonProps = {
      endpoint,
      root,
      history,
      match,
    }
    console.log(item);
    const tableProps = {
        ...commonProps,
        // constructionArea,
        // description,
        // startDate,
        // endDate
    }
    return (
        <>
          <Title> <Square/>{item.name || ''}</Title>
          <Wrapper>
            <Carousel>
              {_.get(item, `images.length`) && item.images.map((image, key) =>
                  <Wrapper.Img key={`Construction_Carousel_${key}`}>
                      <img src={`${image.endpoint}${image.path}`} alt={image.filename}/>
                      {/* <p className="legend">{image.description}</p> */}
                  </Wrapper.Img>
              )}
            </Carousel>
          </Wrapper>
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