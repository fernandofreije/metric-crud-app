import { NextApiRequest, NextApiResponse } from 'next';
import connect from 'next-connect';
import { BackendHttpDriver } from '../../../repositories/drivers/BackendHttpDriver';
import { HttpMetricRepository } from '../../../repositories/HttpMetricRepository';

export default connect().get(async (req: NextApiRequest, res: NextApiResponse) => {
    const driver = new BackendHttpDriver();
    const metricRepository = new HttpMetricRepository(driver);

    const metrics = await metricRepository.getAll();

    return res.status(200).json({ data: metrics });
  }).post(async (req: NextApiRequest, res: NextApiResponse) => {
    const driver = new BackendHttpDriver();
    const metricRepository = new HttpMetricRepository(driver);

    await metricRepository.post(JSON.parse(req.body));

    return res.status(200).end();
  })
