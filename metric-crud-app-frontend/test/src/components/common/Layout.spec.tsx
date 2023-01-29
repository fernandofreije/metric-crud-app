import { render } from '@testing-library/react';
import Layout from '../../../../src/components/common/Layout';

describe('Layout', () => {
    it('shows content of the layout', async () => {  
      const { findByText } = render(<Layout>content</Layout>);
  
      expect(await findByText(/content/i)).toBeInTheDocument();
    });

    it('shows content of the navbar if passed', async () => {  
      const { findByText } = render(<Layout navContent="navbar content">layout content</Layout>);
  
      expect(await findByText(/layout content/i)).toBeInTheDocument();
      expect(await findByText(/navbar content/i)).toBeInTheDocument();

    });

    it('shows content of the title of the navbar if nothing was if passed', async () => {  
      const { findByText } = render(<Layout>layout content</Layout>);
  
      expect(await findByText(/metric crud app/i)).toBeInTheDocument();

    });

    it('shows content of the title of the navbar if something was if passed', async () => {  
      const { findByText } = render(<Layout navContent="navbar content">layout content</Layout>);
  
      expect(await findByText(/metric crud app/i)).toBeInTheDocument();

    });
  });
  