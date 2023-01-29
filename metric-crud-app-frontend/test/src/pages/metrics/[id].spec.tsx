import { render } from '@testing-library/react';
import { DateTime } from 'luxon';
import { Metric } from '../../../../src/models/Metric';
import MetricDetailsPage from '../../../../src/pages/metrics/[id]';
import { MetricBuilder } from '../../../builders/MetricBuilder';

describe('/metric/id page', () => {

    let metric: Metric;
    beforeEach(() => {
        metric = new MetricBuilder().with({id: 'the-id-1', name: 'some name 1', value: 11, createdAt: DateTime.now().minus({hour: 1}).toJSDate()}).get();
    })

    it('shows the metric', async () => {  
      const { findByText } = render(<MetricDetailsPage metric={metric}/>);
  
      expect(await findByText(/some name 1/i)).toBeInTheDocument();
    });
  });
  