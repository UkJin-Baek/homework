import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { password as passwordAuth, token } from '../../services/passport'
import {
  index, exists, existsId, existsNick, showMe, dashboard, show,
  findWithMobile, findWithEmail, excel, adminIndex,
  sendVerityCodeByEmail, sendVerityCodeByMobile, checkVerityCode,
  create, update, updateEmail, updateMobile, updatePassword, updateLeaved, destroy, updateSubscribe
} from './controller'

import User, { schema } from './model'
export { User, schema }

const castBody = {
  userId: { type: String },
  name: { type: String },
  password: { type: String },
  picture: { type: String },
  role: { type: String },
  leaved: { type: Boolean },
  leavedAt: { type: Date },
  deleted: { type: Boolean },
  deletedAt: { type: Date },
}

const router = new Router()

router.get('/exists/:userId', exists)

router.get('/',
  token({ required: true }), // , roles: ['admin']
  query(),
  index)

router.post('/',
  body(castBody),
  create)

router.put('/:id',
  token({ required: true }),
  body(castBody),
  update)

router.delete('/:id', token({ required: true, roles: ['admin'] }), destroy)

export default router
