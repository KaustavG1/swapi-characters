import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("App", () => {
  it("renders headline", () => {
    render(<App />);
    const headline = screen.getByText(/Loading/i);
    expect(headline).toBeInTheDocument();
  });
});
