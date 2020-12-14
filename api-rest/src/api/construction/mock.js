import mongoose from 'mongoose'
import { success, notFound } from '../../services/response'
import { token } from '../../services/passport'
import Construction from './model'

const mock = {
  Model: Construction,
  presets: {},
  route: () => {},
  addRouter: () => {},
}

mock.presets.basic = (obj = {}, user = {}) => {
  const procAt = new Date()
  const details = mock.Model.mixeds.details()

  const model = {
    user: user && user.id ? user.id : mongoose.Types.ObjectId(),
    name: '테스트 데이터 짧게 써보기',
    location: '경기 서울',
    description: '설명은 매우 길게 작성해보기',
    images: [],
    details,
    startAt: procAt,
    endAt: procAt,

    classify: { name: 'none', text: '미설정' },
    part: { name: 'none', text: '미설정' },
    budget: { name: 'none', text: '미설정' },
    personnel: { name: 'none', text: '미설정' },

    published: true,
    publishedAt: procAt,
    ...obj,
  }

  return model
}

mock.route =({ user, params }, res, next) => {
  const { action } = params
  const { Model } = mock
  switch(action) {
    case 'createBasic': 
      const body = mock.presets.basic()
      return Model.create(body)
        .then(model => model.log(null, '정상적으로 생성되었습니다.', user, { body }).save())
        .then(model => model.view())
        .then(success(res))
        .catch(next)
    default:
      return res.status(200).json({ default: true })
  }
}

mock.addRouter = (router) => router.get('/mock/:action?', token(), mock.route)

export default mock
