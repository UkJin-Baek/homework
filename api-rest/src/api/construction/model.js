import mongoose, { Schema } from 'mongoose'
import { User } from '../user'

const constructionSchema = new Schema({
  name: { type: String },
  location: { type: String },
  description: { type: String },
  images: { type: [Schema.Types.Mixed], default: [] },
  startAt: { type: Date },
  endAt: { type: Date },

  files: { type: [Schema.Types.Mixed], default: [] },
  images: { type: [Schema.Types.Mixed], default: [] },
  logo: { type: Object, default: {} },
  
  budget: { type: String },

  published: { type: Boolean, default: true },

  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },

  logs: { type: [Schema.Types.Mixed], default: [] },
}, {
  minimize: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

constructionSchema.methods = {
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
      images: this.images,
      logo: this.logo,
      files: this.files,
      
      startAt: this.startAt,
      endAt: this.endAt,

      budget: this.budget,

      logs: this.logs,

      published: this.published,

      deleted: this.deleted,
      deletedAt: this.deletedAt,

      updatedAt: this.updatedAt,
      createdAt: this.createdAt
    }
    return full ? { ...view } : view
  }

}

const model = mongoose.model('Construction', constructionSchema)

export const schema = model.schema

export default model
