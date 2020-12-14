import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'

export const Wrapper = styled.footer`
  padding : 1rem;
  display: block; 
  position: relative; 
  color: ${palette('darkblue', 5)}; 
`

export const Flat = styled.section`
`;

export const Copyright = styled.div`
  position:relative; 
  box-sizing: border-box;
  padding: 0.5rem;
  & > div.notice {
    padding: 0.75rem; 
    border-radius: 3px; 
    background: ${palette('muted', 19)};
    font-size: 0.8em; 
    color: ${palette('muted', 6)};
  }
  & > div.copy { 
    text-align: right; 
    padding: 0.75rem; 
    color: ${palette('muted', 3)}; 
  }
`