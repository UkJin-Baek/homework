import React, {  useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Logo, HeaderLogo, Grid, Menus, Navs, Hamburger } from './utils'

import { navs } from 'src/services/constants/nav'
import ResponsiveMenu from 'react-responsive-navbar';

function Header({ user, history, location, match, navs, me }) {
  const [showNav, setShowNav] = useState(false)

  const toggleNav = () => {
    setShowNav(!showNav)
  }
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
              setShowNav(false)
            }
        }

        // Bind the event listener
        document.addEventListener("scroll", handleClickOutside);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("scroll", handleClickOutside);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  // { name: 'home', text: '회사소개', exact: true, to: '/'},
  // { name: 'construction', text: '공사현황', to: '/construction' },
  // { name: 'partner', text: '협력업체', to: '/partner' },
  // { name: 'board', text: '게시판', to: '/board' }

  navs = {}
  navs['home'] = { name: 'home', text: '회사소개', exact: true, to: '/' };
  navs['construction'] = { name: 'construction', text: '공사현황', to: '/construction' };
  navs['partner'] = { name: 'partner', text: '협력업체', to: '/partner' };
  navs['board'] = { name: 'board', text: '게시판', to: '/board' };

  const menus = {}

  return (
    <Wrapper ref={wrapperRef}>
      <Grid between showNav>
        <Hamburger className={`${showNav ? `showNav` : ``}`}
          onClick={toggleNav}
        ><div/><div/><div/></Hamburger>
        <HeaderLogo className={`${showNav ? `showNav` : ``}`}><Logo image={'logo192.png'}/></HeaderLogo>
        <Navs  className={`${showNav ? `showNav` : ``}`}>
          <Navs.Items showNav>
            {Object.keys(navs).map(k => (navs[k])).map((nav, key) => (
              <Navs.Item
                key={`nav_${key}`}
                to={`${nav.to ? nav.to : `/${nav.name}`}`}
                activeClassName="active"
                exact={nav.exact}
                onClick={nav.onClick ? (e => [setShowNav(false), nav.onClick(e, key)]) : null}
              >
                {nav.text}
              </Navs.Item>
            ))}
          </Navs.Items>
        </Navs>
        <Menus className={`${showNav ? `showNav` : ``}`}>
          <Menus.Items>
            {Object.keys(menus).map(k => (menus[k])).map((menu, key) => (
              <Menus.Item
                key={`menu_${key}`}
                to={`${menu.to ? menu.to : `/${menu.name}`}`}
                activeClassName="active"
                exact={menu.exact}
                onClick={menu.onClick ? (e => [setShowNav(false), menu.onClick(e, key)]) : null}
              >
                {menu.text}
              </Menus.Item>
            ))}
          </Menus.Items>
        </Menus>
        
      </Grid>
    </Wrapper>
  )
}

Header.propTypes = {
  fluid: PropTypes.bool,
  user: PropTypes.object,
  logoutUser: PropTypes.func,

  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,

  navs: PropTypes.object,
}

Header.defaultProps = {
  fluid: false,
  user: {},
  logoutUser: () => {},
  
  history: {},
  location: {},
  match: {},

  navs: {},
}

export default Header