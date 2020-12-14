import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from './utils';
import moment from 'src/services/moment'

const Table = ({
    history, 
    root, 
    endpoint,  
    match,
    histories
}) => {
  return (
    <Tab>
        <Tab.Head>
            <Tab.Row>
                <Tab.Col>일시</Tab.Col>
                <Tab.Col>내용</Tab.Col>
            </Tab.Row>
        </Tab.Head>
        <Tab.Body>
            {histories.map((item, key) => 
                <Tab.Row key={`Home_Table_${key}`}>
                    <Tab.Date>{moment(item.publishedAt).format('YYYY.MM.DD')}</Tab.Date>
                    <Tab.Desc>{item.description}</Tab.Desc>
                </Tab.Row>
            )}
        </Tab.Body>
    </Tab>
  )
}

Table.propTypes = {
  history: PropTypes.object,
  endpoint: PropTypes.string,
  root: PropTypes.string,
  histories: PropTypes.arrayOf(PropTypes.object),
}

Table.defaultProps = {
  history: {},
  endpoint: '',
  root: '',
  histories: [],
}

export default Table;