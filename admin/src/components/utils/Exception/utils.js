import styled from 'styled-components'
import { font, palette } from 'styled-theme'

export const Wrapper = styled.div`
  position: relative; box-sizing: border-box; z-index: 1; transition: all 0.3s;
  min-width: 380px; max-width: 380px; margin: 2rem auto; padding: 2rem 0;
  @media screen and (max-width: 980px) { min-width: auto; }
`

export const Icon = styled.div`
  position: relative; box-sizing: border-box; z-index: 1;
  font-size: 6em; color: ${palette('muted', 12)}; text-align: center;
`

export const Message = styled.div`
  position: relative; box-sizing: border-box; z-index: 1;
  text-align: center; padding: 1rem 0;
  & > header { font-weight: 700; font-family: ${font('primary')}; font-size: 1.2em; color: ${palette('muted', 4)}; }
  & > code { display: block; font-weight: 300; font-family: ${font('primary')}; font-size: 0.9em; color: ${palette('muted', 8)}; padding: 0.5rem 0; }
`

export const Buttons = styled.div`
  position: relative; box-sizing: border-box; z-index: 1; padding: 1rem 0;
  display: flex; justify-content: center; align-items: center;
`

export const Button = styled.button`
  position: relative; box-sizing: border-box; z-index: 1; cursor: pointer; outline: none;
  border-radius: 5px; padding: 0.5rem 2.5rem; border: 0; transition: all 0.6s;
  font-size: 1em; color: ${palette('muted', 20)}; background: ${palette('muted', 3)};
  &:hover { color: ${palette('muted', 2)}; background: ${palette('muted', 20)}; box-shadow: 0 0 10px ${palette('muted', 11)}; }
`
