import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { 
  Wrapper, Navs, Nav, Field, InputControl, SelectControl, CheckControl, Buttons, Button
} from './utils'
import * as actions from 'src/store/actions'
import { fromUser } from 'src/store/selectors'
import { instanceOf } from 'prop-types';

class LoginFormContainer extends Component {

  constructor(props) {
    super(props)
    this.handleLoginForm = this.handleLoginForm.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)

    this.initialState = this.initialState.bind(this)
    this.initialize = this.initialize.bind(this)
    this.state = this.initialState(props)
  }

  componentDidMount() {
    this._mounted = true
    this.initialize()
  }

  componentDidUpdate(prevProps) {
    if (!this._mounted) { return }
    const curProps = this.props
    if (prevProps.itemId !== curProps.itemId) { return this.setState(this.initialState(curProps), () => this.initialize()) }
    if (JSON.stringify(prevProps.user) !== JSON.stringify(curProps.user)) { return this.setState(this.initialState(curProps), () => this.initialize()) }
  }

  componentWillUnmount() {
    this._mounted = false
  }

  initialState(props = this.props) {
    return { 
      loading: true, error: false,

      loginForm: {
        identifier: '',
        password: '',
        usedSafetyLogin: false,
      },
      loginSuccessUrl: props.loginSuccessUrl || null,
      loginFailedUrl: props.loginFailedUrl || null,
    }
  }

  initialize() {
    if (!this._mounted) { return }

    const { user } = this.props
    if (!user._prepare) { return }

    this.setState({loading: false})
  }

  handleLoginForm(form = {}, cb = () => {}) {
    const next = {
      ...this.state.loginForm,
      ...form,
    }
    return this.setState({
      loginForm: next,
    }, () => {
      return cb ? cb(next) : null 
    })
  }

  handleLoginSubmit() {
    const { loginUser, history, cookies } = this.props
    const { loginForm, loginSuccessUrl } = this.state
    const { identifier, password, usedSafetyLogin } = loginForm

    if (!identifier) { return alert('이메일을 기재해주세요.') }
    // if (!emailValidator.test(identifier)) { return alert('이메일을 정확하게 입력해주셔야합니다.') }
    if (!password || password.length < 8) { return alert('비밀번호는 8자리 이상을 입력해야합니다.') }

    return loginUser(identifier, password, usedSafetyLogin, (err, user, safetyLogin) => {
      if (err) { return alert('이메일 또는 비밀번호를 재확인해주세요.') }

      return history.push(loginSuccessUrl)
    })
  }

  render() {
    const { user, history, location, match, usedShadow } = this.props
    const { handleLoginForm, handleLoginSubmit,} = this
    const { loginForm, loginSuccessUrl, loginFailedUrl, loading } = this.state
    const form = { ...loginForm }
    const navs = {
      login: { name: 'login', text: '로그인' },
    }
    
    console.log(form);
    const commonProps = { user, history, location, match }
    
    if (loading) { return null }
    // if (error) { return <Exception message={error} returnUrl={'/'} {...commonProps} /> }

    return (
      <Wrapper className="animated fadeInUp" usedShadow={usedShadow}>
        <Navs>
          {Object.keys(navs).map(k => navs[k]).map((nav, index) => 
            <Nav
              key={`nav_${index}`}
              href={`#${nav.name}`}
              className={nav.active ? 'active' : null}
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
					<Field>
						<div className="control">
							<InputControl
								type="text"
								placeholder="이메일"
								value={form.identifier || ''}
								onChange={(e) => handleLoginForm({ identifier: e.target.value })}
							/>
							<div className="icon">🆔</div>
						</div>
						<div className="description">
							이메일 주소를 입력해주세요.
						</div>
					</Field>
					<Field>
						<div className="control">
							<InputControl
								type="password"
								placeholder="비밀번호"
								value={form.password}
								onChange={(e) => handleLoginForm({ password: e.target.value })}
								onKeyPress={(e) => e.key === 'Enter' ? handleLoginSubmit() : null}
							/>
							<div className="icon">🔒</div>
						</div>
						<div className="description">
							비밀번호는 최소 8자리를 입력해야 합니다.
						</div>
					</Field>
					{/* <CheckControl
						onClick={(e) => {
							e.stopPropagation()
							e.preventDefault()
							return handleLoginForm({ usedSafetyLogin: !form.usedSafetyLogin ? true : false })
						}}
					>
						<div className="buttons">
							<button type="button" className={form.usedSafetyLogin ? "active" : null}><Lnr c="check" /></button>
						</div>
						<div className="label">자동로그인</div>
					</CheckControl> */}
					<Buttons>
						<Button
							type="button"
							className="primary"
							onClick={(e) => {
								e.stopPropagation()
								e.preventDefault()
								return handleLoginSubmit()
							}}
						>
							로그인
						</Button>
						<Button
							type="button"
							onClick={(e) => {
								e.stopPropagation()
								e.preventDefault()
								return history.push('/join')
							}}
						>
							무료 회원가입
						</Button>
					</Buttons>
				{/* </Box> */}
      </Wrapper>
    )
  }
}

LoginFormContainer.propTypes = {
  loginUser: PropTypes.func,
  findUser: PropTypes.func,
  user: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  nav: PropTypes.string,
  usedShadow: PropTypes.bool,
  loginSuccessUrl: PropTypes.string,
  loginFailedUrl: PropTypes.string,
  findSuccessUrl: PropTypes.string,
  findFailedUrl: PropTypes.string,
}

LoginFormContainer.defaultProps = {
  loginUser: () => {},
  findUser: () => {},
  user: {},
  history: {},
  location: {},
  match: {},
  nav: 'login',
  loginSuccessUrl: '/home',
  loginFailedUrl: '',
  findSuccessUrl: '',
  findFailedUrl: '',
  usedShadow: false,
}

const mapStateToProps = (state) => ({
  user: fromUser.getInfo(state)
})

const mapDispatchToProps = (dispatch) => ({
  prepareUser: (token, safetyLogin, callback) => dispatch(actions.prepareUser(token, safetyLogin, callback)),
  loginUser: (identifier, password, usedSafetyLogin, callback) => dispatch(actions.loginUser(identifier, password, usedSafetyLogin, callback)),
  findUser: (what, method, identifier, callback) => dispatch(actions.findUser(what, method, identifier, callback))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer))
