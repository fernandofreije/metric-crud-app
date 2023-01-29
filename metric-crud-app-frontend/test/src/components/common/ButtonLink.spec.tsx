import { render } from '@testing-library/react';
import ButtonLink from '../../../../src/components/common/ButtonLink';

describe('ButtonLink', () => {

    it('shows the text of the button link', async () => {  
      const { findByText } = render(<ButtonLink href='/test'>click me</ButtonLink>);
  
      expect(await findByText(/click me/i)).toBeInTheDocument();
    });
  });
  