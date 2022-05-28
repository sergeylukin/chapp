import { render } from '@testing-library/react';

import SharedConfig from './shared-config';

describe('SharedConfig', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedConfig />);
    expect(baseElement).toBeTruthy();
  });
});
