import { type FactorialMetric } from '@prisma/client';
import { type SortType } from '../../models/SortType';
import { MetricPrismaRepository } from '../../repositories/MetricPrismaRepository';
import { type MetricRepository } from '../../repositories/MetricRepository';
import { type UseCase, type UseCaseResponse } from '../UseCase';

interface PerformOptions {
  sort?: SortType
}

export class GetAllMetrics implements UseCase<FactorialMetric[]> {
  public constructor (private readonly metricRepository: MetricRepository = new MetricPrismaRepository()) {}

  public async perform ({ sort }: PerformOptions = {}): Promise<UseCaseResponse<FactorialMetric[]>> {
    const metrics = await this.metricRepository.getAll({ sort });

    return { data: metrics };
  }
}
