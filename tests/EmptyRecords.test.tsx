import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EmptyRecords from "../src/components/common/EmptyRecords/EmptyRecords";

describe("EmptyRecords component", () => {
  it("renders 'EmptyRecords' component", () => {
    const { container } = render(<EmptyRecords />);
    const emptyRecords = screen.getByText(/No Records found./i);
    expect(emptyRecords).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
