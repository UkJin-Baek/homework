import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Wrapper, Navs, Nav, Icon, Message, Mention, Buttons, Button, Field, InputControl, SelectControl, CheckControl } from './utils'
import api from 'src/services/api'
import _ from 'lodash'
import * as actions from 'src/store/actions'
import { fromUser } from 'src/store/selectors'

class JoinFormContainer extends Component {
  constructor(props) {
    super(props)

    this.initialState = this.initialState.bind(this)

    this.handle = this.handle.bind(this)
    this.handleForm = this.handleForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = this.initialState(props)
  }

  componentDidMount() {
    this._mounted = true
  }
  
  componentDidUpdate(prevProps) {
    if (!this._mounted) { return }
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      return this.setState(this.initialState(this.props), () => this.initialize())
    }
  }
  
  componentWillUnmount() {
    this._mounted = false
  }

  initialState(props = this.props) {
    const state = {
      joinSuccessUrl: props.joinSuccessUrl || null,
      joinFailedUrl: props.joinFailedUrl || null,

      form: {
        name: '',
        password: '',
        passwordRepeat: '',
      }
    }
    return state
  }
  handle() {
    const next = { ...this.state }, values = arguments
    if (typeof values[0] === 'string') {
      _.set(next, values[0], values[1])
      return this.setState(next, () => values[2] ? values[2](null, next) : null)
    }
    if (typeof values[0] === 'object' && !values[0].length) { Object.keys(values[0]).forEach(key => _.set(next, key, values[0][key])) }
    if (typeof values[0] === 'object' && values[0].length) { values[0].forEach(e => Object.keys(e).forEach(key => _.set(next, key, e[key]))) }
    return this.setState(next, () => values[1] ? values[1](null, next) : null)
  }

  handleForm() {
    const next = { ...this.state.form }, values = arguments
    if (typeof values[0] === 'string') {
      _.set(next, values[0], values[1])
      return this.setState({ form: next }, () => values[2] ? values[2](null, next) : null)
    }
    if (typeof values[0] === 'object' && !values[0].length) { Object.keys(values[0]).forEach(key => _.set(next, key, values[0][key])) }
    if (typeof values[0] === 'object' && values[0].length) { values[0].forEach(e => Object.keys(e).forEach(key => _.set(next, key, e[key]))) }
    return this.setState({ form: next }, () => values[1] ? values[1](null, next) : null)
  }

  async handleSubmit() {
    const { prepareUser, joinSuccessUrl, joinFailedUrl, history } = this.props
    const form = this.state.form

    
    return api.get(`/users/exists/${form.userId}`)
      .then(({ exists }) => {
        if (exists) { return window.confirm('회원 가입을 이미 한 이메일 계정입니다.') }
        return api.post('/users', form)
          .then(({ token, user }) => {
            prepareUser(token, false, (err, user) => {
              if (err) { throw new Error('회원 가입은 성공적으로 진행되었지만 로그인이 되지 않았습니다.') }
              window.confirm('축하합니다! 회원가입이 성공적으로 진행되었습니다.')
              return history.push(joinSuccessUrl || '/')
            })
          })
          .catch(e => {
            alert(e.message)
            if (joinFailedUrl) { return history.push(joinFailedUrl) }
          })
      })
      .catch(e => {
        alert('중복 검사를 하던 도중 문제가 발생하였습니다.')
      })
  }

  render() {
		const { user, usedShadow, history } = this.props
		const { form } = this.state
    const { 
      handle, handleForm, handleSubmit,
    } = this
    if (!user._prepare) { return null }

    const navs = {
        join: { name: 'join', text: '회원가입' },
      }

    if (user && user.id) {
      return (
        <Wrapper className="animated fadeInUp" usedShadow={usedShadow}>
          <Message>
            <Icon>🏠</Icon>
            <Mention>
              이미 회원가입이 되었습니다.
            </Mention>
          </Message>
          <Buttons>
            <Button
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                return history.push('/')
              }}
            >
              홈으로 이동
            </Button>
          </Buttons>
        </Wrapper>
      )
    }

    return (
      <Wrapper className="animated fadeInUp" usedShadow={usedShadow}>
        <Navs>
          {Object.keys(navs).map(k => navs[k]).map((nav, index) => 
            <Nav
              key={`nav_${index}`}
              href={`#${nav.name}`}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
            >
              {nav.text}
            </Nav>
          )}
        </Navs>
				{/* <Box> */}
					<input type="password" style={{ position: 'fixed', left: '-9999999px', top: '-999999999px', width: 0, height: 0, overflow: 'hidden' }} />
					<Field>
						<div className="control">
							<InputControl type="text" placeholder="아이디 입력" defaultValue={form.userId} onChange={(e) => handleForm({ userId: e.target.value })} />
							<div className="icon">🆔</div>
						</div>
						<div className="description">아이디는 로그인시 사용됩니다.</div>
					</Field>

					<Field>
						<div className="control">
							<InputControl
								type="password"
								placeholder="비밀번호 입력"
								defaultValue={form.password}
								onChange={(e) => handleForm({ password: e.target.value })}
							/>
							<div className="icon">🔒</div>
						</div>
						<div className="description">비밀번호는 최소 8자리를 입력해야 합니다.</div>
					</Field>

					<Field>
						<div className="control">
							<InputControl
								type="password"
								placeholder="비밀번호 확인"
								defaultValue={form.passwordRepeat}
								onChange={(e) => handleForm({ passwordRepeat: e.target.value })}
							/>
							<div className="icon">🔄</div>
						</div>
						<div className="description">비밀번호는 최소 8자리를 입력해야 합니다.</div>
					</Field>

					<Field>
						<div className="control">
							<InputControl type="text" placeholder="닉네임" defaultValue={form.name} onChange={(e) => handleForm({ name: e.target.value })} />
							<div className="icon">👤</div>
						</div>
						<div className="description">자유롭게 사용할 닉네임을 설정해주세요. (3글자 이상)</div>
					</Field>

	
					<Button href={`#submit`} onClick={e => [e.stopPropagation(), e.preventDefault(), handleSubmit()]}>회원가입 하기</Button>
				{/* </Box> */}
      </Wrapper>
    )
  }
}

JoinFormContainer.propTypes = {
  user: PropTypes.object,
  prepareUser: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  nav: PropTypes.string,
  joinSuccessUrl: PropTypes.string,
  joinFailedUrl: PropTypes.string,

  usedShadow: PropTypes.bool,
}

JoinFormContainer.defaultProps = {
  user: {},
  prepareUser: () => {},
  history: {},
  location: {},
  match: {},

  joinSuccessUrl: '',
  joinFailedUrl: '',
  usedShadow: false,

}

const mapStateToProps = (state) => ({
  user: fromUser.getInfo(state),
})

const mapDispatchToProps = (dispatch) => ({
  prepareUser: (token, safetyLogin, callback) => dispatch(actions.prepareUser(token, safetyLogin, callback)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JoinFormContainer))
