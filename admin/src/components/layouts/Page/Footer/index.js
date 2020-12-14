import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Wrapper, Copyright } from './utils'

const navs = {
    intro: { name: 'intro', text: '서비스소개', to: '/pages/intro' },
    privacy: { name: 'privacy', text: '개인정보처리방침', to: '/pages/privacy' },
    faq: { name: 'faq', text: '자주묻는질문', to: '/pages/faq' },
    agreement: { name: 'agreement', text: '서비스이용약관', to: '/pages/agreement' },
    news: { name: 'news', text: '공지사항', to: '/feeds/news' },
    ask: { name: 'ask', text: '1:1문의', to: '/me/feeds/ask' },
  }

function Footer() {
    return (
      <Wrapper>
        <Copyright>
          <div className="notice">
            푸터입니다
          </div>
          <div className="copy">
            <small>
              Copyright 2020,  All Right Reserved.
            </small>
          </div>
        </Copyright>
      </Wrapper>
    )
  }

  Footer.propTypes = {
    fluid: PropTypes.bool,
  }
  
  Footer.defaultProps = {
    fluid: false,
  }

  export default Footer