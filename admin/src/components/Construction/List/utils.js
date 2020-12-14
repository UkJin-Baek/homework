import styled from 'styled-components';
import { palette } from 'styled-theme';

export const Wrapper = styled.div`

`;

export const Header = styled.div`
display: flex; align-items: center; justify-content: space-between;
width: 70%;
`;

export const StyledButton = styled.a`
  position: relative; box-sizing: border-box; padding: 0.5rem; transition: all 0.3s;
  text-align: center; text-decoration: none; color: ${palette('muted', 20)};
  background: ${palette('info', 7)}; min-width: max-content;
  padding: .3rem .7rem; font-weight: 700; float: right;
  border-radius: 5px;
  &:hover { background: ${palette('info', 4)}; }
  text-decoration: none;
`