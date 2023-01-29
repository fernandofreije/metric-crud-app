import { noop } from "lodash";
import { FakeHttpDriver } from "../../../src/repositories/drivers/FakeHttpDriver";
import { HttpMetricRepository } from "../../../src/repositories/HttpMetricRepository";
import { NoLogger } from "../../../src/util/logger/NoLogger";

 
describe('HttpMetricRepository', () => {
    describe('#get', () => {
      it('calls the driver properly', async () => {
        const driver = new FakeHttpDriver();
        driver.get.mockReturnValueOnce(Promise.resolve({}));
        const subject = new HttpMetricRepository(driver, new NoLogger());
  
        subject.get({ metricId: 'someId'}),
          expect(driver.get).toHaveBeenCalledWith(`/metric/someId`);
      });
  
      it('throws an exception if the driver fails to perform the operation', async () => {
        const driver = new FakeHttpDriver();
        driver.get.mockImplementationOnce(() => Promise.reject('Boom!'));
        const subject = new HttpMetricRepository(driver, new NoLogger());
  
        await expect(
            subject.get({ metricId: 'someId'}),
        ).rejects.toThrowError(/There was an error trying to get the metric/i);
      });
  
      it('logs the exception if the driver fails to perform the operation', async () => {
        const driver = new FakeHttpDriver();
        driver.get.mockImplementationOnce(() => Promise.reject('Boom!'));
        const logger = new NoLogger();
        const subject = new HttpMetricRepository(driver, logger);
  
        await subject.get({ metricId: 'someId'}).catch(noop);
  
        expect(logger.error).toHaveBeenCalledWith('Boom!');
      });
    });
  
    describe('#getAll', () => {
      it('calls the driver properly', async () => {
        const driver = new FakeHttpDriver();
        driver.get.mockReturnValueOnce(Promise.resolve({}));
        const subject = new HttpMetricRepository(driver, new NoLogger());
  
        await subject.getAll();
  
        expect(driver.get).toHaveBeenCalledWith(`/metric?sort=timeline`);
      });
  
      it('throws an exception if the driver fails to perform the operation', async () => {
        const driver = new FakeHttpDriver();
        driver.get.mockImplementationOnce(() => Promise.reject('Boom!'));
        const subject = new HttpMetricRepository(driver, new NoLogger());
  
        await expect(subject.getAll()).rejects.toThrowError(
          /There was an error trying to get metrics/i,
        );
      });
  
      it('logs the exception if the driver fails to perform the operation', async () => {
        const driver = new FakeHttpDriver();
        driver.get.mockImplementationOnce(() => Promise.reject('Boom!'));
        const logger = new NoLogger();
        const subject = new HttpMetricRepository(driver, logger);
  
        await subject.getAll().catch(noop);
  
        expect(logger.error).toHaveBeenCalledWith('Boom!');
      });
    });
  
    describe('#post', () => {
      it('calls the driver properly', async () => {
        const driver = new FakeHttpDriver();
        driver.get.mockReturnValueOnce(Promise.resolve({}));
        const subject = new HttpMetricRepository(driver, new NoLogger());
  
        subject.post({ name: 'someName', value: 2 }),
          expect(driver.post).toHaveBeenCalledWith(`/metric`, {body: { name: 'someName', value: 2 }});
      });
  
      it('throws an exception if the driver fails to perform the operation', async () => {
        const driver = new FakeHttpDriver();
        driver.post.mockImplementationOnce(() => Promise.reject('Boom!'));
        const subject = new HttpMetricRepository(driver, new NoLogger());
  
        await expect(subject.post({ name: 'somename', value: 2 })).rejects.toThrowError(
          /There was an error trying to create the metric/i,
        );
      });
  
      it('logs the exception if the driver fails to perform the operation', async () => {
        const driver = new FakeHttpDriver();
        driver.post.mockImplementationOnce(() => Promise.reject('Boom!'));
        const logger = new NoLogger();
        const subject = new HttpMetricRepository(driver, logger);
  
        await subject.post({ name: 'somename', value: 2 }).catch(noop);
  
        expect(logger.error).toHaveBeenCalledWith('Boom!');
      });
    });

    describe('#getAverages', () => {
      it('calls the driver properly', async () => {
        const driver = new FakeHttpDriver();
        driver.get.mockReturnValueOnce(Promise.resolve({}));
        const subject = new HttpMetricRepository(driver, new NoLogger());
  
        await subject.getAverages();
  
        expect(driver.get).toHaveBeenCalledWith(`/metric/averages`);
      });
  
      it('throws an exception if the driver fails to perform the operation', async () => {
        const driver = new FakeHttpDriver();
        driver.get.mockImplementationOnce(() => Promise.reject('Boom!'));
        const subject = new HttpMetricRepository(driver, new NoLogger());
  
        await expect(subject.getAverages()).rejects.toThrowError(
          /There was an error trying to get the averages/i,
        );
      });
  
      it('logs the exception if the driver fails to perform the operation', async () => {
        const driver = new FakeHttpDriver();
        driver.get.mockImplementationOnce(() => Promise.reject('Boom!'));
        const logger = new NoLogger();
        const subject = new HttpMetricRepository(driver, logger);
  
        await subject.getAverages().catch(noop);
  
        expect(logger.error).toHaveBeenCalledWith('Boom!');
      });
    });
  });
  