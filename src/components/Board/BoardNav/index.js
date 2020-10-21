import React from 'react';
import PropTypes from 'prop-types';
import { BoardNavs, BoardNav } from './utils'

import { boardnavs } from '../../../services/constants/boardnav'

const BoardHeader = ({
    history, location, root
}) => {
    return (
        <BoardNavs>
            {boardnavs.map((boardnav, index) => (
                <BoardNav
                    key={`nav_${index}`}
                    to={`${boardnav.to ? boardnav.to : `/${boardnav.name}`}`}
                    activeClassName="active"
                    exact={boardnav.exact}
                    onClick={boardnav.onClick ? (e => boardnav.onClick(e, index)) : null}
                >{boardnav.text}</BoardNav>
            ))}
        </BoardNavs>
    )
}

BoardHeader.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    root: PropTypes.string
  }
  
  BoardHeader.defaultProps = {
    history: {},
    location: {},
    root: ''
  }

export default BoardHeader