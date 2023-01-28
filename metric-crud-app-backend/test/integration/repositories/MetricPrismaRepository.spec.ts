import { DateTime } from 'luxon';
import { prisma } from '../../../src/db/db';
import { SortType } from '../../../src/models/SortType';
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

    it('returns metrics in default order if non sort method is passed', async () => {
      const subject = new MetricPrismaRepository();

      const olderTime = DateTime.now().minus({ hour: 2 }).toJSDate();
      const midTime = DateTime.now().minus({ hour: 1 }).toJSDate();
      const newerTime = DateTime.now().toJSDate();
      await prisma.factorialMetric.create({ data: { name: 'midMetric', value: 1, createdAt: midTime } });
      await prisma.factorialMetric.create({ data: { name: 'olderMetric', value: 2, createdAt: olderTime } });
      await prisma.factorialMetric.create({ data: { name: 'newerMetric', value: 2, createdAt: newerTime } });

      const result = await subject.getAll();

      expect(result).toEqual([
        expect.objectContaining({ name: 'midMetric' }),
        expect.objectContaining({ name: 'olderMetric' }),
        expect.objectContaining({ name: 'newerMetric' })
      ]);
    });

    it('returns metrics in default order if standard method passed', async () => {
      const subject = new MetricPrismaRepository();

      const olderTime = DateTime.now().minus({ hour: 2 }).toJSDate();
      const midTime = DateTime.now().minus({ hour: 1 }).toJSDate();
      const newerTime = DateTime.now().toJSDate();
      await prisma.factorialMetric.create({ data: { name: 'midMetric', value: 1, createdAt: midTime } });
      await prisma.factorialMetric.create({ data: { name: 'olderMetric', value: 2, createdAt: olderTime } });
      await prisma.factorialMetric.create({ data: { name: 'newerMetric', value: 2, createdAt: newerTime } }); ;

      const result = await subject.getAll({ sort: SortType.standard });

      expect(result).toEqual([
        expect.objectContaining({ name: 'midMetric' }),
        expect.objectContaining({ name: 'olderMetric' }),
        expect.objectContaining({ name: 'newerMetric' })
      ]);
    });

    it('returns metrics ordered by createdAt if timeline sort method was passed', async () => {
      const subject = new MetricPrismaRepository();

      const olderTime = DateTime.now().minus({ hour: 2 }).toJSDate();
      const midTime = DateTime.now().minus({ hour: 1 }).toJSDate();
      const newerTime = DateTime.now().toJSDate();
      await prisma.factorialMetric.create({ data: { name: 'midMetric', value: 1, createdAt: midTime } });
      await prisma.factorialMetric.create({ data: { name: 'olderMetric', value: 2, createdAt: olderTime } });
      await prisma.factorialMetric.create({ data: { name: 'newerMetric', value: 2, createdAt: newerTime } });

      const result = await subject.getAll({ sort: SortType.timeline });

      expect(result).toEqual([
        expect.objectContaining({ name: 'newerMetric' }),
        expect.objectContaining({ name: 'midMetric' }),
        expect.objectContaining({ name: 'olderMetric' })
      ]);
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

  describe('#getAverage', () => {
    it('returns average and total in the established time frame', async () => {
      const subject = new MetricPrismaRepository();

      const tenMinutesAgo = DateTime.now().minus({ minute: 10 });

      await prisma.factorialMetric.create({ data: { name: 'metric', value: 10, createdAt: DateTime.now().toJSDate() } });
      await prisma.factorialMetric.create({ data: { name: 'otherMetric', value: 20, createdAt: DateTime.now().minus({ minute: 5 }).toJSDate() } });
      await prisma.factorialMetric.create({ data: { name: 'otherMetric', value: 2000, createdAt: DateTime.now().minus({ minute: 15 }).toJSDate() } });

      expect(await subject.getAverage({ since: tenMinutesAgo })).toEqual({ value: 15, total: 2 });
    });
  });
});
