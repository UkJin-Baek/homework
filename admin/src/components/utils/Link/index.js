import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'
import { NavLink } from 'react-router-dom'

const StyledNavLink = styled(({ theme, reverse, palette, ...props }) => <NavLink {...props} />)``

const Anchor = styled.a``

const Link = ({ ...props }) => {
  const { to } = props
  return to ? <StyledNavLink {...props} /> : <Anchor {...props} />
}

Link.propTypes = {
  palette: PropTypes.string,
  reverse: PropTypes.bool,
  to: PropTypes.string
}

Link.defaultProps = {
  palette: 'primary'
}

export default Link
