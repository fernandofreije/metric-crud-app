import { type FactorialMetric } from '@prisma/client'
import { type Request, type Response } from 'express'

import { MetricPrismaRepository } from '../repositories/MetricPrismaRepository'
import { type MetricRepository } from '../repositories/MetricRepository'
import { CreateMetric } from '../useCases/metric/CreateMetric'
import { GetAllMetrics } from '../useCases/metric/GetAllMetrics'
import { GetMetric } from '../useCases/metric/GetMetric'

export class MetricController {
  public constructor (private readonly metricRepository: MetricRepository = new MetricPrismaRepository()) {}

  public async create (req: Request, res: Response): Promise<Response<FactorialMetric>> {
    const { name, value } = req.body

    const { data, error } = await new CreateMetric(this.metricRepository).perform({ name, value })

    if (error != null) {
      return res.status(error.code).send(error.message).end()
    }

    return res.json(data).end()
  }

  public async getAll (_: Request, res: Response): Promise<Response<FactorialMetric[]>> {
    const { data, error } = await new GetAllMetrics(this.metricRepository).perform()

    if (error != null) {
      return res.status(error.code).send(error.message).end()
    }

    return res.json(data).end()
  }

  public async get (req: Request, res: Response): Promise<Response<FactorialMetric>> {
    const { id } = req.params

    const { data, error } = await new GetMetric(this.metricRepository).perform({ id })

    if (error != null) {
      return res.status(error.code).send(error.message).end()
    }

    return res.json(data).end()
  }
}
