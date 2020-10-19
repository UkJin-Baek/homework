import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from './utils';

const Table = ({
    history, 
    root, 
    endpoint,  
    match,
    description,
    constructionArea,
    startDate,
    endDate
}) => {
  return (
    <Tab>
        <Tab.Row>
            <Tab.Key>위치</Tab.Key>
            <Tab.Val>{constructionArea.area}</Tab.Val>
        </Tab.Row>

        <Tab.Row>
            <Tab.Key>공사기간</Tab.Key>
            <Tab.Val>{startDate} ~ {endDate}</Tab.Val>
        </Tab.Row>

        <Tab.Row>
            <Tab.Key>실적개요</Tab.Key>
            <Tab.Val>{description}</Tab.Val>
        </Tab.Row>
    </Tab>
  )
}

Table.propTypes = {
  history: PropTypes.object,
  endpoint: PropTypes.string,
  root: PropTypes.string,
  description: PropTypes.string,
  constructionArea: PropTypes.object,
  startDate: PropTypes.any,
  endDate: PropTypes.any,
}

Table.defaultProps = {
  history: {},
  endpoint: '',
  root: '',
  description: '',
  constructionArea: {},
  startDate: '',
  endDate: '',
}

export default Table;