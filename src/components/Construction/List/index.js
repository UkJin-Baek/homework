import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Header } from './utils'
import CardList from './Card';

export default ({
    history, endpoint, root, match, items, count
}) => {
    const itemsProps = { history, endpoint, root, match, items };

    return (
        <Wrapper>
            <Header>
                타이틀입니다.
            </Header>
            <div>총 {count}개</div>
            <CardList { ...itemsProps }/>
        </Wrapper>
    )
}