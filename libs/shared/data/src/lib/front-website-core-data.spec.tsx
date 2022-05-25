import { render } from '@testing-library/react';

import FrontWebsiteDataService from './front-website-core-data';

describe('FrontWebsiteDataService', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontWebsiteDataService />);
    expect(baseElement).toBeTruthy();
  });
});
