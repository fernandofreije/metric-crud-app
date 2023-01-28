import { type FactorialMetric } from '@prisma/client';
import { prisma } from '../db/db';
import { UnprocessableEntityError } from '../errors/UnprocessableEntityError';
import { SortType } from '../models/SortType';
import { type MetricRepository } from './MetricRepository';

export class MetricPrismaRepository implements MetricRepository {
  public async create ({ name, value }: Partial<FactorialMetric>): Promise<FactorialMetric> {
    if (name === undefined || value === undefined) {
      throw new UnprocessableEntityError('Missing key variables for the creation of Metrics');
    }

    const metric = await prisma.factorialMetric.create({
      data: {
        name,
        value
      }
    });

    return metric;
  }

  public async getAll ({ sort }: { sort?: SortType } = {}): Promise<FactorialMetric[]> {
    if (sort !== undefined && sort === SortType.timeline) {
      return await prisma.factorialMetric.findMany({ orderBy: { createdAt: 'desc' } });
    }

    return await prisma.factorialMetric.findMany();
  }

  public async get ({ id }: Pick<FactorialMetric, 'id'>): Promise<FactorialMetric | null> {
    return await prisma.factorialMetric.findUnique({ where: { id } }); ;
  }
}
