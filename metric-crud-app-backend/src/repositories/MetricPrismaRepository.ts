import { type FactorialMetric } from '@prisma/client'
import { prisma } from '../db/db'
import { UnprocessableEntityError } from '../errors/UnprocessableEntityError'
import { type MetricRepository } from './MetricRepository'

export class MetricPrismaRepository implements MetricRepository {
  public async create ({ name, value }: Partial<FactorialMetric>): Promise<FactorialMetric> {
    if (name === undefined || value === undefined) {
      throw new UnprocessableEntityError('Missing key variables for the creation of Metrics')
    }

    const metric = await prisma.factorialMetric.create({
      data: {
        name,
        value
      }
    })

    return metric
  }

  public async getAll (): Promise<FactorialMetric[]> {
    const metrics = await prisma.factorialMetric.findMany()

    return metrics
  }

  public async get ({ id }: Pick<FactorialMetric, 'id'>): Promise<FactorialMetric | null> {
    const metric = await prisma.factorialMetric.findUnique({ where: { id } })

    return metric
  }
}
