import { GetMetric } from '../../../src/useCases/metric/GetMetric';
import { FakeMetricRepository } from '../../stubs/FakeMetricRepository';

describe('CreateMetric', () => {
  describe('#perform', () => {
    it('returns the metric if it exists', async () => {
      const fakeRepository = new FakeMetricRepository();

      fakeRepository.get = jest.fn(() => ({ id: 'someid', name: 'somename', value: 3 }));

      const subject = new GetMetric(fakeRepository);

      expect(await subject.perform({ id: 'someid' })).toEqual({ data: { id: 'someid', name: 'somename', value: 3 } });
    });

    it('returns an error with 404 not found status if it does not exist', async () => {
      const fakeRepository = new FakeMetricRepository();

      fakeRepository.create = jest.fn(() => null);

      const subject = new GetMetric(fakeRepository);

      expect(await subject.perform({ id: 'nonexistingid' })).toEqual({ error: { code: 404, message: expect.any(String) } });
    });
  });
});
