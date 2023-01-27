import { type FactorialMetric } from '@prisma/client'

export interface MetricRepository {
  create: ({ name, value }: Partial<FactorialMetric>) => Promise<FactorialMetric>
  getAll: () => Promise<FactorialMetric[]>
  get: ({ id }: Pick<FactorialMetric, 'id'>) => Promise<FactorialMetric | null>
}
