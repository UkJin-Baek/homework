import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navs, Nav, Wrapper } from './utils'

import { navs } from '../../../../services/constants/nav'

class Header extends Component {

// const Header = ({
//     history, location, root
// }) => {
    constructor (props) {
        super(props);

        this.showSideMenu = this.showSideMenu.bind(this)
        this.closeSideMenu = this.closeSideMenu.bind(this)

        this.state = this.initialState(props)
    }

    initialState(props = this.props) {
        const state = {
            sideMenu: null
        }
        return state
    }
    
    showSideMenu () {
        this.setState({
            sideMenu: true
        });
    }

    closeSideMenu () {
        this.setState({
            sideMenu: false
        })
    }
    
    render () {
        return (
        <Wrapper >
            <Navs >
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
        </Wrapper>
        )
    }
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