import { render } from '@testing-library/react';

import SpeechBubble from './speech-bubble';

describe('SpeechBubble', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SpeechBubble />);
    expect(baseElement).toBeTruthy();
  });
});
