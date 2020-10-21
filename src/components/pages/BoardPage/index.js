import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Board from '../../Board'
import Page from '../../layouts/Page'

class BoardPageContainer extends Component {
    render () {
        const { history, location, root, match } = this.props;
        const commonProps = { history, location, root, match }

        return (
            <Page {...commonProps}>
                    <Board { ...commonProps } />
            </Page>
        )
    }
}

BoardPageContainer.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    root: PropTypes.string
}
  
BoardPageContainer.defaultProps = {
    history: {},
    location: {},
    match: {},
    root:''
  }

export default BoardPageContainer
