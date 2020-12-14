import React from 'react';
import PropTypes from 'prop-types';
import { Card, Cards } from './utils';

const CardList = ({history, root, endpoint, items, match}) => {
  const moveView = (item) => {
    // const uri = `${root === '/' ? `${endpoint}` : (root.slice(-1) === '/' ? root : `${root}/`)}${item.id}`
    // console.log(endpoint);
    // console.log(root);
    return history.push(`/${endpoint}/${item.id}`);
  }
  return (
    <Cards>
      {items.map((item, key) =>
        <Card key={`ItemsAsCards_Item_${key}`} onClick={e => [e.stopPropagation(), e.preventDefault(), moveView(item)]}>
          <Card.Thumb>
            <img src={`${item.logo?.endpoint}${item.logo?.path}`} alt={'썸네일 이미지'}/>
          </Card.Thumb>
          <Card.Title>
            {item.title}
          </Card.Title>
          <Card.Desc>
            {item.description}
          </Card.Desc>
        </Card>
      )}
    </Cards>
  )
}

CardList.propTypes = {
  history: PropTypes.object,
  endpoint: PropTypes.string,
  root: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
}

CardList.defaultProps = {
  history: {},
  endpoint: '',
  root: '',
  items: [],
}

export default CardList;