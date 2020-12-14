import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Header, Title } from './utils'
import NoticeList from './Notice';
import BoardHeader from '../BoardNav'

export default ({
    history, endpoint, root, match, notices, count
}) => {
    const itemsProps = { history, endpoint, root, match, notices };

    return (
        <Wrapper>
            <Header>
                <BoardHeader />
            </Header>
            <NoticeList { ...itemsProps }/>
        </Wrapper>
    )
}