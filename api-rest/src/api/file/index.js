import { Router } from 'express'
import { uploader } from '../../services/uploader'
import { middleware as query } from 'querymen'
import { completed, download, ckCompleted } from './controller'

const router = new Router()

router.post('/', uploader('common', {
  fileFilter: function (req, file, cb) {
    // console.log(file.mimetype);
    // const allowFileTypes = [
    //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    //   'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    //   'image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/jiff', 'application/pdf',
    //   'application/vnd.ms-excel', 'text/plain'
    // ]
    // if (!allowFileTypes.includes(file.mimetype)) {
    //   req.fileValidationError = '올바른 확장자 파일을 업로드해야합니다.';
    //   return cb(null, false, new Error('허용된 확장자가 아닙니다.'));
    // }
    cb(null, true)
  }
}).any(), completed)

router.post('/ck', uploader('common', {
  fileFilter: function (req, file, cb) {
    const allowFileTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/jiff', 'application/pdf'
    ]
    if (!allowFileTypes.includes(file.mimetype)) {
      req.fileValidationError = '올바른 확장자 파일을 업로드해야합니다.';
      return cb(null, false, new Error('허용된 확장자가 아닙니다.'));
    }
    cb(null, true)
  }
}).any(), ckCompleted)

router.get('/:filename/:key?', query({
  r: { type: String }, // 리사이즈 정보 보통 [0], [0, 0] 값으로 들어옴.
}), download)

router.get('/', (req, res, next) => {
  res.send('올바른 접근이 아닙니다.')
})

export default router
