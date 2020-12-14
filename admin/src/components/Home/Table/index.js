import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab, InputControl, Calendar } from './utils';
import moment from 'src/services/moment'
import _ from 'lodash'
const Table = ({
    history, 
    root, 
    endpoint,  
    match,
    histories,
    handle,
    handleSaveHistory
}) => {
  const [cal, setCal] = useState(-1)
  return (
    <Tab>
        <Tab.Head>
            <Tab.Row>
                <Tab.Col className="num">순번</Tab.Col>
                <Tab.Col className="time">일시</Tab.Col>
                <Tab.Col className="description">내용</Tab.Col>
                <Tab.Col className="control">관리</Tab.Col>
            </Tab.Row>
        </Tab.Head>
        <Tab.Body>
        <Tab.Row>
          <Tab.Num>new</Tab.Num>
            <Tab.Date>
              <InputControl 
                readOnly
                value={moment(_.get(histories, `new.publishedAt`)).format('YYYY.MM.DD') || ''}
                onClick={e => [e.preventDefault(), e.stopPropagation(), setCal(-1)]}
                style={{display: cal === -1 ? 'none' : 'block'}}
              />
              <div
                style={{display: cal === -1 ? 'flex' : 'none'}}
              >
                <Calendar
                  value={_.get(histories, `new.publishedAt`) || null} 
                  onChange={
                    date => handle(`histories.new.publishedAt`, date)
                  } 
                />
                <div
                  className="close"
                  onClick={e => [e.preventDefault(), e.stopPropagation(), setCal()]}
                >X</div>
              </div>
            </Tab.Date>
            <Tab.Desc>
              <InputControl
                value={_.get(histories, `new.description`) || ''}
                onChange={e => [e.preventDefault(), e.stopPropagation(), handle(`histories.new.description`, e.target.value )]}
              />
            </Tab.Desc>
            <Tab.Cont>
              <div 
                onClick={e => [e.preventDefault(), e.stopPropagation(), handleSaveHistory('new', () => {
                  alert('적용되었습니다.')
                  setCal()
                })]}
              >
                저장
              </div>
              <div >
                삭제
              </div>
            </Tab.Cont>
        </Tab.Row>
          {Object.keys(histories).map((id, key) => 
            id !== 'new' ?
              <Tab.Row key={`Home_Table_${key}`}>
                <Tab.Num>{Object.keys(histories).length - key}</Tab.Num>
                <Tab.Date>
                  <InputControl 
                    readOnly
                    value={moment(histories[id].publishedAt).format('YYYY.MM.DD') || ''}
                    onClick={e => [e.preventDefault(), e.stopPropagation(), setCal(key)]}
                    style={{display: cal === key ? 'none' : 'block'}}
                  />
                  <div
                    style={{display: cal === key ? 'flex' : 'none'}}
                  >
                    <Calendar
                      value={histories[id].publishedAt || null} 
                      onChange={
                        date => { handle(`histories.${id}.publishedAt`, date) }
                      } 
                    />
                    <div
                      className="close"
                      onClick={e => [e.preventDefault(), e.stopPropagation(), setCal()]}
                    >X</div>
                  </div>
                </Tab.Date>
                <Tab.Desc>
                  <InputControl
                    value={histories[id].description || ''}
                    onChange={e => [e.preventDefault(), e.stopPropagation(), handle(`histories.${id}.description`, e.target.value )]}/>
                </Tab.Desc>
                <Tab.Cont>
                  <div 
                    onClick={e => [e.preventDefault(), e.stopPropagation(), handleSaveHistory(id, () => {
                      alert('적용되었습니다.')
                      setCal()
                    })]}
                  >
                    저장
                  </div>
                  <div >
                    삭제
                  </div>
                </Tab.Cont>
              </Tab.Row>
            : null
          )}
        </Tab.Body>
    </Tab>
  )
}

Table.propTypes = {
  history: PropTypes.object,
  endpoint: PropTypes.string,
  root: PropTypes.string,
  histories: PropTypes.object,
}

Table.defaultProps = {
  history: {},
  endpoint: '',
  root: '',
  histories: {},
}

export default Table;