import axios from "axios";
import { it, expect, vi, MockedFunction } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { mockCharacterData } from "./__mocks__/mockCharacterData";
import FavouriteDashboard from "../src/components/FavouriteDashboard/FavouriteDashboard";
import { mockLocalStorage } from "./__mocks__/mockLocalStorage";
import { localStorageKey } from "../src/constants/constants";
import { mockFavList } from "./__mocks__/mockFavList";

vi.mock("axios");
(axios.get as MockedFunction<typeof axios>).mockResolvedValue({
  data: mockCharacterData,
});

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

afterEach(vi.clearAllMocks);

describe("FavouriteDashboard component", () => {
  it("renders 'FavouriteDashboard' component empty state", async () => {
    const { container } = render(
      <BrowserRouter>
        <FavouriteDashboard />
      </BrowserRouter>
    );
    const favourites = screen.getByText(/Favourites/i);
    const noRecordsMessage = screen.getByText(/No Records found./i);

    expect(favourites).toBeInTheDocument();
    expect(noRecordsMessage).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renders 'FavouriteDashboard' component with record", async () => {
    mockLocalStorage.setItem(localStorageKey, JSON.stringify(mockFavList));
    render(
      <BrowserRouter>
        <FavouriteDashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText(/Luke Skywalker/i)[0]).toBeInTheDocument();
    });
  });
});
