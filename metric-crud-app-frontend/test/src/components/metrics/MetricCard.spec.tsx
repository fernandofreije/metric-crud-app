import { render } from '@testing-library/react';
import { DateTime } from 'luxon';
import MetricCard from '../../../../src/components/metrics/MetricCard';
import { Metric } from '../../../../src/models/Metric';
import { MetricBuilder } from '../../../builders/MetricBuilder';

describe('MetricCard', () => {

    let metric: Metric;
    beforeEach(() => {
        metric = new MetricBuilder().with({id: 'the-id', name: 'some name', value: 8, createdAt: DateTime.now().minus({hour: 1}).toJSDate()}).get();
    })
  
    it('contains the info for the metric', async () => {  
      const { findByText } = render(<MetricCard metric={metric} />);
  
      expect(await findByText(/some name/i)).toBeInTheDocument();
      expect(await findByText(/8/i)).toBeInTheDocument();
    });

    it('contains the humanized date for the metric', async () => {  
        const { findByText } = render(<MetricCard metric={metric} />);
    
        expect(await findByText(/an hour ago/i)).toBeInTheDocument();
    });

    it('contains the link to the metric details', async () => {  
        const { findByText } = render(<MetricCard metric={metric} />);
    
        expect(await findByText(/see details/i)).toHaveAttribute('href', expect.stringMatching(/\/metrics\/the-id/i));
    });
  });
  