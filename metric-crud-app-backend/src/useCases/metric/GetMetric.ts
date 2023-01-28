import { type FactorialMetric } from '@prisma/client';
import { MetricPrismaRepository } from '../../repositories/MetricPrismaRepository';
import { type MetricRepository } from '../../repositories/MetricRepository';
import { type UseCase, type UseCaseResponse } from '../UseCase';

export class GetMetric implements UseCase<FactorialMetric> {
  public constructor (private readonly metricRepository: MetricRepository = new MetricPrismaRepository()) {}

  public async perform ({ id }: Pick<FactorialMetric, 'id'>): Promise<UseCaseResponse<FactorialMetric>> {
    const metric = await this.metricRepository.get({ id });

    if (metric == null) {
      return { error: { code: 404, message: `No metric found for id ${id}` } };
    }

    return { data: metric };
  }
}
