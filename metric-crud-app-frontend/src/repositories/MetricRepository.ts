import { Metric } from '../models/Metric';
import { MetricAverages } from '../models/MetricAverages';

export interface MetricRepository {
  get(opts: { metricId: string }): Promise<Metric>;
  getAll(): Promise<Metric[]>;
  post(opts: Pick<Metric, 'name' | 'value'>): Promise<void>;
  getAverages(): Promise<MetricAverages>;
}

