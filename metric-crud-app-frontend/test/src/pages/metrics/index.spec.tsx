import { act, render, screen } from '@testing-library/react';
import { DateTime } from 'luxon';
import { afterEach } from 'node:test';
import MetricListPage from '../../../../src/pages/metrics';
import { MetricAveragesBuilder } from '../../../builders/MetricAveragesBuilder';
import { MetricBuilder } from '../../../builders/MetricBuilder';

const metric1 = new MetricBuilder().with({id: 'the-id-1', name: 'some name 1', value: 11, createdAt: DateTime.now().minus({hour: 1}).toJSDate()}).get();
const metric2 = new MetricBuilder().with({id: 'the-id-2', name: 'some name 2', value: 22, createdAt: DateTime.now().minus({hour: 2}).toJSDate()}).get();

jest.mock('../../../../src/hooks/useMetrics', () => ( {__esModule: true, useMetrics: () => ({
        data:  [metric1, metric2],
        loading: false,
        error: false,
    })}));

const averages = new MetricAveragesBuilder().with({
    oneMinuteAgo: {value: 1, total: 2},
    oneHourAgo: {value: 3, total: 4},
    oneDayAgo: {value: 5, total: 6}
}).get();
jest.mock('../../../../src/hooks/useAverages', () => ({ __esModule: true, useAverages: () => ({
        data:  averages,
        loading: false,
        error: false,
    })}));

describe('/metrics page', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    it('shows the metrics list', async () => {  

       act(() => {
        render(<MetricListPage />);
      });
  
      expect(await screen.findByText(/timeline/i)).toBeInTheDocument();
      expect(await screen.findByText(/some name 1/i)).toBeInTheDocument();
      expect(await screen.findByText(/some name 2/i)).toBeInTheDocument();

    });

    
    it('shows the averages', async () => {  
        act(() => {
            render(<MetricListPage />);
          });
    
        expect(await screen.findByText(/averages/i)).toBeInTheDocument();
        expect(await screen.findByText(/3/i)).toBeInTheDocument()
        expect(await screen.findByText(/4/i)).toBeInTheDocument();
        expect(await screen.findByText(/5/i)).toBeInTheDocument();
        expect(await screen.findByText(/6/i)).toBeInTheDocument();
  
      });

      it('shows the navbar', async () => {  
        act(() => {
            render(<MetricListPage />);
          });
    
        expect(await screen.findByText(/metric crud app/i)).toBeInTheDocument();
        expect(await screen.findByText(/create new metric/i)).toBeInTheDocument()  
      });
  });
  