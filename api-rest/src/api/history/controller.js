import mongoose from 'mongoose'
import _ from 'lodash'
import { success, notFound } from '../../services/response' // isDeleted, isOwner, isAdmin
import { History } from './'

export const index = ({ user, querymen: { query, select, cursor } }, res, next) => {
  const execQuery = { ...query }
  execQuery.deleted = false
  if (!execQuery.status) { delete execQuery.status }
  delete cursor.limit
  return History.count(execQuery)
    .then(count => History.find(execQuery, select, cursor)
      .sort({'publishedAt': 1})
      .then((historys) => ({ count, rows: historys.map(history => history.view(user)) }))
    )
    .then(success(res))
    .catch(next)
}

export const create = ({ user, bodymen: { body } }, res, next) => {
  var execBody = { ...body }
  if (!body.user && user && user.id) { execBody.user = user.id }
  return History.create(execBody)
    .then(history => history.view(user))
    .then(success(res))
    .catch(next)
}

export const update = ({ user, params, bodymen: { body } }, res, next) => {
  var execBody = { ...body }
  return History.findById(params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelf = params.id === result.id
      const isAdmin = user.role === 'admin'
      if (!isSelf && !isAdmin) { return res.status(401).json({ valid: false, message: '데이터를 변경할 권한이 없습니다.' }) }
      return result
    })
    .then(history => Object.assign(history, _.pickBy(execBody, value => !_.isUndefined(value))).save())
    .then(history => history.view(user))
    .then(success(res))
    .catch(next)
}

export const destroy = ({ user, params, querymen: { query } }, res, next) => {
  const execBody = { deleted: true, deletedAt: new Date(), deleter: user && user.id ? user.id : null }
  return History.findById(params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelf = user.id === result.user.toString()
      const isAdmin = user.role === 'admin'
      if (!isSelf && !isAdmin) {
        res.status(401).json({ valid: false, message: '데이터를 변경할 권한이 없습니다.' })
        return null
      }
      result.status = 'deleted'
      return result
    })
    .then(history => query.forced ? history.remove() : Object.assign(history, _.pickBy(execBody, value => !_.isUndefined(value))).save())
    .then(history => !query.forced ? history.view(user) : null)
    .then(success(res, 204))
    .catch(next)
}
