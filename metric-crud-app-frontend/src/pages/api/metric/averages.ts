import { NextApiRequest, NextApiResponse } from 'next';
import connect from 'next-connect';
import { BackendHttpDriver } from '../../../repositories/drivers/BackendHttpDriver';
import { HttpMetricRepository } from '../../../repositories/HttpMetricRepository';

export default connect().get(async (_: NextApiRequest, res: NextApiResponse) => {
    const driver = new BackendHttpDriver();
    const metricRepository = new HttpMetricRepository(driver);

    const metrics = await metricRepository.getAverages();

    return res.status(200).json({ data: metrics });
  });
