import axios from "axios";
import { expect, it, describe, MockedFunction, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useFetch from "../src/hooks/useFetch";
import { baseUri, planets } from "../src/constants/constants";
import { mockPlanetsData } from "./__mocks__/mockPlanetsData";
import { PlanetDetails } from "../src/models/PlanetDetails";

vi.mock("axios");
(axios.get as MockedFunction<typeof axios>).mockResolvedValue({
  data: mockPlanetsData,
});

afterEach(vi.clearAllMocks);

describe("useFetch hook", () => {
  it("tests 'useFetch' success case", async () => {
    const { result } = renderHook(() =>
      useFetch<PlanetDetails | null>(`${baseUri}/${planets}/1`)
    );

    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.data).toEqual(mockPlanetsData);
      expect(result.current.data).not.toBeNull();
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.error).toBeNull();
    });
  });

  it("tests 'useFetch' failure case", async () => {
    (axios.get as MockedFunction<typeof axios>).mockRejectedValue(
      new Error("API Error")
    );

    const { result } = renderHook(() =>
      useFetch<PlanetDetails | null>(`${baseUri}/${planets}/1`)
    );

    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.data).toBeNull();
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.error).not.toBeNull();
    });
  });
});
