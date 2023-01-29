import { MetricAveragesBuilder } from '../../../builders/MetricAveragesBuilder';
import { render } from '@testing-library/react';
import AverageBox from '../../../../src/components/averages/AverageBox';
import AverageBoxList from '../../../../src/components/averages/AverageBoxList';
import { MetricBuilder } from '../../../builders/MetricBuilder';
import { DateTime } from 'luxon';
import MetricCardList from '../../../../src/components/metrics/MetricCardList';
import { Metric } from '../../../../src/models/Metric';

describe('MetricCardList', () => {

    let metricList: Metric[];
    beforeAll(() => {
        const metric1 = new MetricBuilder().with({id: 'the-id-1', name: 'some name 1', value: 11, createdAt: DateTime.now().minus({hour: 1}).toJSDate()}).get();
        const metric2 = new MetricBuilder().with({id: 'the-id-2', name: 'some name 2', value: 22, createdAt: DateTime.now().minus({hour: 2}).toJSDate()}).get();

        metricList = [metric1, metric2]
    })
  
    it('shows the metrics info', async () => {

      const { findByText, findAllByText } = render(<MetricCardList metrics={metricList} loading={false} error={false} />);
  
      expect(await findByText(/some name 1/i)).toBeInTheDocument();
      expect(await findByText(/11/i)).toBeInTheDocument();
      expect(await findByText(/an hour ago/i)).toBeInTheDocument();

      expect(await findByText(/some name 2/i)).toBeInTheDocument();
      expect(await findByText(/22/i)).toBeInTheDocument();
      expect(await findByText(/2 hours ago/i)).toBeInTheDocument();


      expect(await findAllByText(/see details/i)).toHaveLength(2)


    });

    it('shows a loading message if it is loading', async () => {
      const { findByText } = render(<MetricCardList metrics={metricList} loading={true} error={false} />);
  
      expect(await findByText(/loading/i)).toBeInTheDocument();
    });

    it('shows a message for no metrics', async () => {
        const { findByText } = render(<MetricCardList metrics={[]} loading={false} error={false} />);
    
        expect(await findByText(/No metrics available/i)).toBeInTheDocument();
      });

      it('shows a message for undefined metrics', async () => {
        const { findByText } = render(<MetricCardList metrics={undefined} loading={false} error={false} />);
    
        expect(await findByText(/No metrics available/i)).toBeInTheDocument();
      });

      it('shows an error message if there was an error', async () => {
        const { findByText } = render(<MetricCardList metrics={undefined} loading={false} error={new Error('some error')} />);
    
        expect(await findByText(/Something went wrong retrieving the metrics/i)).toBeInTheDocument();
      });
  });
  