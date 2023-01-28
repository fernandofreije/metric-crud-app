import { DateTime } from 'luxon';
import { MetricPrismaRepository } from '../../repositories/MetricPrismaRepository';
import { type MetricRepository } from '../../repositories/MetricRepository';
import { type UseCase, type UseCaseResponse } from '../UseCase';

interface AveragesReturnType {
  oneMinuteAgo: { value: number, total: number }
  oneHourAgo: { value: number, total: number }
  oneDayAgo: { value: number, total: number }
};

export class GetAverages implements UseCase<AveragesReturnType> {
  public constructor (private readonly metricRepository: MetricRepository = new MetricPrismaRepository()) { }

  public async perform (): Promise<UseCaseResponse<AveragesReturnType>> {
    const oneMinuteAgoTime = DateTime.now().minus({ minute: 1 });
    const oneHourAgoTime = DateTime.now().minus({ hour: 1 });
    const oneDayAgoTime = DateTime.now().minus({ day: 1 });

    const [oneMinuteAgo, oneHourAgo, oneDayAgo] = await Promise.all([this.metricRepository.getAverage({ since: oneMinuteAgoTime }), await this.metricRepository.getAverage({ since: oneHourAgoTime }), await this.metricRepository.getAverage({ since: oneDayAgoTime })]);

    return { data: { oneMinuteAgo, oneHourAgo, oneDayAgo } };
  }
}
