import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Header, StyledButton } from './utils'
import CardList from './Card';

export default ({
    history, endpoint, root, match, items, count
}) => {
    const itemsProps = { history, endpoint, root, match, items };

    return (
        <Wrapper>
            <Header>
                타이틀입니다.
                <StyledButton
                  onClick={e => [e.preventDefault(), e.stopPropagation(), history.push(`/construction/new`)]}
                >
                +
                </StyledButton>
            </Header>
            <CardList { ...itemsProps }/>
        </Wrapper>
    )
}