import { Router } from 'express'
import { middleware as body } from 'bodymen'
import { passwordLogin, logout, tokenLogin } from './controller'
import { password, token } from '../../services/passport'

const router = new Router()

// Identify 정보와 password를 통해 로그인을 시도하는 경우
router.post('/login', password(), body({ usedSafetyLogin: { type: Boolean } }), passwordLogin)

// 로그아웃을 처리하는 기능
router.post('/logout', token({ required: true }), logout)

// 보유한 토큰을 기준으로 로그인을 시도하는 경우
router.post('/', body({
  access_token: { type: String },
  safetyLogin: { type: String },
}), tokenLogin)

export default router
