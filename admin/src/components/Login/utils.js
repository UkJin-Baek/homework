import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'
import { Field, InputControl, SelectControl, CheckControl } from 'src/components/utils/Field'
export { Field, InputControl, SelectControl, CheckControl }

const shadowWrapperCSS = css`
  border-radius: 3px; box-shadow: 0 0 5px ${palette('muted', 12)}; background: ${palette('muted', 21)};
  transition: all 0.3s;
  &:hover { box-shadow: 0 0 50px ${palette('muted', 12)}; }
`

export const Wrapper = styled.div`
  display: block; box-sizing: border-box; padding: 1rem;
  ${props => props.usedShadow ? shadowWrapperCSS : null}
`

export const Navs = styled.nav`
  display: flex; border-bottom: 3px solid ${palette('muted', 14)};
`

export const Nav = styled.a`
  flex: 1 1 100%; min-width: 0; text-align: center; white-space: pre;// transition: all 0.3s;
  text-decoration: none; font-family: ${font('primary')}; font-weight: 500;
  padding: 1rem 0; font-size: 1em; color: ${palette('muted', 5)};
  white-space: pre; text-overflow: ellipsis; overflow: hidden;
  &:hover { color: ${palette('darkblue', 5)}; }
  &.active { color: ${palette('darkblue', 5)}; border-bottom: 7px solid ${palette('info', 7)}; font-weight: 700; }
`

export const Box = styled.form`
  display: block; box-sizing: border-box; padding: 1rem 0;
`

export const Buttons = styled.div`
  position: relative; margin-bottom: -0.5rem;
  & > * { margin: 0.5rem 0; }
`

export const Button = styled.button`
  display: block; font-size: 1.1em; outline: none; box-sizing: border-box; cursor: pointer;
  min-width: 100%; text-align: center; border: 0; padding: 0.75rem; transition: all 0.3s;
  font-family: ${font('primary')}; font-weight: 700; color: ${palette('darkblue', 5)}; border-radius: 3px;
  &:focus { background: ${palette('muted', 15)}; }
  &.primary { background: ${palette('darkblue', 3)}; color: ${palette('muted', 15)}; }
`

export const Message = styled.div`
  padding: 1rem;
`

export const Icon = styled.div`
  font-size: 6em; text-align: center; padding: 1.5rem 0;
  color: ${palette('darkblue', 5)};
`

export const Mention = styled.div`
  font-size: 1.6em; font-family: ${font('primary')}; font-weight: 700; letter-spacing: -0.1rem;
  text-align: center; color: ${palette('darkblue', 5)};
`