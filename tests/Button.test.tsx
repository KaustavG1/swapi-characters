import { it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../src/components/common/Button/Button";

describe("Button component", () => {
  it("renders 'Button' component", () => {
    const onClick = vi.fn();
    const { container } = render(
      <Button text="Test button" onClick={onClick} />
    );
    const button = screen.getByText(/Test button/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
    expect(container).toMatchSnapshot();
  });

  it("renders disabled 'Button' component", () => {
    const { container } = render(<Button text="Test Button" disabled={true} />);
    const button = screen.getByText(/Test Button/i).parentNode;
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(container).toMatchSnapshot();
  });
});
