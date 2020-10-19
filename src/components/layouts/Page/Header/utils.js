import styled from 'styled-components';
import { font, palette } from 'styled-theme'
import Link from '../../../utils/Link'

export const Navs = styled.div`
    display: flex;
    padding: 1rem;
    width: 768px;
    margin: 0 auto;
    @media only screen and (max-width: 768px) {
        width: 100%;
        overflow-x: auto;
    }
`;

export const Nav = styled(Link)`
    font-size: 1.125rem;
    cursor: pointer;
    white-space: pre;
    text-decoration: none;
    color: inhert;
    padding-bottom: 0.25rem;

    &:hover {
        color: #495057;
    }

    & + & {
        margin-left: 1rem;
    }
`;