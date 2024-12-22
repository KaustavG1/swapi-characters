import axios from "axios";
import { it, expect, vi, MockedFunction } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import CharacterView from "../src/pages/CharacterView";
import { BrowserRouter } from "react-router";
import { mockCharacterData } from "./__mocks__/mockCharacterData";

vi.mock("axios");
(axios.get as MockedFunction<typeof axios>).mockResolvedValue({
  data: mockCharacterData,
});

afterEach(vi.clearAllMocks);

describe("CharacterView component", () => {
  it("renders 'CharacterView' component success case", async () => {
    const { container } = render(
      <BrowserRouter>
        <CharacterView />
      </BrowserRouter>
    );
    const loader = screen.getByText(/Loading .../i);
    expect(loader).toBeInTheDocument();
    expect(container).toMatchSnapshot();

    await waitFor(() => {
      expect(screen.getAllByText(/Luke Skywalker/i)[0]).toBeInTheDocument();
    });
  });

  it("renders 'CharacterView' component failure case", async () => {
    (axios.get as MockedFunction<typeof axios>).mockRejectedValue(
      new Error("API Error")
    );
    const { container } = render(
      <BrowserRouter>
        <CharacterView />
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
