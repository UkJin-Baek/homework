import { sign, signSync, verify, verifySync } from '../../services/jwt'
import { success, notFound } from '../../services/response/'
import { User } from '../user'

// 아이디와 패스워드로 로그인할 경우 새 Access Token을 발급
// usedSafetyLogin 인 경우에만 safetyLogin 코드를 생성해준다.
export const passwordLogin = ({ user, bodymen: { body: { usedSafetyLogin } } }, res, next) =>
  sign(user.id, { expiresIn: '1400m' })
  // sign(user.id, { expiresIn: 60 * 60 * 24 })
    .then((token) => ({ token, user }))
    .then(({ token, user }) => {
      if (!usedSafetyLogin) { return { token, user: user.view() } } // 짧은 Access Token만 발행해서 새로운 세션을 열어줌.
      const safetyLogin = `${user.id}.${Date.now()}.${Math.round(Math.random()*(99999 - 10000) + 10000)}`
      const authUser = user.view('auth')
      const refreshTokens = (authUser.refreshTokens ? authUser.refreshTokens : [])
        .filter(t => { try { return verifySync(t) } catch (e) { return false } }) // 만료된 토큰 털어버리기
      return Object.assign(user, { refreshTokens: [...refreshTokens, signSync(safetyLogin, { expiresIn: 60 * 24 * 14 })] }).save()
        .then(user => ({ token, user: user.view(), safetyLogin }))
    })
    .then(success(res, 201))
    .catch(next)

// 로그아웃시 계정정보를 정리할 수 있도록 처리한다. (추후 리프레시 토큰을 비워주는 작업을 진행해야한다. 발급되었던 리프레시 토큰 중 만료된 것들은 지워줘야한다.)
export const logout = (req, res, next) => {
  req.logout()
  return res.status(201).end()
}

// 보유한 토큰가지고 로그인을 한 경우, 자동로그인이 걸려있는 경우
export const tokenLogin = ({ bodymen: { body: { safetyLogin, access_token } } }, res, next) =>
  verify(access_token)
    .then(({ id }) => {
      return User.findById(id)
        .then(notFound(res))
        .then(user => ({ user: user.view(true), token: access_token }))
    })
    // 토큰이 유효하지 않거나 재발급이 필요한 경우
    .catch(e => {
      try {
        if (e.name === 'TokenExpiredError') {
          res.status(419).json({ valid: false, message: '토큰이 만료되었습니다.' })
          return null
        }
        if (!safetyLogin) { throw new Error('토큰이 만료되었거나, 더이상 로그인이 불가능합니다.', e) }
        const [id, date, rnd] = safetyLogin.split('.') // date, rnd 값을 통해 변조를 파악한다.
        return User.findById(id)
          .then(notFound(res))
          .then(reUser => {
            const exists = reUser.refreshTokens.find(_token => { try { return verifySync(_token).id === safetyLogin } catch (e) { return false } })
            if (!exists) { throw new Error('리프레시 토큰이 만료되었거나, 더이상 로그인이 불가능합니다.') }
            return { user: reUser.view(true), token: signSync(id, { expiresIn: 60 * 60 * 24 }) }
          })
      } catch (e) {
        // 정상적인 접근이 아녔던 safetyLogin 인경우 삭제처리해준다.
        return { user: {}, token: null }
      }
    })
    .then(success(res, 201))
    .catch(next)