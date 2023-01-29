import { fireEvent, render } from '@testing-library/react';
import Button from '../../../../src/components/common/Button';

describe('Button', () => {

    it('shows the text of the button', async () => {  
      const { findByText } = render(<Button>click me</Button>);
  
      expect(await findByText(/click me/i)).toBeInTheDocument();
    });

    it('calls onClick function when clicked', async () => {  
        const fakeOnClick = jest.fn();
        const { findByText } = render(<Button onClick={fakeOnClick}>click me</Button>);

        const button = await findByText(/click me/i);

        fireEvent.click(button);
    
        expect(fakeOnClick).toHaveBeenCalled();
      });
  });
  