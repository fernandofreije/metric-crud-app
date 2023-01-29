import { render } from '@testing-library/react';
import AverageBoxList from '../../../../src/components/averages/AverageBoxList';
import { MetricAverages } from '../../../../src/models/MetricAverages';
import { MetricAveragesBuilder } from '../../../builders/MetricAveragesBuilder';

describe('AverageBoxList', () => {
  let averages: MetricAverages;
  beforeAll(() => {
    averages = new MetricAveragesBuilder().with({
      oneMinuteAgo: {value: 1, total: 2},
      oneHourAgo: {value: 3, total: 4},
      oneDayAgo: {value: 5, total: 6}
    }).get();
  })
  
    it('shows the average in boxes', async () => {
    
      const { findByText, findAllByText } = render(<AverageBoxList averages={averages} loading={false} error={false} />);
  
      expect(await findByText(/last minute/i)).toBeInTheDocument();
      expect(await findByText(/last hour/i)).toBeInTheDocument();
      expect(await findByText(/last day/i)).toBeInTheDocument();


      expect(await findAllByText(/average/i)).toHaveLength(3);
      expect(await findAllByText(/total/i)).toHaveLength(3);

      expect(await findByText(/1/i)).toBeInTheDocument();
      expect(await findByText(/2/i)).toBeInTheDocument();
      expect(await findByText(/3/i)).toBeInTheDocument();
      expect(await findByText(/4/i)).toBeInTheDocument();
      expect(await findByText(/5/i)).toBeInTheDocument();
      expect(await findByText(/6/i)).toBeInTheDocument();
    });

    it('shows empty average boxes if content is loading', async () => {
      const { findByText, findAllByText } = render(<AverageBoxList averages={averages} loading={true} error={false} />);
  
      expect(await findByText(/last minute/i)).toBeInTheDocument();
      expect(await findByText(/last hour/i)).toBeInTheDocument();
      expect(await findByText(/last day/i)).toBeInTheDocument();


      expect(await findAllByText(/average/i)).toHaveLength(3);
      expect(await findAllByText(/total/i)).toHaveLength(3);

      expect(await findAllByText(/\-/i)).toHaveLength(6);
    });

    it('shows empty average boxes if content is undefined', async () => {
      const { findByText, findAllByText } = render(<AverageBoxList averages={undefined} loading={false} error={false} />);
  
      expect(await findByText(/last minute/i)).toBeInTheDocument();
      expect(await findByText(/last hour/i)).toBeInTheDocument();
      expect(await findByText(/last day/i)).toBeInTheDocument();


      expect(await findAllByText(/average/i)).toHaveLength(3);
      expect(await findAllByText(/total/i)).toHaveLength(3);

      expect(await findAllByText(/\-/i)).toHaveLength(6);
    });

    it('shows empty average boxes if content is and an error message if an error has ocurred', async () => {
      const { findByText, findAllByText } = render(<AverageBoxList averages={averages} loading={false} error={new Error('some error')} />);
  
      expect(await findByText(/last minute/i)).toBeInTheDocument();
      expect(await findByText(/last hour/i)).toBeInTheDocument();
      expect(await findByText(/last day/i)).toBeInTheDocument();


      expect(await findAllByText(/average/i)).toHaveLength(4);
      expect(await findAllByText(/total/i)).toHaveLength(3);

      expect(await findAllByText(/\-/i)).toHaveLength(6);

      expect(await findByText(/something was wrong retrieving the averages/i)).toBeInTheDocument();
    });
  });
  