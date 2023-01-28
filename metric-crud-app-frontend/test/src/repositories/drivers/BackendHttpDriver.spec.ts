import { BackendHttpDriver } from '../../../../src/repositories/drivers/BackendHttpDriver';
import { HttpMockFactory } from '../../utils/HttpMockFactory';


describe('BackendHttpDriver', () => {
  describe('#post', () => {
    beforeAll(() => {
      process.env.BACKEND_URL = 'http://localhost';
    });

    afterAll(() => {
      delete process.env.BACKEND_URL;
    });

    it("sends a POST request to the backend", async () => {
      const scope = HttpMockFactory.build({ url: 'http://localhost' })
        .post('/foo', {})
        .once()
        .reply(201, {});

      const subject = new BackendHttpDriver();

      await subject.post('/foo', { body: {} });

      expect(scope.isDone()).toBe(true);
    });

    it('triggers an error if the request goes badly', async () => {
      HttpMockFactory.build({ url: 'http://localhost' }).post('/foo', {}).once().reply(404, {});

      const subject = new BackendHttpDriver();

      await expect(subject.post('/foo', { body: {} })).rejects.toThrowError(/request failed with status: 404/);
    });
  });

  describe('#get', () => {
    beforeAll(() => {
      process.env.BACKEND_URL = 'http://localhost';
    });

    afterAll(() => {
      delete process.env.BACKEND_URL;
    });

    it("sends a GET request to admin's back-end", async () => {
      const scope = HttpMockFactory.build({ url: 'http://localhost' }).get('/foo').once().reply(200, {});

      const subject = new BackendHttpDriver();

      await subject.get('/foo');

      expect(scope.isDone()).toBe(true);
    });


    it('triggers an error if the request goes badly', async () => {
      HttpMockFactory.build({ url: 'http://localhost' }).get('/foo').once().reply(404, {});

      const subject = new BackendHttpDriver();;

      await expect(subject.get('/foo')).rejects.toThrowError(/request failed with status: 404/);
    });
  });

 
});
