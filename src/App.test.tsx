import { render, screen} from "@testing-library/react"
import App from "./App"
import { renderWithProviders } from "./utils/test-utils"

test("App should have correct initial render", () => {
  renderWithProviders(<App />)

  // The app should be rendered correctly
  expect(screen.getByText(/learn/i)).toBeInTheDocument()
})

describe('App Component', () => {
  test('renders header and main section', () => {
    const { getByTestId } = render(<App />);
    
    // Check if the Header component is rendered
    const headerElement = getByTestId('header-component');
    expect(headerElement).toBeInTheDocument();

    // Check if the HomeMainSection component is rendered
    const mainSectionElement = getByTestId('home-main-section-component');
    expect(mainSectionElement).toBeInTheDocument();
  });

});
