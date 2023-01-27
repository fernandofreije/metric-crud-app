/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import express, { type Request, type Response, type NextFunction, type Application } from 'express'
import metricRouter from './routes/MetricRouter'
import morgan from 'morgan'
import { ValidationError } from 'express-json-validator-middleware'

const app: Application = express()

app.use(morgan('tiny'))
app.use(express.json())

app.use('/metric', metricRouter)

app.use((error: Error, req: Request, response: Response, next: NextFunction) => {
  if (error instanceof ValidationError) {
    response.status(400).send(error.validationErrors)
    next()
  } else {
    next(error)
  }
})

export default app
