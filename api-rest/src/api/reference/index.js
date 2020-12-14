import { Router } from 'express'
import { token } from '../../services/passport'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { index, adminIndex, related, me, show, create, update, destroy, excel } from './controller'

import mock from './mock'
import Reference, { schema } from './model'
export { Reference, schema }

const castBody = {
  user: { type: String },

  name: { type: String },
  location: { type: String },
  description: { type: String },
  major: { type: Object },
  images: { type: [Object] },
  details: { type: Object },
  startAt: { type: Date },
  endAt: { type: Date },

  target: { type: Object },
  classify: { type: Object },
  categories: { type: [Object] },
  tags: { type: [String] },
  
  part: { type: Object },
  budget: { type: Object },
  personnel: { type: Object },
  
  published: { type: Boolean },
  publishedAt: { type: Date },

  status: { type: String },
  
  deleted: { type: Boolean },
  deletedAt: { type: Date },
}

const router = new Router()

mock.addRouter(router)

router.get('/me',
  token(),
  query({
    keywords: { type: RegExp },
    published: { type: Boolean },
    publishedAt: { type: Date },
    deleted: { type: Boolean, default: false },
  }, {
    page: { max: Infinity },
    limit: { max: Infinity, default: 9999 }
  }),
  me)

router.get('/admin',
  token(),
  query({
    user: { type: [String] },
    status: { type: String },
    keywords: { type: RegExp },
    published: { type: Boolean },
    publishedAt: { type: Date },
    deleted: { type: Boolean },
    // categories: { type: [Object] },
    classify: { type: Object },
    budget: { type: Object },
    personnel: { type: Object },
    name: { type: String }
  }, {
    page: { max: Infinity },
    limit: { max: Infinity, default: 9999 }
  }),
  adminIndex)

router.get('/excel',
  token(),
  query({
    user: { type: [String] },
    status: { type: String },
    keywords: { type: RegExp },
    published: { type: Boolean },
    publishedAt: { type: Date },
    deleted: { type: Boolean },
    // categories: { type: [Object] },
    classify: { type: Object },
    budget: { type: Object },
    personnel: { type: Object },
    name: { type: String }
  }, {
    page: { max: Infinity },
    limit: { max: Infinity, default: 9999 }
  }),
  excel)

router.get('/:id', token(), show)

router.get('/',
  token(),
  query({
    user: { type: [String] },
    status: { type: String },
    keywords: { type: RegExp },
    published: { type: Boolean },
    publishedAt: { type: Date },
    deleted: { type: Boolean, default: false },
    // categories: { type: [Object] },
    classify: { type: Object },
    budget: { type: Object },
    personnel: { type: Object },
    name: { type: String }
  }, {
    page: { max: Infinity },
    limit: { max: Infinity, default: 9999 }
  }),
  index)

router.post('/',
  token({ required: true }),
  body(castBody),
  create)

router.put('/:id',
  token({ required: true }),
  body(castBody),
  update)

router.delete('/:id',
  token({ required: true }),
  query({
    forced: { type: Boolean, default: false }
  }),
  destroy)

export default router
