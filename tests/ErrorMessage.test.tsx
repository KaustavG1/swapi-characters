import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "../src/components/common/ErrorMessage/ErrorMessage";

describe("ErrorMessage component", () => {
  it("renders 'ErrorMessage' component", () => {
    const { container } = render(<ErrorMessage />);
    const errorMessage = screen.getByText(
      /An error has occured. Please try again later./i
    );
    expect(errorMessage).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
