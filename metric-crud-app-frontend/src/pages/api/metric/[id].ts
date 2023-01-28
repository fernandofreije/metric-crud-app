
import { NextApiRequest, NextApiResponse } from 'next';
import connect from 'next-connect';
import { BackendHttpDriver } from '../../../repositories/drivers/BackendHttpDriver';
import { HttpMetricRepository } from '../../../repositories/HttpMetricRepository';

export default connect().get(async (req: NextApiRequest, res: NextApiResponse) => {
    const driver = new BackendHttpDriver();
    const metricRepository = new HttpMetricRepository(driver);

    const metric = await metricRepository.get({metricId: req.query.id as string});

    if (!metric) {
      return res.status(404).json({ data: null });
    }

    return res.status(200).json({ data: metric });
  })
