import { it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "../src/components/Pagination/Pagination";

describe("Pagination component", () => {
  it("renders 'Pagination' component with disbled previous", () => {
    const onPreviousClick = vi.fn();
    const onNextClick = vi.fn();
    const { container } = render(
      <Pagination
        disablePrev={true}
        disableNext={false}
        onPreviousClick={onPreviousClick}
        onNextClick={onNextClick}
      />
    );
    const paginationPrevious = screen.getByText(/</i);
    expect(paginationPrevious).toBeInTheDocument();
    expect(paginationPrevious.parentNode).toBeDisabled();
    const paginationNext = screen.getByText(/>/i);
    expect(paginationNext).toBeInTheDocument();
    expect(paginationNext.parentNode).not.toBeDisabled();
    fireEvent.click(paginationNext);
    expect(onNextClick).toHaveBeenCalledOnce();
    expect(container).toMatchSnapshot();
  });

  it("renders 'Pagination' component with disbled next", () => {
    const onPreviousClick = vi.fn();
    const onNextClick = vi.fn();
    const { container } = render(
      <Pagination
        disablePrev={false}
        disableNext={true}
        onPreviousClick={onPreviousClick}
        onNextClick={onNextClick}
      />
    );
    const paginationPrevious = screen.getByText(/</i);
    expect(paginationPrevious).toBeInTheDocument();
    expect(paginationPrevious.parentNode).not.toBeDisabled();
    const paginationNext = screen.getByText(/>/i);
    expect(paginationNext).toBeInTheDocument();
    expect(paginationNext.parentNode).toBeDisabled();
    fireEvent.click(paginationPrevious);
    expect(onPreviousClick).toHaveBeenCalledOnce();
    expect(container).toMatchSnapshot();
  });
});
