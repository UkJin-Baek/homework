import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Footer from './Footer'

import { Paper } from './utils'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fromUser } from 'src/store/selectors'

function Page({ paperProps, headerProps, bodyProps, footerProps, children, usedScroll, ...props }) {
  React.useEffect(() => {
    if (usedScroll) { window.scrollTo(0, 0) }
  }, [props.location, usedScroll])

  return (
    <Paper {...props}  {...paperProps}>
      <Header {...props} {...headerProps} />
      <Paper.Content>
        {children}
      </Paper.Content>
      <Footer {...props} {...footerProps} />
    </Paper>
  )
}

Page.propTypes = {
  paperProps: PropTypes.object,
  headerProps: PropTypes.object,
  bodyProps: PropTypes.object,
  footerProps: PropTypes.object,
  usedScroll: PropTypes.bool,
}

Page.defaultProps = {
  paperProps: {},
  headerProps: {},
  bodyProps: {},
  footerProps: {},
  usedScroll: true,
}

const mapStateToProps = (state) => ({
  user: fromUser.getInfo(state),
})

export default withRouter(connect(mapStateToProps, null)(Page))