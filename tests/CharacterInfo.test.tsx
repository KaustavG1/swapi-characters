import axios from "axios";
import { it, expect, vi, MockedFunction } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { mockCharacterData } from "./__mocks__/mockCharacterData";
import CharacterInfo from "../src/components/CharacterInfo/CharacterInfo";
import { mockLocalStorage } from "./__mocks__/mockLocalStorage";
import { localStorageKey } from "../src/constants/constants";

vi.mock("axios");
(axios.get as MockedFunction<typeof axios>).mockResolvedValue({
  data: mockCharacterData,
});

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

afterEach(vi.clearAllMocks);

describe("CharacterInfo component", () => {
  it("renders 'CharacterInfo' component and adds favourite", async () => {
    const { container } = render(
      <BrowserRouter>
        <CharacterInfo data={mockCharacterData} />
      </BrowserRouter>
    );
    const loader = screen.getByText(/Loading .../i);
    expect(loader).toBeInTheDocument();
    expect(container).toMatchSnapshot();

    await waitFor(() => {
      expect(screen.getAllByText(/Luke Skywalker/i)[0]).toBeInTheDocument();
      const favButton = screen.getByText(/♥️/);
      expect(favButton).toBeInTheDocument();
      fireEvent.click(favButton);
      expect(screen.getByText(/💔/)).toBeInTheDocument();
      expect(screen.getByText(/Favourite: true/)).toBeInTheDocument();
      const storedItem = JSON.parse(mockLocalStorage.getItem(localStorageKey));
      expect(storedItem.length).toBe(1);
      expect(storedItem[0].name).toBe("Luke Skywalker");
    });
  });
});
