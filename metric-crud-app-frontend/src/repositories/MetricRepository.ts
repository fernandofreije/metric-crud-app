import { Metric } from '../models/Metric';

export interface MetricRepository {
  get(opts: { metricId: string }): Promise<Metric>;
  getAll(): Promise<Metric[]>;
  post(opts: Pick<Metric, 'name' | 'value'>): Promise<void>;
}

