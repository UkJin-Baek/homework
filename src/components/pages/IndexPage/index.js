import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Index from '../../Home'
import Page from '../../layouts/Page'

class IndexPageContainer extends Component {
    render () {
        const { history, location } = this.props;
        const commonProps = { history, location }

        return (
            <Page {...commonProps}>
                <Index { ...commonProps } />
            </Page>
        )
    }
}

IndexPageContainer.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
  }
  
IndexPageContainer.defaultProps = {
    history: {},
    location: {},
  }

export default IndexPageContainer
