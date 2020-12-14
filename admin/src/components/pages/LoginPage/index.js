import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Login from '../../Login'
import Page from '../../layouts/Page'

class LoginPageContainer extends Component {
  render () {
    const { history, location } = this.props;
    const commonProps = { history, location }

    return (
      <Page {...commonProps}>
          <Login { ...commonProps } />
      </Page>
    )
  }
}

LoginPageContainer.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
  }
  
LoginPageContainer.defaultProps = {
    history: {},
    location: {},
  }

export default LoginPageContainer
