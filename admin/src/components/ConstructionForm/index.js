import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import api from 'src/services/api'
import _ from 'lodash'
import { fromUser } from 'src/store/selectors'
import Assister from 'src/services/assister'
import assister from './assister'

import Form from './Form'
import Exception from 'src/components/utils/Exception'

class PartnerFormContainer extends Component {
  constructor(props) {
    super(props)

    this.endpoint = 'construction'
    this.assister = new Assister.Form(assister).focus(this)
    this.fieldOptions = this.assister.fieldOptions
    this.validationOptions = this.assister.validationOptions
    
    this.initialState = this.initialState.bind(this)
    this.initialize = this.initialize.bind(this)
    this.loadItem = this.loadItem.bind(this)
    this.handle = this.handle.bind(this)
    this.handleSave = this.handleSave.bind(this)

    this.state = this.initialState(props)
  }

  componentDidMount() {
    this._mounted = true
    this.initialize()
  }

  componentDidUpdate(prevProps) {
    if (!this._mounted) { return }
    const curProps = this.props
    if (prevProps.itemId !== curProps.itemId) { return this.setState(this.initialState(curProps), () => this.initialize()) }
    if (JSON.stringify(prevProps.user) !== JSON.stringify(curProps.user)) { return this.setState(this.initialState(curProps), () => this.initialize()) }
  }

  componentWillUnmount() {
    this._mounted = false
  }

  initialState(props = this.props) {
    return { loading: true, error: false, item: { id: (props.itemId && props.itemId !== 'new') ? props.itemId : null } }
  }

  initialize(props = this.props) {
    if (!this._mounted) { return }

    const { user, match, itemId } = this.props
    if (!user._prepare) { return }
    
    this.root = match.url.slice(-1) === '/' ? match.url : `${match.url}/`

    if (!user.id || itemId === 'new') { return this.setState({ loading: false }) }
    this.loadItem()
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

  handleSave() {
    const { endpoint, root } = this
    const { user, history, match, me } = this.props
    const { item } = this.state

    if (!item.id && (!user || !user.id)) { return alert('로그인이 필요한 서비스입니다.') }
    if (item.id && item.user !== user.id && user.role !== 'admin') { return alert('본인 또는 관리자만 가능합니다.') }

    const reasons = this.assister.focus(this).validate(item, {}, user)
    if(reasons && reasons.length > 0) {
      alert(reasons[0].message)
      return Promise.resolve({ item, reasons })
    }

  return api[!item.id ? `post` : `put`](!item.id ? `/${endpoint}` : `/${endpoint}/${item.id}`, { ...item, status: 'pending' })
    .then((next) => {
      history.push(`/${endpoint}`)
    })
    .catch((error) => alert(`문제가 발생하였습니다.(${error.message})`))
  }

  render() {
    const { endpoint, root, initialState, initialize, handle, handleSave } = this
    const { takeField, takeVaild } = this.assister
    const { user, location, match, history, me } = this.props
    const commonProps = { user, location, match, history, endpoint }
    const { loading, error, item } = this.state
    if (loading) { return null }

    if (!user.id) { return <Exception message={<>로그인이 반드시<br/>필요한 서비스입니다</>} {...commonProps}/> }
    if (error) { return <Exception {...commonProps} /> }

    const isOwner = (user, item) => user && (user.role === 'admin')
    if (item.id && !isOwner(user, item)) { return <Exception message={<>관리자가 아니라면<br/>수정할 수 없습니다</>} {...commonProps}/> }
    
    const fieldOptions = {}
    Object.keys(this.fieldOptions).forEach(key => {
      fieldOptions[key] = takeField(key)
    })

    const validationOptions = {}
    Object.keys(this.validationOptions).forEach(key => {
      validationOptions[key] = takeVaild(key)
    })

    const formProps = {
      loading, user, location, match, history, me,
      item, fieldOptions, validationOptions, isOwner,
      endpoint, root, initialState, initialize, handle, handleSave
    }

    return <Form {...formProps} />
  }
}

PartnerFormContainer.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,

  itemId: PropTypes.string,
}

PartnerFormContainer.defaultProps = {
  user: {},
  history: {},
  location: {},
  match: {},
  
  itemId: 'new',
}

const mapStateToProps = (state) => ({
  user: fromUser.getInfo(state),
})

export default withRouter(connect(mapStateToProps, null)(PartnerFormContainer))
