import React from 'react';
import styled from 'styled-components';

const categories = [
    {
        name: 'intro',
        text: '회사소개'
    },
    {
        name: 'constructionStatus',
        text: '공사현황'
    },
    {
        name: 'partnerCompany',
        text: '협력업체'
    },
    {
        name: 'board',
        text: '게시판'
    }
];

const CategoriesBlock = styled.div`
    display: flex;
    padding: 1rem;
    width: 768px;
    margin: 0 auto;
    @media screen and (max-width: 768) {
        width: 100%;
        overflow-x: auto;
    }
`;

const Category = styled.div`
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

const Categories = () => {
    return (
        <CategoriesBlock>
            {categories.map(c => (
                <Category key={c.name}>{c.text}</Category>
            ))}
        </CategoriesBlock>
    )
}

export default Categories;