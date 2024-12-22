import axios from "axios";
import { expect, it, describe, MockedFunction, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import usePaginatedData from "../src/hooks/usePaginatedData";
import { mockPlanetsData } from "./__mocks__/mockPlanetsData";
import { mockPaginationInput } from "./__mocks__/mockPaginationInput";

vi.mock("axios");
(axios.get as MockedFunction<typeof axios>).mockResolvedValue({
  data: mockPlanetsData,
});

describe("usePaginatedData hook", () => {
  it("tests 'usePaginatedData' hook", async () => {
    const itemsPerPage = 10;
    const { result } = renderHook(() =>
      usePaginatedData(mockPaginationInput, itemsPerPage)
    );
    expect(JSON.stringify(result.current.paginatedData)).toEqual(
      JSON.stringify(mockPaginationInput.slice(0, 10))
    );
    expect(result.current.totalPages).toEqual(
      Math.ceil(mockPaginationInput.length / itemsPerPage)
    );
    expect(result.current.page).toEqual(0);

    act(() => {
      result.current.next();
    });

    await waitFor(() => {
      expect(JSON.stringify(result.current.paginatedData)).toEqual(
        JSON.stringify(mockPaginationInput.slice(10, 12))
      );
      expect(result.current.page).toEqual(1);
    });

    act(() => {
      result.current.previous();
    });

    await waitFor(() => {
      expect(JSON.stringify(result.current.paginatedData)).toEqual(
        JSON.stringify(mockPaginationInput.slice(0, 10))
      );
      expect(result.current.page).toEqual(0);
    });
  });
});
