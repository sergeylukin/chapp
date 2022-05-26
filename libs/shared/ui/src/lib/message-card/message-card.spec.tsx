import { render } from '@testing-library/react';

import MessageCard from './message-card';

describe('MessageCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MessageCard />);
    expect(baseElement).toBeTruthy();
  });
});
