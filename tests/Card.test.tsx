import { it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Card from "../src/components/common/Card/Card";

describe("Card component", () => {
  it("renders 'Card' component", () => {
    const onClick = vi.fn();
    const { container } = render(
      <Card
        name="Test Name"
        gender="Male"
        homeworld="Test Planet"
        onClick={onClick}
      />
    );
    const card = screen.getByText(/Test Name/i);
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalledOnce();
    expect(card).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
