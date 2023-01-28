import { prisma } from '../../../src/db/db';
import { MetricPrismaRepository } from '../../../src/repositories/MetricPrismaRepository';

describe('MetricPrismaRepository', () => {
  beforeEach(async () => {
    await prisma.factorialMetric.deleteMany({});
  });

  describe('#create', () => {
    it('creates a new metric if parameters are correct', async () => {
      const subject = new MetricPrismaRepository();

      await subject.create({ name: 'somename', value: 5 });

      const metrics = await prisma.factorialMetric.findMany();

      expect(metrics).toEqual(expect.arrayContaining([expect.objectContaining({ name: 'somename', value: 5 })]));
    });

    it('raises an error a key param is missing', async () => {
      const subject = new MetricPrismaRepository();

      await expect(subject.create({ name: undefined, value: 2 }))
        .rejects
        .toThrow('Missing key variables for the creation of Metrics');
    });
  });

  describe('#getAll', () => {
    it('returns no metrics if there are no metrics', async () => {
      const subject = new MetricPrismaRepository();
      expect(await subject.getAll()).toEqual([]);
    });

    it('returns the metrics if there are metrics', async () => {
      const subject = new MetricPrismaRepository();

      await prisma.factorialMetric.create({ data: { name: 'somemetric', value: 1 } });
      await prisma.factorialMetric.create({ data: { name: 'othermetric', value: 2 } });

      const result = await subject.getAll();

      expect(result.length).toEqual(2);
      expect(result).toEqual(expect.arrayContaining([expect.objectContaining({ name: 'somemetric', value: 1 }), expect.objectContaining({ name: 'othermetric', value: 2 })]));
    });
  });

  describe('#get', () => {
    it('returns null if the metric doesnt exist', async () => {
      const subject = new MetricPrismaRepository();
      expect(await subject.get({ id: 'randomid' })).toEqual(null);
    });

    it('returns the metrics if there are metrics', async () => {
      const subject = new MetricPrismaRepository();

      const metric = await prisma.factorialMetric.create({ data: { name: 'somemetric', value: 1 } });

      const result = await subject.get({ id: metric.id });

      expect(result).toEqual(expect.objectContaining({ name: 'somemetric', value: 1 }));
    });
  });
});
