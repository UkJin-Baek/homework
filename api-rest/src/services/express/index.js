import express from 'express'
import path from 'path'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { env } from '../../config'

export default (apiRoot, routes) => {
  const app = express() 

  /* istanbul ignore next */
  // if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
  // }

  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  
  app.use(apiRoot, routes)

  return app
}
