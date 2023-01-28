import { type FactorialMetric } from '@prisma/client';
import { MetricPrismaRepository } from '../../repositories/MetricPrismaRepository';
import { type MetricRepository } from '../../repositories/MetricRepository';
import { type UseCase, type UseCaseResponse } from '../UseCase';

export class GetAllMetrics implements UseCase<FactorialMetric[]> {
  public constructor (private readonly metricRepository: MetricRepository = new MetricPrismaRepository()) {}

  public async perform (): Promise<UseCaseResponse<FactorialMetric[]>> {
    const metrics = await this.metricRepository.getAll();

    return { data: metrics };
  }
}
