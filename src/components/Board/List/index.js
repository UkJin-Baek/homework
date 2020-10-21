import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Header } from './utils'
import NoticeList from './Notice';

export default ({
    history, endpoint, root, match, notices, count
}) => {
    const itemsProps = { history, endpoint, root, match, notices };

    return (
        <Wrapper>
            <Header>
                타이틀입니다.
            </Header>
            <div>총 {count}개</div>
            <NoticeList { ...itemsProps }/>
        </Wrapper>
    )
}