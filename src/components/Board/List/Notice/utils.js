import styled from 'styled-components';

export const Notices = styled.div`
    position: relative; box-sizing: border-box;
    display: flex; flex-wrap: wrap; z-index: 1;
`;

export const Notice = styled.div`
    width: 25%;
    overflow: hidden;
    @media only screen and (max-width: 768px) {
        width: 50%;
        overflow-x: auto;
    }
`;

Notice.Title = styled.div``;

Notice.Desc = styled.div``;