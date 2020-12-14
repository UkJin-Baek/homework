import styled from 'styled-components';
import Calendar from 'src/components/utils/Calendar'
import { InputControl } from 'src/components/utils/Field'
import { palette } from 'styled-theme';
export { InputControl, Calendar }

export const Tab = styled.table`
  width: 90%;
  text-align: center;
  table-layout: fixed;
  // font-size: 0.5rem + 2vmin
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;
Tab.Row = styled.tr`
  
`;
Tab.Head = styled.thead``;
Tab.Col = styled.th`
  &.num { width: 10%; }
  &.time { width: 50%; }
  &.description { width: 30%; text-overflow:ellipsis; 
    overflow:hidden; 
    white-space:nowrap;}
  &.control { width: 15%; }
`;

Tab.Body = styled.tbody``;

Tab.Num = styled.td`
width: 5%;
`

Tab.Date = styled.td`
  width: 50%;
  & > div {
    display: flex;
    flex-flow: wrap;
  }
  & > div > div.close {
    padding: 1rem;
    margin-right: 1rem;
  }
`;

Tab.Desc = styled.td`
  width: 30%;
  text-overflow:ellipsis; 
  overflow:hidden; 
  white-space:nowrap;
`;

Tab.Cont = styled.td`
  display: flex;
  & > div { 
    padding: 15px 10px; transition: all 0.3s; margin: 0 5px;
    color: ${palette('info', 21)}; border-radius: 5px; box-shadow: 0 0 5px ${palette('muted', 12)};
    background-color: ${palette('info', 15)};
    &:hover {
      background-color: ${palette('info', 6)};
    }  
  }
`;