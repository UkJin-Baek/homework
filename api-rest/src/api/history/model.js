import mongoose, { Schema } from 'mongoose'
import { User } from '../user'

export const mixeds = {
  category: (props = {}, options = {}) => ({ name: 'etc', text: '기타', ...props }),
  log: (props = {}, options = {}) => ({ error: false, message: '기록이 되었습니다.', user: {}, metas: {}, createdAt: new Date(), ...props }),
  details: (props = {}, options = {}) => ({ purpose: '내용이 없습니다.', budget: '내용이 없습니다.', warnning: '내용이 없습니다.', review: '담당자 리뷰가 없습니다.', rating: 0, ...props }),
}

const historySchema = new Schema({
  description: { type: String },

  publishedAt: { type: Date },

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

historySchema.methods = {
  log(error, message, user = {}, metas, options = {}) {
    this.logs = [...this.logs, mixeds.log({ error, message, user, metas, createdAt: new Date() }, options)]
    return this
  },

  view(full, user = {}) {
    const view = {
      id: this.id,
      description: this.description,
      logs: this.logs,
      publishedAt: this.publishedAt,
      
      deleted: this.deleted,
      deletedAt: this.deletedAt,

      updatedAt: this.updatedAt,
      createdAt: this.createdAt
    }
    return full ? { ...view } : view
  }

}

const model = mongoose.model('History', historySchema)

export const schema = model.schema

model.mixeds = mixeds

export default model
