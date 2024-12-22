import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Loader from "../src/components/common/Loader/Loader";

describe("Loader component", () => {
  it("renders 'Loader' component", () => {
    const { container } = render(<Loader />);
    const loading = screen.getByText(/Loading .../i);
    expect(loading).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
