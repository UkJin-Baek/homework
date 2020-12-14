import styled, { css } from 'styled-components'
import { font, palette, size } from 'styled-theme'

const FormSet = styled.section`
  position: relative; box-sizing: border-box; z-index: 1;
  & .inline {
    display: flex;
  }
  & .inline > div {
    width: -webkit-fill-available;
  }
  & .inline > div.left { margin-right: .4rem; }
  & .inline > div.right { margin-left: .4rem; }
`

FormSet.Box = styled.div`
  // display: flex;
  box-sizing: border-box;  margin-bottom: 1rem; padding: 0.5rem;
  border-radius: 5px; box-shadow: 0 0 5px ${palette('muted', 12)}; background: ${palette('muted', 21)};
  @media screen and (max-width: 980px) { flex-direction: column; }
  &:hover { box-shadow: 0 0 50px ${palette('muted', 12)}; }
`

FormSet.Header = styled.header`
  position: relative; box-sizing: border-box; min-width: max-content; margin-left: 0.4rem;
  padding: 0.5rem; font-size: 1.3rem; font-weight: 700; color: ${palette('darkblue', 1)};
  @media screen and (max-width: 480px) { font-size: 1.1rem; }
  &.min-width {
    min-width: 200px;
    @media screen and (max-width: 480px) { min-width: 0; }

  }
`

FormSet.Content = styled.section`
  flex: 1 1 auto;
  position: relative; box-sizing: border-box;
  padding: 0.5rem; color: ${palette('muted', 3)};
`

export default FormSet

