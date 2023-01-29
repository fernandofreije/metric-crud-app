import { render } from '@testing-library/react';
import ErrorComponent from '../../../../src/components/common/Error';

describe('Error', () => {

    it('shows the text of the error', async () => {  
      const { findByText } = render(<ErrorComponent>some error</ErrorComponent>);
  
      expect(await findByText(/some error/i)).toBeInTheDocument();
    });

    it('shows the text of the error in red', async () => {  
      const { findByText } = render(<ErrorComponent>some error</ErrorComponent>);
  
      expect(await findByText(/some error/i)).toHaveStyle('color: red');
    });
  });
  