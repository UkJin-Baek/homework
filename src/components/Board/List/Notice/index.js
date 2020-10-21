import React from 'react';
import PropTypes from 'prop-types';
import { Notice, Notices } from './utils';

const NoticeList = ({history, root, endpoint, notices, match}) => {
  const moveView = (item) => {
    // const uri = `${root === '/' ? `${endpoint}` : (root.slice(-1) === '/' ? root : `${root}/`)}${item.id}`
    // console.log(endpoint);
    // console.log(root);
    return history.push(`/${endpoint}/${item.id}`);
  }

  return (
    <Notices>
      {notices.map((item, key) =>
        <Notice key={`ItemsAsNotices_Item_${key}`} onClick={e => [e.stopPropagation(), e.preventDefault(), moveView(item)]}>
          <Notice.Title>
            {item.title}
          </Notice.Title>
          <Notice.Desc>
            {item.description}
          </Notice.Desc>
        </Notice>
      )}
    </Notices>
  )
}

NoticeList.propTypes = {
  history: PropTypes.object,
  endpoint: PropTypes.string,
  root: PropTypes.string,
  notices: PropTypes.arrayOf(PropTypes.object),
}

NoticeList.defaultProps = {
  history: {},
  endpoint: '',
  root: '',
  notices: [],
}

export default NoticeList;