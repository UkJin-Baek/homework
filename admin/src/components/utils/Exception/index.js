import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper, Icon, Message, Buttons, Button,
} from './utils'
export { Wrapper, Icon, Message, Buttons, Button }

function Exception({
  history, message, buttonText, returnUrl
}) {
  return (
    <Wrapper>
      <Icon>
        X
      </Icon>
      <Message>
        <header>{message}</header>
        <code></code>
      </Message>
      <Buttons>
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            return history && history.push && history.push(returnUrl || '/home') || null
          }}
        >
          {buttonText || `돌아가기`}
        </Button>
      </Buttons>
    </Wrapper>
  )
}

Exception.propTypes = {
  history: PropTypes.object,
  message: PropTypes.node,
  returnUrl: PropTypes.string,
  buttonText: PropTypes.string,
  src: PropTypes.string
}

Exception.defaultProps = {
  history: {},
  message: <>에러가 발생했습니다<br/>고객센터로 문의해 주세요</>,
  returnUrl: '',
  src: 'error.png'
}

export default Exception
