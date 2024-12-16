import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("App", () => {
  it("renders loading", () => {
    const { container } = render(<App />);
    const headline = screen.getByText(/Loading/i);
    expect(headline).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renders headline", () => {
    const { container } = render(<App />);
    const headline = screen.getByText(/Loading/i);
    expect(headline).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
