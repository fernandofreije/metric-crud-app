import { render } from '@testing-library/react';
import Loading from '../../../../src/components/common/Loading';

describe('Loading', () => {

    it('shows loading text', async () => {  
      const { findByText } = render(<Loading/>);
  
      expect(await findByText(/loading/i)).toBeInTheDocument();
    });
  });
  