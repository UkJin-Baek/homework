import styled from 'styled-components';

export const Cards = styled.div`
    position: relative; box-sizing: border-box;
    display: flex; flex-wrap: wrap; z-index: 1;
`;

export const Card = styled.div`
    width: 25%;
    overflow: hidden;
    @media only screen and (max-width: 768px) {
        width: 50%;
        overflow-x: auto;
    }
`;

Card.Thumb = styled.div`
    width: 100%;
`;

Card.Title = styled.div``;

Card.Desc = styled.div``;