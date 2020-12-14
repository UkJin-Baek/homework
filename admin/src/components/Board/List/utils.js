import styled from 'styled-components';

export const Wrapper = styled.div`
    // background-color: #cf3
    padding: 1rem;    
    width: 768px;
    margin: 0 auto;
    @media only screen and (max-width: 768px) {
        width: 100%;
        overflow-x: auto;
    }
`;

export const Header = styled.div`
    // background-color: #cf3
`;

export const Title = styled.div`
    text-align: center;
    font-size: 20px;
    background-color: #ffff77
`;