import { it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../src/components/Header/Header";
import { BrowserRouter } from "react-router";

describe("Header component", () => {
  it("renders 'Header' component", () => {
    const setSearchTerm = vi.fn();
    const { container } = render(
      <BrowserRouter>
        <Header searchTerm="test search term" setSearchTerm={setSearchTerm} />
      </BrowserRouter>
    );
    const searchBar = screen.getByPlaceholderText(/search characters/i);
    const button = screen.getByText(/♥️/);
    expect(searchBar).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    fireEvent.change(searchBar, { target: { value: "new value" } });
    expect(setSearchTerm).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });
});
