import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BoardDetail from '../../BoardDetail'
import Page from '../../layouts/Page'

class BoardDetailPageContainer extends Component {
    render () {
        const { history, location, root, match } = this.props;
        const commonProps = { history, location, root, match }

        return (
            <Page {...commonProps}>
                <BoardDetail { ...commonProps } />
            </Page>
        )
    }
}

BoardDetailPageContainer.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    root: PropTypes.string
}
  
BoardDetailPageContainer.defaultProps = {
    history: {},
    location: {},
    match: {},
    root:''
  }

export default BoardDetailPageContainer
