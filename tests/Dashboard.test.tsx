import axios from "axios";
import { it, expect, vi, MockedFunction } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import Dashboard from "../src/pages/Dashboard";
import { mockPaginationInput } from "./__mocks__/mockPaginationInput";

vi.mock("axios");
(axios.get as MockedFunction<typeof axios>).mockResolvedValue({
  data: mockPaginationInput,
});

afterEach(vi.clearAllMocks);

describe("Dashboard component", () => {
  it("renders 'Dashboard' component success case", async () => {
    const { container } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    const loader = screen.getByText(/Loading .../i);
    expect(loader).toBeInTheDocument();
    expect(container).toMatchSnapshot();

    await waitFor(() => {
      expect(screen.getAllByText(/Luke Skywalker/i)[0]).toBeInTheDocument();
    });
  });

  it("renders 'Dashboard' component failure case", async () => {
    (axios.get as MockedFunction<typeof axios>).mockRejectedValue(
      new Error("API Error")
    );
    const { container } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    const loader = screen.getByText(/Loading .../i);
    expect(loader).toBeInTheDocument();
    expect(container).toMatchSnapshot();

    await waitFor(() => {
      expect(
        screen.getAllByText(/An error has occured. Please try again later./i)[0]
      ).toBeInTheDocument();
    });
  });
});
