import mongoose, { Schema } from 'mongoose'
import { User } from '../user'

export const mixeds = {
  category: (props = {}, options = {}) => ({ name: 'etc', text: '기타', ...props }),
  log: (props = {}, options = {}) => ({ error: false, message: '기록이 되었습니다.', user: {}, metas: {}, createdAt: new Date(), ...props }),
  details: (props = {}, options = {}) => ({ purpose: '내용이 없습니다.', budget: '내용이 없습니다.', warnning: '내용이 없습니다.', review: '담당자 리뷰가 없습니다.', rating: 0, ...props }),
}

const referenceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },

  name: { type: String },
  location: { type: String },
  description: { type: String },
  major: { type: Object },
  images: { type: [Schema.Types.Mixed], default: [] },
  details: { type: Schema.Types.Mixed, default: mixeds.details() },
  startAt: { type: Date },
  endAt: { type: Date },

  target: { type: Schema.Types.Mixed, default: { name: 'etc', text: '기타' } },
  classify: { type: Schema.Types.Mixed, default: { name: 'etc', text: '기타' } },
  categories: { type: [Schema.Types.Mixed], default: [] },
  budget: { type: Schema.Types.Mixed, default: { name: 'etc', text: '기타' } },
  personnel: { type: Schema.Types.Mixed, default: { name: 'etc', text: '기타' } },
  tags: { type: [String], default: [] },

  published: { type: Boolean, default: true },
  publishedAt: { type: Date },
  status: { type: String, default: 'pending', trim: true },

  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  deleter: { type: Schema.Types.ObjectId },

  keywords: { type: [String], default: [] },
  logs: { type: [Schema.Types.Mixed], default: [] },
}, {
  minimize: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

referenceSchema.pre('save', function (next) {
  this.keywords = [
    // `${this._id}`, 
    this.name,
    this.description,
    ...Object.values(this.details).filter(o => o && typeof o === 'string'),
    ...this.categories.map(category => category.text)
  ]
  if (!this.user) { return next() }
  User.findById(this.user)
    .then(user => {
      this.keywords = [
        ...this.keywords, 
        // `${user._id}`, 
        user.email, 
        user.name
      ]
      next()
    })
    .catch((error) => next())
})

referenceSchema.methods = {
  log(error, message, user = {}, metas, options = {}) {
    this.logs = [...this.logs, mixeds.log({ error, message, user, metas, createdAt: new Date() }, options)]
    return this
  },

  view(full, user = {}) {
    const view = {
      id: this.id,
      user: this.user,

      name: this.name,
      location: this.location,
      description: this.description,
      major: this.major,
      images: this.images,
      details: this.details,
      startAt: this.startAt,
      endAt: this.endAt,

      target: this.target,
      classify: this.classify,
      categories: this.categories,
      tags: this.tags,

      budget: this.budget,
      personnel: this.personnel,

      keywords: this.keywords,
      logs: this.logs,

      published: this.published,
      publishedAt: this.publishedAt,
      status: this.status,

      deleted: this.deleted,
      deletedAt: this.deletedAt,

      updatedAt: this.updatedAt,
      createdAt: this.createdAt
    }
    return full ? { ...view } : view
  }

}

const model = mongoose.model('Reference', referenceSchema)

export const schema = model.schema

model.mixeds = mixeds

export default model
