
import { Router, type Request, type Response } from 'express'
import { MetricController } from '../controllers/MetricController'
import { metricSchema } from '../validators/Metric'
import { Validator } from 'express-json-validator-middleware'

const metricRouter = Router()
const { validate } = new Validator({})

metricRouter.post('/', validate({ body: metricSchema }), async (req: Request, res: Response) => await new MetricController().create(req, res))
metricRouter.get('/', async (req: Request, res: Response) => await new MetricController().getAll(req, res))
metricRouter.get('/:id', async (req: Request, res: Response) => await new MetricController().get(req, res))

export default metricRouter
