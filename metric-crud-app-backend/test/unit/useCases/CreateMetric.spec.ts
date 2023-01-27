import { UnprocessableEntityError } from '../../../src/errors/UnprocessableEntityError'
import { CreateMetric } from '../../../src/useCases/metric/CreateMetric'
import { FakeMetricRepository } from '../../stubs/FakeMetricRepository'

describe('CreateMetric', () => {
  describe('#perform', () => {
    it('returns a metric with if it was created succesfully', async () => {
      const fakeRepository = new FakeMetricRepository()

      fakeRepository.create = jest.fn(() => ({ name: 'somename', value: 3 }))

      const subject = new CreateMetric(fakeRepository)

      expect(await subject.perform({ name: 'somename', value: 3 })).toEqual({ data: { name: 'somename', value: 3 } })
    })

    it('returns an error with 422 unprocessable entity status code if a param was missing', async () => {
      const fakeRepository = new FakeMetricRepository()

      fakeRepository.create = jest.fn(() => { throw new UnprocessableEntityError('some specific error') })

      const subject = new CreateMetric(fakeRepository)

      expect(await subject.perform({ name: 'somename', value: 3 })).toEqual({ error: { code: 422, message: expect.any(String) } })
    })

    it('returns an error with 400 bad request status code if some generic error was raised', async () => {
      const fakeRepository = new FakeMetricRepository()

      fakeRepository.create = jest.fn(() => { throw new Error('some error') })

      const subject = new CreateMetric(fakeRepository)

      expect(await subject.perform({ name: 'somename', value: 3 })).toEqual({ error: { code: 400, message: expect.any(String) } })
    })
  })
})
