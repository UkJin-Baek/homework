import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'

export const Paper = styled.section`
  position: relative; 
  box-sizing: border-box; 
  z-index: 1;
  background: ${palette('muted', 21)};
`;

Paper.Content = styled.div`
  padding: 1rem;  
  width: 768px;
  @media only screen and (max-width: 768px) {
    width: 75%;
    overflow-x: auto;
  }
  white-space: pre;
`;
