import mongoose from 'mongoose'
import _ from 'lodash'
import { success, notFound } from '../../services/response' // isDeleted, isOwner, isAdmin
import { Reference } from './'
import { escapeHtml } from '../../services/escapeHtml'

export const index = ({ user, querymen: { query, select, cursor } }, res, next) => {
  const execQuery = { ...query }
  execQuery.deleted = false
  if (!execQuery.status) { delete execQuery.status }
  delete cursor.limit
  return Reference.count(execQuery)
  // .then(count =>
  //   Reference.find(execQuery, select, cursor)
    .then(count => ((execQuery.classify && execQuery.budget.name && execQuery.personnel.name)
      ? Reference.find(
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
      : Reference.find(execQuery, select, cursor))
      .populate('user')
      .exec()
      .then((references) => ({ count, rows: references.map(reference => reference.view(user)) }))
    )
    .then(success(res))
    .catch(next)
}

export const adminIndex = ({ user, querymen: { query, select, cursor } }, res, next) => {
  const execQuery = { ...query }
  if (!execQuery.status) { delete execQuery.status }
  delete cursor.limit
  return Reference.count(execQuery)
  // .then(count =>
  //   Reference.find(execQuery, select, cursor)
    .then(count => ((execQuery.classify && execQuery.budget.name && execQuery.personnel.name)
      ? Reference.find(
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
      : Reference.find(execQuery, select, cursor))
      .populate('user')
      .exec()
      .then((references) => ({ count, rows: references.map(reference => reference.view(user)) }))
    )
    .then(success(res))
    .catch(next)
}

export const excel = ({ user, querymen: { query, select, cursor } }, res, next) => {
  const execQuery = { ...query }
  if (!execQuery.status) { delete execQuery.status }
  delete cursor.limit
  return Reference.count(execQuery)
  // .then(count =>
  //   Reference.find(execQuery, select, cursor)
    .then(count => ((execQuery.classify && execQuery.budget.name && execQuery.personnel.name)
      ? Reference.find(
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
      : Reference.find(execQuery, select, cursor))
      .populate('user')
      .exec()
      .then((references) => ({ count, rows: references.map(reference => reference.view(user)) }))
    )
    .then(success(res))
    .catch(next)
}

export const me = ({ user, querymen: { query, select, cursor } }, res, next) => {
  const execQuery = { ...query, user: user.id }
  execQuery.deleted = false
  return Reference.count(execQuery)
    .then(count =>
      Reference.find(execQuery, select, cursor)
        .then((references) => ({ count, rows: references.map(reference => reference.view(user)) }))
    )
    .then(success(res))
    .catch(next)
}

export const show = ({ user, params }, res, next) => {
  return Reference.findById(params.id)
    .then(notFound(res))
    .then(reference => reference.view(true, user))
    .then(success(res))
    .catch(next)
}

export const create = ({ user, bodymen: { body } }, res, next) => {
  var execBody = { ...body }
  execBody = escapeHtmlReference(execBody)
  if (!body.user && user && user.id) { execBody.user = user.id }
  return Reference.create(execBody)
    .then(reference => reference.view(user))
    .then(success(res))
    .catch(next)
}

export const update = ({ user, params, bodymen: { body } }, res, next) => {
  var execBody = { ...body }
  execBody = escapeHtmlReference(execBody)
  return Reference.findById(params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelf = params.id === result.id
      const isAdmin = user.role === 'admin'
      if (!isSelf && !isAdmin) { return res.status(401).json({ valid: false, message: '데이터를 변경할 권한이 없습니다.' }) }
      return result
    })
    .then(reference => Object.assign(reference, _.pickBy(execBody, value => !_.isUndefined(value))).save())
    .then(reference => reference.view(user))
    .then(success(res))
    .catch(next)
}

export const destroy = ({ user, params, querymen: { query } }, res, next) => {
  const execBody = { deleted: true, deletedAt: new Date(), deleter: user && user.id ? user.id : null }
  return Reference.findById(params.id)
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
    .then(reference => query.forced ? reference.remove() : Object.assign(reference, _.pickBy(execBody, value => !_.isUndefined(value))).save())
    .then(reference => !query.forced ? reference.view(user) : null)
    .then(success(res, 204))
    .catch(next)
}

function escapeHtmlReference (body = {}) {
  var execBody = { ...body }

  execBody.name = execBody.name ? escapeHtml(execBody.name) : undefined
  execBody.location = execBody.location ? escapeHtml(execBody.location) : undefined
  execBody.description = execBody.description ? escapeHtml(execBody.description) : undefined
  execBody.major = execBody.major ? escapeHtml(execBody.major) : undefined
  if (execBody.images) {
    execBody.images.filename = execBody.images.filename ? escapeHtml(execBody.images.filename) : undefined
  }
  if (execBody.details) {
    execBody.details.purpose = execBody.details.purpose ? escapeHtml(execBody.details.purpose) : undefined
    execBody.details.budget = execBody.details.budget ? escapeHtml(execBody.details.budget) : undefined
    execBody.details.warnning = execBody.details.warnning ? escapeHtml(execBody.details.warnning) : undefined
  }
  if (execBody.tags && execBody.tags.length > 0) execBody.tags = execBody.tags.map(tag => escapeHtml(tag))

  return execBody
}
