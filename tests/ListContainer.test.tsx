import axios from "axios";
import { it, expect, vi, MockedFunction } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { mockPaginationInput } from "./__mocks__/mockPaginationInput";
import ListContainer from "../src/components/ListContainer/ListContainer";
import { Character } from "../src/models/Character";

vi.mock("axios");
(axios.get as MockedFunction<typeof axios>).mockResolvedValue({
  data: mockPaginationInput,
});

afterEach(vi.clearAllMocks);

describe("ListContainer component", () => {
  it("renders 'ListContainer' component success case", async () => {
    const data = mockPaginationInput.map(
      (character: any): Character => ({
        name: character?.name,
        uid: character?.url,
        url: character?.url,
        hair_color: character?.hair_color,
        eye_color: character?.eye_color,
        gender: character?.gender,
        homeworld: "Test Planet",
      })
    );
    const { container } = render(
      <BrowserRouter>
        <ListContainer data={data} />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();

    await waitFor(() => {
      expect(screen.getAllByText(/Luke Skywalker/i)[0]).toBeInTheDocument();
    });
  });

  it("renders 'ListContainer' component failure case", async () => {
    (axios.get as MockedFunction<typeof axios>).mockRejectedValue(
      new Error("API Error")
    );
    const { container } = render(
      <BrowserRouter>
        <ListContainer data={[]} />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();

    await waitFor(() => {
      expect(screen.getAllByText(/No Records found./i)[0]).toBeInTheDocument();
    });
  });
});
