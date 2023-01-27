import { type FactorialMetric } from '@prisma/client'
import { UnprocessableEntityError } from '../../errors/UnprocessableEntityError'
import { MetricPrismaRepository } from '../../repositories/MetricPrismaRepository'
import { type MetricRepository } from '../../repositories/MetricRepository'
import { type UseCase, type UseCaseResponse } from '../UseCase'

export class CreateMetric implements UseCase<FactorialMetric> {
  public constructor (private readonly metricRepository: MetricRepository = new MetricPrismaRepository()) {}

  public async perform ({ name, value }: Partial<FactorialMetric>): Promise<UseCaseResponse<FactorialMetric>> {
    try {
      const metric = await this.metricRepository.create({ name, value })
      return { data: metric }
    } catch (error) {
      if (error instanceof UnprocessableEntityError) {
        return { error: { code: 422, message: 'Missing key params to create a metric' } }
      } else {
        return { error: { code: 400, message: 'Something went wrong and the metric could not be created' } }
      }
    }
  }
}
