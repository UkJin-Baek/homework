import { call, put, take, fork } from 'redux-saga/effects'
import * as actions from './actions'
import { getStorage } from './selectors'

// 회원정보의 데이터가 일치하는지 판단한다.
export function* prepareUser(payload, api) {
  const currentToken = payload && payload.token ? payload.token : null // 엑세스 토큰만 기록해둔다.
  const safetyLogin = payload.safetyLogin // 로그인했던 아이디 정보를 Base64로 기록해둔다.
  const callback = payload.callback ? payload.callback : () => {}  
  try {
    // 브라우저상에 토큰 스트링이 있다면 유효검증을 시작한다.
    if (!currentToken) { throw new Error(`토큰을 보유하고 있지 않습니다.`) }
    // console.log(`토큰 로그인을 진행중...`)
    const { token, user } = yield call([api, api.post], '/auth', { safetyLogin, access_token: currentToken })
    if (token && user && user.id) {
      yield getStorage().setItem('token', token)
      yield put(actions.loginUserSuccess(user))
      yield callback ? callback(null, user) : null
    } else {
      throw new Error(`토큰 유효하지 않았거나 만료 되었습니다.`)
    }
  // 로그인이 불가한 경우에는 프레페어는 정상적으로 처리한 것이지만, 로그인 정보는 없애줘야 보안상 이롭다.
  } catch(e) {
    // console.log(`비회원 로그인 진행중...${`(${e && e.message})`}`) // 토큰 만료, 리프레시 없음, 리프레시 토큰 만료, 진짜 계정이 없음, 서버가 꺼짐, 500에러 등
    getStorage().removeItem('token')
    getStorage().removeItem('safetyLogin')
    api.unsetToken()
    yield put(actions.prepareUserFinished())
    yield callback ? callback(e) : null
  }
}

// 비밀번호 잊어서 내 계정을 찾을 때
export function* findUser({ what, method, identifier = '', callback = () => {} }, api) {
  try {
    if (!what || !method) { yield callback ? callback(true) : alert('복구방식에 문제가 발생하였습니다.') }
    const payload = yield call([api, api.post], `/users/forget/${what}/${method}`, { [method]: identifier })
    yield callback ? callback(null, payload) : alert('해당 이메일로 복구 비밀번호를 전송하였습니다.')
  } catch (e) {
    yield callback ? callback(e) : alert('해당 계정이 존재하지 않거나, 복구 메일을 발송할 수 없습니다.')
  }
}

// 회원을 새 로그인 처리한다. (아이디와 패스워드 필요)
export function* loginUser({ identifier = '', password = '', usedSafetyLogin, callback = () => {} }, api) {
  try {
    const { token, user, safetyLogin } = yield call([api, api.post], '/auth/login', { usedSafetyLogin }, { headers: { 'Authorization': `Basic ${btoa(`${identifier}:${password}`)}` } })
    getStorage().setItem('token', token)
    api.setToken(token)
    if (usedSafetyLogin) { 
      getStorage().setItem('safetyLogin', safetyLogin)
    }
    yield put(actions.loginUserSuccess(user))
    yield callback ? callback(null, user, safetyLogin) : null
  } catch(e) {
    getStorage().removeItem('token')
    getStorage().removeItem('safetyLogin')
    yield put(actions.loginUserFailed())
    yield callback ? callback(e) : null
  }
}

// 회원을 로그아웃 처리한다.
export function* logoutUser({ user = {}, callback = () => {} }, api) {
  try {
    yield call([api, api.post], '/auth/logout')
    getStorage().removeItem('token')
    getStorage().removeItem('safetyLogin')
    api.unsetToken()
    yield put(actions.logoutUserSuccess({}))
    yield callback ? callback(null) : null
  } catch(e) {
    yield put(actions.logoutUserFailed({}))
    yield callback ? callback(e) : null
  }
}

/*
  2. Redux Action 흐름 Watch 기능
*/

export function* watchPrepareUser(api) {
  // 최초 브라우저 접속시 LocalStorage token 을 참조하여 연다.
  const token = getStorage().getItem('token')
  const safetyLogin = getStorage().getItem('safetyLogin')
  if (token) { api.setToken(token) }
  yield call(prepareUser, { token, safetyLogin }, api)
  // 이후 프레페어 요청시 작동하는 과정이다.
  while (true) {
    const { payload } = yield take(actions.USER_PREPARE_REQUEST)
    yield call(prepareUser, payload, api)
  }
}

export function* watchFindUser(api) {
  while (true) {
    const { payload } = yield take(actions.USER_FIND_REQUEST)
    yield call(findUser, payload, api)
  }
}

export function* watchLoginUser(api) {
  while (true) {
    const { payload } = yield take(actions.USER_LOGIN_REQUEST)
    yield call(loginUser, payload, api)
  }
}

export function* watchLogoutUser(api) {
  while (true) {
    const { payload } = yield take(actions.USER_LOGOUT_REQUEST)
    yield call(logoutUser, payload, api)
  }
}

/*
  3. 해당 리듀서에 대한 Redux Saga 셋팅 완료
*/

export default function* ({ api }) {
  yield fork(watchPrepareUser, api)
  yield fork(watchFindUser, api)
  yield fork(watchLoginUser, api)
  yield fork(watchLogoutUser, api)
}