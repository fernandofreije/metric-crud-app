import { type FactorialMetric } from '@prisma/client';
import { type SortType } from '../models/SortType';

export interface MetricRepository {
  create: ({ name, value }: Partial<FactorialMetric>) => Promise<FactorialMetric>
  getAll: ({ sort }: { sort?: SortType }) => Promise<FactorialMetric[]>
  get: ({ id }: Pick<FactorialMetric, 'id'>) => Promise<FactorialMetric | null>
}
