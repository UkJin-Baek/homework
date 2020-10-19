import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'

export const Paper = styled.section`
  position: relative; box-sizing: border-box; z-index: 1;
  background: ${palette('muted', 21)};
`;