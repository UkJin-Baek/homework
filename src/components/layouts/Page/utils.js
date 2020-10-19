import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'

export const Paper = styled.section`
  position: relative; 
  box-sizing: border-box; 
  z-index: 1;
  background: ${palette('muted', 21)};
`;

Paper.Content = styled.article`
  padding: 1rem;  
  width: 768px;
  white-space: pre;
  @media only screen and (max-width: 768px) {
    padding: 0;
    width: 100%;
    overflow-x: auto;
  }
`;
