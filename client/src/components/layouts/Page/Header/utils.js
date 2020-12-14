import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Link from 'src/components/utils/Link'
import Logo from 'src/components/utils/Logo'
export { Logo }

export const Wrapper = styled.header`
  display: block; position: relative; box-shadow: 0 0 5px ${palette('muted', 12)};
  @media screen and (max-width: 980px) {
    height: 5rem;
    z-index: 4;
  }
  `

export const Grid = styled.section`
  position: relative; box-sizing: border-box;
  display: flex; align-items: center;
  padding: 0; max-width: 1100px; margin: 0 auto;
  justify-content: left;
  ${props => props.between ? `justify-content: space-between;` : null}
  @media screen and (max-width: 980px) {
    position: fixed;
  }
  
`
export const Hamburger = styled.div`
  display: none;
  position: absolute;
  padding: 1.4rem;
  top: 100%;
  z-index: 5;
  text-align: -webkit-center;
  & > div {
    width: 30px;
    height: 4px;
    background-color: darkgray;
    margin: 4px 0;
    transition: all 0.3s;
  }
  &.showNav {
    padding-top: 2rem;
  }
  &.showNav > div:nth-child(2) {
    width: 0;
  }
  &.showNav > div:nth-child(3) {
    transform: rotate( -45deg );
    margin-top: -1rem;
    width: 20px;
    height: 4px;
  }
  &.showNav > div:first-child {
    width: 20px;
    transform: rotate( 45deg );
    height: 4px;
  }
  @media screen and (max-width: 980px) { 
    display: block;
  }
`

export const HeaderLogo = styled.div`
  position: relative; box-sizing: border-box;
  display: flex; align-items: center; cursor: pointer;
  padding: 0.90rem 0;
  @media screen and (max-width: 980px) { 
    position: absolute;
    padding: 0.90rem; 
    background: #fff;
    place-content: center;
    top: 50%;
    left: 50%;
    width: 100vw;
  }
  & > img { 
    max-height: 3.6rem;
    @media screen and (max-width: 980px) { 
      max-height: 3rem;
    }
  }
`

export const Navs = styled.div`
  position: relative; box-sizing: border-box; 
  flex: 1 1 100%; max-width: 100%; text-align: center;
    @media screen and (max-width: 980px) {
    position: absolute;
    display: block;    
    padding: 5rem 11.5rem 30rem 1rem;
    background: ${palette('muted', 21)};
    border-radius: 3px;
    font-size: 1rem;
    
    top: 100%;
    left: -17rem;
    transition: all 0.3s;
    &.showNav {
      box-shadow: 0px 50px 50px ${palette('muted', 12)}; 
      left: 0rem;
    }
  }
`

Navs.Items = styled.nav`
  display: flex; position: relative; box-sizing: border-box; overflow: hidden;
  place-content: center;
  @media only screen and (max-width: 980px) { 
    overflow-y: hidden; overflow-x: auto; 
    display: table-cell; 
  }
`

Navs.Item = styled(Link)`
  display: block; position: relative; box-sizing: border-box; padding: 0.5rem 1.25rem; border-radius: 3px;
  margin-left: 1em; margin-right: 1em;
  font-family: ${font('primary')}; font-weight: 700; font-size: 1.10em; letter-spacing: -0.1rem; color: ${palette('darkblue', 3)}; white-space: pre;
  text-decoration: none; transition: all 0.3s; border-bottom: 3px solid transparent;
  @media screen and (max-width: 980px) { 
    padding: 0.5em 1.15rem; 
  }
  &:hover { color: ${palette('darkblue', 1)}; text-decoration: none; border-bottom: 3px solid ${palette('darkblue', 15)}; }
  &.active { color: ${palette('darkblue', 1)}; text-decoration: none; border-bottom: 3px solid ${palette('darkblue', 1)}; }
`

export const Menus = styled.div`
  position: relative; box-sizing: border-box; 
  @media screen and (max-width: 980px) { 
    padding: 0 0.90rem;
    position: absolute;
    display: block;
    transition: all 0.3s;
    margin: 0 0 -51rem 3rem;
    left: -17rem;
    &.showNav {
      border-top: 1px solid lightgray;
      left: 0rem;
    }
    &.showNav a {
      font-size: 0.8rem;
    }
  }
`

Menus.Items = styled.div`
  display: flex; position: relative; box-sizing: border-box; 
  @media screen and (max-width: 980px) { overflow-y: hidden; overflow-x: auto; flex-wrap: wrap; place-content: center; }
`

Menus.Item = styled(Link)`
  display: block; position: relative; box-sizing: border-box; padding: 0.5rem 0.5rem; border-radius: 3px;
  font-family: ${font('primary')}; font-weight: 500; font-size: 0.95em; letter-spacing: -0.1rem; color: ${palette('darkblue', 6)}; white-space: pre;
  text-decoration: none; transition: all 0.3s; cursor: pointer;
  &:hover { color: ${palette('darkblue', 3)}; font-weight: 700; text-decoration: none; }
`
