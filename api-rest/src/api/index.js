import { Router } from 'express'
import { notFound } from '../services/response'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'

import auth from './auth'
import user from './user'
import file from './file'
import history from './history'

import reference from './reference'
import construction from './construction'

const router = new Router()

router.use('/auth', auth)
router.use('/users', user)

router.use('/files', file)
router.use('/histories', history)

router.use('/references', reference)
router.use('/construction', construction)

router.use('/', (req, res, next) => res.status(404).end())

router.use(queryErrorHandler())
router.use(bodyErrorHandler())

export default router
