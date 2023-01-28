import { GetAllMetrics } from '../../../src/useCases/metric/GetAllMetrics';
import { FakeMetricRepository } from '../../stubs/FakeMetricRepository';

describe('GetAllMetrics', () => {
  describe('#perform', () => {
    it('returns all the metrics', async () => {
      const fakeRepository = new FakeMetricRepository();

      fakeRepository.getAll = jest.fn(() => ([{ name: 'somename', value: 3 }, { name: 'othername', value: 4 }]));

      const subject = new GetAllMetrics(fakeRepository);

      expect(await subject.perform()).toEqual({ data: [{ name: 'somename', value: 3 }, { name: 'othername', value: 4 }] });
    });
  });
});
