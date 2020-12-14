import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fromUpload } from 'src/store/selectors'

import * as actions from 'src/store/actions'
import moment from 'src/services/moment'

import {
  Item, Header, Doc,
  Field, CheckControl, InputControl, SelectControl, TextareaControl,
  MultipleUploader, FormSet, Items, StyledButton
} from './utils'

const Form = ({
  user, history, location, match, me, upload,
  showModal, hideModal, readyUpload,
  item, endpoint,
  isOwner, fieldOptions, validationOptions,
  root, initialState, initialize, handle, handleSave
}) => {
  return (
    <>
    <Item className={`animated fadeIn`}>
      <Header className="animated fadeIn delay-1s">
        <Header.Title>{item.id ? `수정하기` : `등록하기`}</Header.Title>
        {/* <Header.Button href="#reset" onClick={e => ([e.stopPropagation(), e.preventDefault(), handle(initialState(), () => initialize()) ])}>새로고침</Header.Button> */}
        {/* <Header.Button href="#save" onClick={e => ([e.stopPropagation(), e.preventDefault(), handleSave()])}>작성완료</Header.Button> */}
      </Header>
      <FormSet>
        <FormSet.Box>
          <FormSet.Header style={{ minWidth: `200px` }}>기본정보</FormSet.Header>
          <FormSet.Content>

            <Field.Group>
              <Field>
                <div className="control">
                  <InputControl style={{marginRight: '.4rem'}} type="text" placeholder="회사명" value={item.name || ''} onChange={e => handle('item.name', e.target.value)} />
                  <InputControl style={{marginLeft: '.4rem'}} type="text" placeholder="사업자등록번호(-포함) " value={item.registryNumber || ''} onChange={e => handle('item.registryNumber', e.target.value)} />
                  <div className="icon"></div>
                </div>
                <div className="description">회사명칭 또는 브랜드명칭을 기재해주세요.</div>
              </Field>
            </Field.Group>
            
            <Field>
              <div className="control"><TextareaControl type="text" placeholder="기업 소개" value={item.description || ''} onChange={e => handle('item.description', e.target.value)} /></div>
              <div className="description">클라이언트에게 보여질 기업소개입니다.</div>
            </Field>

            <Field.Group>
              <Field>
                <div className="control">
                  <InputControl type="text" placeholder="대표자명" value={(item.ceo && item.ceo.name) || ''} onChange={e => handle('item.ceo.name', e.target.value)} />
                  <div className="icon"></div>
                </div>
              </Field>
              <Field>
                <div className="control">
                  <InputControl type="text" placeholder="대표연락처(-포함) " value={(item.ceo && item.ceo.mobile) || ''} onChange={e => handle('item.ceo.mobile', e.target.value)} />
                  <div className="icon"></div>
                </div>
              </Field>
            </Field.Group>

            <Field.Group>
              <Field>
                <div className="control">
                  <InputControl type="text" placeholder="주소 " value={item.location || ''} onChange={e => handle('item.location', e.target.value)} />
                  <div className="icon"></div>
                </div>
                <div className="description">예, 서울특별시 강남구</div>
              </Field>
              <Field>
                <div className="control">
                  <InputControl type="text" placeholder="홈페이지 URL " value={item.homepage || ''} onChange={e => handle('item.homepage', e.target.value)} />
                  <div className="icon"></div>
                </div>
              </Field>
            </Field.Group>

          </FormSet.Content>
        </FormSet.Box>

        <FormSet.Box className="animated fadeIn delay-2s">
          <FormSet.Header style={{ minWidth: `200px` }}>주요 프로젝트</FormSet.Header>
          <FormSet.Content>
            <Field>
              <div className="control"><TextareaControl type="text" placeholder="진행하셨던 주요 행사에 대해 작성해 주세요" value={item.details && item.details.story || ''} onChange={e => handle('item.details.story', e.target.value)} /></div>
              <div className="description">주요 프로젝트를 수행했던 이력을 적어주세요.</div>
            </Field>
          </FormSet.Content>
        </FormSet.Box>

        <div className="inline">
          <FormSet.Box className="animated fadeIn delay-2s left">
            <FormSet.Header className="min-width">회사소개서</FormSet.Header>
            <FormSet.Content>
              <MultipleUploader item={JSON.parse(JSON.stringify(item))} path={'files'} accept={`.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx`} handle={handle} />
            </FormSet.Content>
          </FormSet.Box>

          <FormSet.Box className="animated fadeIn delay-2s right">
            <FormSet.Header className="min-width">로고</FormSet.Header>
            <FormSet.Content>
              <MultipleUploader item={JSON.parse(JSON.stringify(item))} path={'logo'} accept={`image/*`} handle={handle} imgOnly maxLength={1}/>
            </FormSet.Content>
          </FormSet.Box>
        </div>

        <FormSet.Box className="animated fadeIn delay-2s">
          <FormSet.Header style={{ minWidth: `200px` }}>이미지</FormSet.Header>
          <FormSet.Content>
            <MultipleUploader item={JSON.parse(JSON.stringify(item))} path={'images'} accept={`image/*`} handle={handle} imgOnly maxLength={20}/>
          </FormSet.Content>
        </FormSet.Box>

        <FormSet.Box className="animated fadeIn delay-2s">
          <FormSet.Header style={{ minWidth: `200px` }}>담당자</FormSet.Header>
          <FormSet.Content>
            <Field.Group>
              <Field>
                <div className="control">
                  <InputControl type="text" placeholder="성명" value={(item.manager && item.manager.name) || ''} onChange={e => handle('item.manager.name', e.target.value)} />
                  <div className="icon"></div>
                </div>
              </Field> 
              <Field>
                <div className="control">
                  <InputControl type="text" placeholder="연락처(-포함) " value={(item.manager && item.manager.mobile) || ''} onChange={e => handle('item.manager.mobile', e.target.value)} />
                  <div className="icon"></div>
                </div>
              </Field>
            </Field.Group>
            <Field.Group>
              <Field>
                <div className="control">
                  <InputControl type="text" placeholder="직함" value={(item.manager && item.manager.grade) || ''} onChange={e => handle('item.manager.grade', e.target.value)} />
                  <div className="icon"></div>
                </div>
              </Field>
              <Field>
                <div className="control">
                  <InputControl type="text" placeholder="이메일 " value={(item.manager && item.manager.email) || ''} onChange={e => handle('item.manager.email', e.target.value)} />
                  <div className="icon"></div>
                </div>
              </Field>
            </Field.Group>
          </FormSet.Content>
        </FormSet.Box>
        <StyledButton href="#save" onClick={e => ([e.stopPropagation(), e.preventDefault(), handleSave()])}>등록하기</StyledButton>
      </FormSet>
    </Item>
    </>
  )
}

Form.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,

  item: PropTypes.object,

  isOwner: PropTypes.func,
  fieldOptions: PropTypes.object,
  validationOptions: PropTypes.object,

  root: PropTypes.string,
  initialState: PropTypes.func,
  handle: PropTypes.func,
  handleSave: PropTypes.func,
}
  
Form.defaultProps = {
  user: {},
  history: {},
  location: {},
  match: {},

  item: {},

  isOwner: () => {},
  fieldOptions: {},
  validationOptions: {},

  root: '',
  initialState: ()=> {},
  initialize: ()=> {},
  handle: () => {},
  handleSave: () => {},
}

const mapStateToProps = (state) => ({
  upload: fromUpload.getState(state),
})

const mapDispatchToProps = (dispatch) => ({
  readyUpload: (settings = {}, callback = () => {}) => dispatch(actions.readyUpload(settings, callback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
