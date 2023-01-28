import { type MetricRepository } from '../../src/repositories/MetricRepository';

export class FakeMetricRepository implements MetricRepository {
  public create = jest.fn();
  public getAll = jest.fn();
  public get = jest.fn();
}
