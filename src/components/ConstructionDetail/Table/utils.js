import styled from 'styled-components';

export const Tab = styled.table`
  width: 100%;
  @media only screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;
Tab.Row = styled.tr`
  
`;
Tab.Body = styled.tbody``;

Tab.Key = styled.td`
  text-align: right;
  padding-right: 3px;
  width: 33%;
`;

Tab.Val = styled.td`
  width: 66%;
`;