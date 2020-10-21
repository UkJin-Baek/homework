import React from 'react';
import PropTypes from 'prop-types';
import { Navs, Nav } from './utils'

import { navs } from 'src/services/constants/nav'

const Header = ({
    history, location, root
}) => {
    return (
        <Navs>
            {navs.map((nav, index) => (
                <Nav
                    key={`nav_${index}`}
                    to={`${nav.to ? nav.to : `/${nav.name}`}`}
                    activeClassName="active"
                    exact={nav.exact}
                    onClick={nav.onClick ? (e => nav.onClick(e, index)) : null}
                >{nav.text}</Nav>
            ))}
        </Navs>
    )
}

Header.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    root: PropTypes.string
  }
  
Header.defaultProps = {
    history: {},
    location: {},
    root: ''
  }

export default Header