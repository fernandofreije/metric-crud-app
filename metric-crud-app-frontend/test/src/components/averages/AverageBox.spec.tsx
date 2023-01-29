import { render } from '@testing-library/react';
import AverageBox from '../../../../src/components/averages/AverageBox';

describe('AverageBox', () => {
  
    it('shows the average data for the last minute', async () => {
      const { findByText } = render(<AverageBox text={'One minute ago test'} value={2} total={3} />);
  
      expect(await findByText(/one minute ago test/i)).toBeInTheDocument();

      expect(await findByText(/average/i)).toBeInTheDocument();
      expect(await findByText(/2/i)).toBeInTheDocument()

      expect(await findByText(/total/i)).toBeInTheDocument();
      expect(await findByText(/3/i)).toBeInTheDocument();

    });
  });
  