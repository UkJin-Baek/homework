import styled from 'styled-components';

export const Tab = styled.table`
  width: 75%;
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
width: 50%;
`;

Tab.Body = styled.tbody``;

Tab.Date = styled.td`
  // width: 50%;
`;

Tab.Desc = styled.td`
  // width: 50%;
  text-overflow:ellipsis; 
  overflow:hidden; 
  white-space:nowrap;
`;