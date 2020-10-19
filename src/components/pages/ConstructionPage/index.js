import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Construction from '../../Construction'
import Page from '../../layouts/Page'

class ConstructionPageContainer extends Component {
    render () {
        const { history, location, root, match } = this.props;
        const commonProps = { history, location, root, match }

        return (
            <Page {...commonProps}>
                    <Construction { ...commonProps } />
            </Page>
        )
    }
}

ConstructionPageContainer.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    root: PropTypes.string
}
  
ConstructionPageContainer.defaultProps = {
    history: {},
    location: {},
    match: {},
    root:''
  }

export default ConstructionPageContainer
