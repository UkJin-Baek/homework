import styled from 'styled-components';
import { palette } from 'styled-theme';

export const Cards = styled.div`
    position: relative; box-sizing: border-box;
    display: flex; flex-wrap: wrap; z-index: 1;
`;

export const Card = styled.div`
  position: relative; box-sizing: border-box; border-radius: 5px; cursor: pointer;
  overflow: hidden; transition: all 0.3s; box-shadow: 0 0 50px ${palette('muted', 7)};
  min-width: 30.29%; max-width: 30.29%; margin: 0.5rem .5rem;
  @media screen and (max-width: 960px) { min-width: calc((100% - 2rem) / 2); max-width:  calc((100% - 2rem) / 2); }
  &:hover { z-index: 2;}
`;

Card.Thumb = styled.div`
  padding : 1rem;
  & > img { width: 85%; }
`;

Card.Title = styled.div`

`;

Card.Desc = styled.div`
font-size: .8rem; padding: .5rem 0 1rem 0;
`;