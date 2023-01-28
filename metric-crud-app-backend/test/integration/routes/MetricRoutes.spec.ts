import { prisma } from '../../../src/db/db';
import supertest, { type SuperTest } from 'supertest';
import app from '../../../src/app';
import { type Server } from 'http';
import { DateTime } from 'luxon';

describe('MetricRoutes', () => {
  let server: Server;
  let request: SuperTest<supertest.Test>;

  beforeAll(async () => {
    server = app.listen(process.env.PORT ?? 8080);
    request = supertest.agent(server);
  });

  afterAll(async () => {
    server.close();
  });

  beforeEach(async () => {
    await prisma.factorialMetric.deleteMany({});
  });

  describe('/metric', () => {
    describe('POST /metric', () => {
      it('creates a new metric if parameters are correct', async () => {
        await request.post('/metric').send({ name: 'somename', value: 1 });

        const metric = await prisma.factorialMetric.findFirst();

        expect(metric).toEqual(expect.objectContaining({ name: 'somename', value: 1 }));
      });

      it('returns 200 and the created metric', async () => {
        const result = await request.post('/metric').send({ name: 'somename', value: 1 }).expect(200);

        expect(result.body).toEqual(expect.objectContaining({ name: 'somename', value: 1 }));
      });

      it('returns 400 if a param is missing', async () => {
        return await request.post('/metric').send({ name: 'somename' }).expect(400);
      });

      it('returns 400 if a param is of the wrong type', async () => {
        return await request.post('/metric').send({ name: 3, value: 1 }).expect(400);
      });
    });

    describe('GET /metric', () => {
      it('returns empty if there is no metrics', async () => {
        const result = await request.get('/metric');

        expect(result.body).toEqual([]);
      });

      it('returns all existing metrics', async () => {
        const olderTime = DateTime.now().minus({ hour: 2 }).toJSDate();
        const midTime = DateTime.now().minus({ hour: 1 }).toJSDate();
        const newerTime = DateTime.now().toJSDate();
        await prisma.factorialMetric.create({ data: { name: 'midMetric', value: 1, createdAt: midTime } });
        await prisma.factorialMetric.create({ data: { name: 'olderMetric', value: 2, createdAt: olderTime } });
        await prisma.factorialMetric.create({ data: { name: 'newerMetric', value: 3, createdAt: newerTime } }); ;

        const result = await request.get('/metric');

        expect(result.body).toEqual([
          expect.objectContaining({ name: 'midMetric', value: 1 }),
          expect.objectContaining({ name: 'olderMetric', value: 2 }),
          expect.objectContaining({ name: 'newerMetric', value: 3 })
        ]);
      });

      it('returns all existing metrics ordered by timeline', async () => {
        const olderTime = DateTime.now().minus({ hour: 2 }).toJSDate();
        const midTime = DateTime.now().minus({ hour: 1 }).toJSDate();
        const newerTime = DateTime.now().toJSDate();
        await prisma.factorialMetric.create({ data: { name: 'midMetric', value: 1, createdAt: midTime } });
        await prisma.factorialMetric.create({ data: { name: 'olderMetric', value: 2, createdAt: olderTime } });
        await prisma.factorialMetric.create({ data: { name: 'newerMetric', value: 3, createdAt: newerTime } }); ;

        const result = await request.get('/metric?sort=timeline');

        expect(result.body).toEqual([
          expect.objectContaining({ name: 'newerMetric', value: 3 }),
          expect.objectContaining({ name: 'midMetric', value: 1 }),
          expect.objectContaining({ name: 'olderMetric', value: 2 })
        ]);
      });
    });

    describe('GET /metric', () => {
      it('returns 404 if metric with that id doesn\'t exist', async () => {
        await prisma.factorialMetric.create({ data: { name: 'metric1', value: 1 } });

        return await request.get('/metric/someid').expect(404);
      });

      it('returns 200 and the metric if a metric with that id exists', async () => {
        const { id } = await prisma.factorialMetric.create({ data: { name: 'metric1', value: 1 } });

        const result = await request.get(`/metric/${id}`).expect(200);
        expect(result.body).toEqual(expect.objectContaining({ name: 'metric1', value: 1 }));
      });
    });
  });
});
