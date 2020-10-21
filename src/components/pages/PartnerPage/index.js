import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Partner from '../../Partner'
import Page from '../../layouts/Page'

class PartnerPageContainer extends Component {
    render () {
        const { history, location } = this.props;
        const commonProps = { history, location }

        return (
            <Page {...commonProps}>
                <Partner { ...commonProps } />
            </Page>
        )
    }
}

PartnerPageContainer.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
  }
  
PartnerPageContainer.defaultProps = {
    history: {},
    location: {},
  }

export default PartnerPageContainer
