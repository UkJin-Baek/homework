import { Router } from 'express'
import { token } from '../../services/passport'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { index,create, update, destroy } from './controller'

import History, { schema } from './model'
export { History, schema }

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
