import styled, { css }from 'styled-components';
import { font, palette} from 'styled-theme'
import Link from '../../../utils/Link'

export const Wrapper = styled.nav`
    
`;

export const Navs = styled.nav`
    display: flex;
    padding: 1rem;
    width: 70%;
    margin: 0 auto;
    
    @media screen and (max-width: 768px) {
        // flex-direction: column;
        display: list-item;

        text-align: center;
        width: 100%;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        
        overflow-x: auto;
      
    }

`;

export const Nav = styled(Link)`
    
    font-size: 1.2rem;
    cursor: pointer;
    white-space: pre;
    text-decoration: none;
    padding-bottom: 0.25rem;

    font-weight: 600;

    color: black;
    &:hover {
        color: #495057;
    }

    & + & {
        margin-left: 1rem;
    }
    @media screen and (max-width: 768px) {
        font-size: 5vmin;
        cursor: pointer;
        white-space: pre;
        text-decoration: none;
        padding-bottom: 1rem;
        font-weight: 600;
 
        color: black;
        &:hover {
            color: #495057;
        }
    }
`;