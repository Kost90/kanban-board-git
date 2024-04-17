import { renderWithProviders } from "./utils/test-utils"
import App from './App';

describe('App component', () => {
  test('renders header and main section', () => {
    const { getByTestId } = renderWithProviders(<App />);

    const headerElement = getByTestId('header');
    expect(headerElement).toBeInTheDocument();

    const mainSectionElement = getByTestId('main-section');
    expect(mainSectionElement).toBeInTheDocument();
  });
});