import { success, notFound } from '../../services/response/'
import mongoose from 'mongoose'
import _, { subtract } from 'lodash'
import bcrypt from 'bcrypt'
import { User, schema } from '.'
import { sign } from '../../services/jwt'
import { env } from '../../config'

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  const execQuery = { ...query }
  execQuery.deleted = false
  return User.count(execQuery)
    .then(count =>
      User.find(execQuery, select, cursor)
        .then(users => ({ count, rows: users.map((user) => user.view(true)) }))
    )
    .then(success(res))
    .catch(next)
}

export const exists = ({ params }, res, next) =>
  User.findOne({ userId: params.userId })
    .then((user) => {
      var exist = { exists: !!user }
      exist = user ? { ...exist, id: user.id } : exist
      return exist
    })
    .then(success(res))
    .catch(next)

export const create = ({ bodymen: { body } }, res, next) => {
  var execBody = { ...body }
  return User.create(execBody)
    .then(user => {
      sign(user.id, { expiresIn: 60 * 24 })
        .then((token) => ({ token, user: user.view(false) }))
        .then(success(res, 201))
    })
    .catch((err) => {
      console.log(err)
      /* istanbul ignore else */
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({ valid: false, param: 'userId', message: '이미 아이디가 존재합니다.' })
      } else {
        next(err)
      }
    })
}

export const update = ({ user, bodymen: { body }, params }, res, next) => {
  var execBody = { ...body }
  execBody = escapeHtmlUser(execBody)
  return User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelf = user.id === result.id
      const isAdmin = user.role === 'admin'
      if (!isSelf && !isAdmin) { return res.status(401).json({ valid: false, message: '데이터를 변경할 권한이 없습니다.' }) }
      return result
    })
    .then((user) => user ? Object.assign(user, _.pickBy(execBody, _.identity)).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)
}

export const destroy = ({ user, bodymen: { body }, params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelf = user.id === result.id
      const isAdmin = user.role === 'admin'
      if (!isSelf && !isAdmin) { return res.status(401).json({ valid: false, message: '데이터를 변경할 권한이 없습니다.' }) }
      return result
    })
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next)
