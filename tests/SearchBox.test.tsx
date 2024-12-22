import { it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchBox from "../src/components/SearchBox/SearchBox";

describe("SearchBox component", () => {
  it("renders 'SearchBox' component", () => {
    const setSearchTerm = vi.fn();
    const { container } = render(
      <SearchBox searchTerm="test search term" setSearchTerm={setSearchTerm} />
    );
    const searchBar = screen.getByPlaceholderText(/search characters/i);
    expect(searchBar).toBeInTheDocument();
    fireEvent.change(searchBar, { target: { value: "new value" } });
    expect(setSearchTerm).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });
});
