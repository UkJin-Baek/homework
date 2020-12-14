import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 50%;
    @media screen and (max-width: 480px) {
        width: 100%;
      }
`;

Wrapper.Img = styled.div`
    width: 100%;
`;

export const Title = styled.div`
    text-align: left;
`;

export const Square = styled.div`
    width: 0.5rem;
    height: 1rem;
    background: #93a6cc;
    float: left;
    position: relative;
`;
