import crypto from 'crypto'
import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

const roles = ['user', 'admin']

const userSchema = new Schema({
  userId: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: roles, default: 'user' },
  
  picture: { type: String, trim: true },
  name: { type: String, index: true, trim: true, default: '실명없음' }, // 실명

  leaved: { type: Boolean, default: false },
  leavedAt: { type: Date },

  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },

  refreshTokens: { type: [String], default: [] },
}, {
  minimize: false,
  timestamps: true
})

userSchema.statics = {
  roles,
  async createPassword (password) {
    const rounds = env === 'test' ? 1 : 9
    return bcrypt.hash(password, rounds)
  }
}

userSchema.path('userId').set(function (userId) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    const hash = crypto.createHash('md5').update(userId).digest('hex')
    this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`
  }
  if (!this.name) { this.name = userId.replace(/^(.+)@.+$/, '$1') }
  return userId
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()
  userSchema.statics.createPassword(this.password)
    .then((hash) => {
      this.password = hash
      return next()
    })
    .catch(next)
})

userSchema.methods = {
  view (full) {
    let view = {}
    let fields = [
      'id', 'role', 'name', 'picture', 'userId',
      'deleted', 'deletedAt', 'leaved', 'leavedAt',
    ]
    if (full === 'auth') { fields = [...fields, 'refreshTokens'] } // 로그인 관련 정보를 수집해올 때 추가적으로 공개 가능한 컬럼
    if (full) { fields = [...fields, 'createdAt'] }
    fields.forEach((field) => { view[field] = this[field] })
    return view
  },

  async authenticate (password) {
    const procAt = new Date()
    const valid = await bcrypt.compare(password, this.password)
    return valid ? this : false
  }
}

userSchema.plugin(mongooseKeywords, { paths: ['userId', 'name'] })

const model = mongoose.model('User', userSchema)

export const schema = model.schema
export default model
