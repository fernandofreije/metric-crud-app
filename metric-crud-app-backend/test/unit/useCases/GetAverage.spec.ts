import { GetAverages } from '../../../src/useCases/metric/GetAverages';
import { FakeMetricRepository } from '../../stubs/FakeMetricRepository';

describe('GetAverage', () => {
  describe('#perform', () => {
    it('returns all the metrics', async () => {
      const fakeRepository = new FakeMetricRepository();

      fakeRepository.getAverage = jest.fn(() => ({ value: 1, total: 2 }));

      const subject = new GetAverages(fakeRepository);

      expect(await subject.perform()).toEqual({
        data: {
          oneMinuteAgo: { value: 1, total: 2 },
          oneHourAgo: { value: 1, total: 2 },
          oneDayAgo: { value: 1, total: 2 }
        }
      });
    });
  });
});
