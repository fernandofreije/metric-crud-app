import { render } from '@testing-library/react';
import Info from '../../../../src/components/common/Info';

describe('Info', () => {

    it('shows the text of the info', async () => {  
      const { findByText } = render(<Info>some info</Info>);
  
      expect(await findByText(/some info/i)).toBeInTheDocument();
    });
  });
  