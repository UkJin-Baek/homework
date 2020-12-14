import path from 'path'
import fs from 'fs'
import multer from 'multer'
import { root } from '../../config'

if (!fs.existsSync(path.resolve(root, 'public'))) { fs.mkdirSync(path.resolve(root, 'public')) }
if (!fs.existsSync(path.resolve(root, 'public', 'files'))) { fs.mkdirSync(path.resolve(root, 'public', 'files')) }

export const uploader = (key = 'common', options = {}) =>
  multer({
    storage: multer.diskStorage({
      destination: function ({ params }, res, cb) {
        if (!fs.existsSync(path.resolve(root, 'public', 'files', key))) { fs.mkdirSync(path.resolve(root, 'public', 'files', key)) }
        return cb(null, path.resolve(root, 'public', 'files', key))
      },
      filename: function ({ params }, file, cb) {
        const { originalname } = file
        const processAt = new Date()
        const ext = file && originalname.split('.')[originalname.split('.').length - 1]
        return cb(null, `${processAt.getTime()}.${ext}`)
      }
      // filename (req, file, cb) {
      //   const ext = path.extname(file.originalname);
      //   cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
      // }
    }),
    // limit: { fileSize: 1 * 1024 * 1024 },
    ...options
  })
