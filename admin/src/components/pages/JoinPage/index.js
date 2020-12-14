import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Join from '../../Join'
import Page from '../../layouts/Page'

class JoinPageContainer extends Component {
  render () {
    const { history, location } = this.props;
    const commonProps = { history, location }

    return (
      <Page {...commonProps}>
          <Join { ...commonProps } />
      </Page>
    )
  }
}

JoinPageContainer.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
  }
  
JoinPageContainer.defaultProps = {
    history: {},
    location: {},
  }

export default JoinPageContainer
