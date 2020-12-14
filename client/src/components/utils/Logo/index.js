import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

class Logo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { history, image } = this.props
    return (
      <img
        src={`/${image}`}
        alt={`${image}`}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          return history.push('/') 
        }}
      />
    )
  }
}

Logo.propTypes = {
  history: PropTypes.object,
}

Logo.defaultProps = {
  history: {},
}

export default withRouter(Logo)
