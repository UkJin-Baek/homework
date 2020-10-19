import styled from 'styled-components';

export const Tab = styled.table`
  width: 75%;
  text-align: center;
  @media only screen and (max-width: 768px) {
    width: 90%;
    overflow-x: auto;
  }
`;
Tab.Row = styled.tr`
  
`;
Tab.Head = styled.thead``;
Tab.Col = styled.th`
  
`;

Tab.Body = styled.tbody``;

Tab.Date = styled.td`
  width: 50%;
`;

Tab.Desc = styled.td`
  width: 50%;
`;