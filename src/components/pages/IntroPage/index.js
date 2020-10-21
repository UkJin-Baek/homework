import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Intro from '../../Intro'
import Page from '../../layouts/Page'

class IntroPageContainer extends Component {
    render () {
        const { history, location, root, match } = this.props;
        const commonProps = { history, location, root, match }

        return (
            <Page {...commonProps}>
                    <Intro { ...commonProps } />
            </Page>
        )
    }
}

IntroPageContainer.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    root: PropTypes.string
}
  
IntroPageContainer.defaultProps = {
    history: {},
    location: {},
    match: {},
    root:''
  }

export default IntroPageContainer
