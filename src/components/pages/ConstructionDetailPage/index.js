import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import ConstructionDetail from '../../ConstructionDetail'
import Page from '../../layouts/Page'

class ConstructionDetailPageContainer extends Component {
    render () {
        const { history, location, root, match } = this.props;
        const commonProps = { history, location, root, match }

        return (
            <Page {...commonProps}>
                <ConstructionDetail { ...commonProps } />
            </Page>
        )
    }
}

ConstructionDetailPageContainer.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    root: PropTypes.string
}
  
ConstructionDetailPageContainer.defaultProps = {
    history: {},
    location: {},
    match: {},
    root:''
  }

export default ConstructionDetailPageContainer
