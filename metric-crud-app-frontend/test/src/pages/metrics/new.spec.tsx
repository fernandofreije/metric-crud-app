import { render } from '@testing-library/react';
import { Router } from 'next/router';
import nock from 'nock/types';
import NewMetricPage from '../../../../src/pages/metrics/new';

describe('/metric/new page', () => {
  let scope: nock.Scope;

  beforeEach(async () => {
    jest.spyOn(await import('next/router'), 'useRouter').mockImplementation(
      () => (({ prefetch: jest.fn(async () => Promise.resolve()) } as unknown) as Router),
    );
  });

  it('renders the form', async () => {  
    const { findByText } = render(<NewMetricPage/>);

    expect(await findByText(/name/i)).toBeInTheDocument();
    expect(await findByText(/value/i)).toBeInTheDocument();
    expect(await findByText(/create/i)).toBeInTheDocument();
  });
});
  