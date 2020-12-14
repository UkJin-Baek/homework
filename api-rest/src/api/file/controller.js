import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import { root, apiUrl } from '../../config'
import { escapeHtml } from '../../services/escapeHtml'

// 업로드 성공
export const completed = ({ params, files }, res, next) => {
  files = files.map(file => {
    return {
      ...file,
      originalname: escapeHtml(file.originalname)
    }
  })
  return res.status(200).json(
    files.map(file => ({ filename: file.originalname, path: `/files/${file.filename}` }))
  )
}

export const ckCompleted = ({ params, files }, res, next) => {
  return res.status(200).json({ uploaded: true, url: `${apiUrl}/files/${files[0].filename}` })
}

// 다운로드, 썸네일화 작업 완료
export const download = ({ params, querymen: { query } }, res, next) => {
  const { filename, key = 'common' } = params
  const { r } = query
  const _path = path.resolve(root, 'public', 'files', key, filename)
  if (!fs.existsSync(_path)) { return res.status(404).end() }
  if (r) {
    const output = fs.readFileSync(_path)
    return sharp(_path).resize(...r.split(',').map(v => v * 1)).toBuffer().then(output => res.send(output))
  }
  return res.sendFile(_path)
}
