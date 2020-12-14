import mongoose from 'mongoose'
import _ from 'lodash'
import { success, notFound } from '../../services/response' // isDeleted, isOwner, isAdmin
import { Construction } from './'
import { escapeHtml } from '../../services/escapeHtml'

export const index = ({ user, querymen: { query, select, cursor } }, res, next) => {
  const execQuery = { ...query }
  execQuery.deleted = false
  if (!execQuery.status) { delete execQuery.status }
  delete cursor.limit
  return Construction.count(execQuery)
  // .then(count =>
  //   Construction.find(execQuery, select, cursor)
    .then(count => (Construction.find(execQuery, select, cursor))
      .populate('user')
      .exec()
      .then((constructions) => ({ count, rows: constructions.map(construction => construction.view(user)) }))
    )
    .then(success(res))
    .catch(next)
}

export const adminIndex = ({ user, querymen: { query, select, cursor } }, res, next) => {
  const execQuery = { ...query }
  if (!execQuery.status) { delete execQuery.status }
  delete cursor.limit
  return Construction.count(execQuery)
  // .then(count =>
  //   Construction.find(execQuery, select, cursor)
    .then(count => ((execQuery.classify && execQuery.budget.name && execQuery.personnel.name)
      ? Construction.find(
        {
          $or: [
            {classify: execQuery.classify},
            {'budget.name': execQuery.budget.name},
            {'personnel.name': execQuery.personnel.name}
          ],
          $and: [
            {status: execQuery.status},
            {published: execQuery.published}
          ]
        }, select, cursor)
      : Construction.find(execQuery, select, cursor))
      .populate('user')
      .exec()
      .then((constructions) => ({ count, rows: constructions.map(construction => construction.view(user)) }))
    )
    .then(success(res))
    .catch(next)
}

export const me = ({ user, querymen: { query, select, cursor } }, res, next) => {
  const execQuery = { ...query, user: user.id }
  execQuery.deleted = false
  return Construction.count(execQuery)
    .then(count =>
      Construction.find(execQuery, select, cursor)
        .then((constructions) => ({ count, rows: constructions.map(construction => construction.view(user)) }))
    )
    .then(success(res))
    .catch(next)
}

export const show = ({ user, params }, res, next) => {
  return Construction.findById(params.id)
    .then(notFound(res))
    .then(construction => construction.view(true, user))
    .then(success(res))
    .catch(next)
}

export const create = ({ user, bodymen: { body } }, res, next) => {
  var execBody = { ...body }
  if (!body.user && user && user.id) { execBody.user = user.id }
  return Construction.create(execBody)
    .then(construction => construction.view(user))
    .then(success(res))
    .catch(next)
}

export const update = ({ user, params, bodymen: { body } }, res, next) => {
  var execBody = { ...body }
  return Construction.findById(params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelf = params.id === result.id
      const isAdmin = user.role === 'admin'
      if (!isSelf && !isAdmin) { return res.status(401).json({ valid: false, message: '데이터를 변경할 권한이 없습니다.' }) }
      return result
    })
    .then(construction => Object.assign(construction, _.pickBy(execBody, value => !_.isUndefined(value))).save())
    .then(construction => construction.view(user))
    .then(success(res))
    .catch(next)
}

export const destroy = ({ user, params, querymen: { query } }, res, next) => {
  const execBody = { deleted: true, deletedAt: new Date(), deleter: user && user.id ? user.id : null }
  return Construction.findById(params.id)
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
    .then(construction => query.forced ? construction.remove() : Object.assign(construction, _.pickBy(execBody, value => !_.isUndefined(value))).save())
    .then(construction => !query.forced ? construction.view(user) : null)
    .then(success(res, 204))
    .catch(next)
}

