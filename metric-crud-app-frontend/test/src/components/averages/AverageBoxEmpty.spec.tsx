import { render } from '@testing-library/react';
import AverageBoxEmpty from '../../../../src/components/averages/AverageBoxEmpty';

describe('AverageBoxEmpty', () => {
  
    it('shows "-" instead of the data for averages', async () => {
      const { findByText, findAllByText } = render(<AverageBoxEmpty text={'One minute ago test'} />);
  
      expect(await findByText(/one minute ago test/i)).toBeInTheDocument();

      expect(await findByText(/average/i)).toBeInTheDocument();

      expect(await findByText(/total/i)).toBeInTheDocument();

      expect(await findAllByText(/\-/i)).toHaveLength(2);

    });
  });
  