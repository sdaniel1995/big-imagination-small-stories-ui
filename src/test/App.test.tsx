import { cleanup, render } from '@testing-library/react';

import App from '../components/App';

afterEach(cleanup);

test('', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('app')).toContainElement(getByTestId('homePage'));
});