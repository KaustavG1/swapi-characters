import axios from "axios";
import { expect, it, describe, MockedFunction, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useFetchAll from "../src/hooks/useFetchAll";
import { baseUri, planets } from "../src/constants/constants";
import { mockPlanetsData } from "./__mocks__/mockPlanetsData";
import { PlanetDetails } from "../src/models/PlanetDetails";

vi.mock("axios");
(axios.get as MockedFunction<typeof axios>).mockResolvedValue({
  data: [mockPlanetsData],
});

afterEach(vi.clearAllMocks);

describe("useFetchAll hook", () => {
  it("tests 'useFetchAll' success case", async () => {
    const { result } = renderHook(() =>
      useFetchAll<PlanetDetails[] | null>([`${baseUri}/${planets}/1`])
    );

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(JSON.stringify(result.current.data)).toEqual(
        JSON.stringify([[mockPlanetsData]])
      );
      expect(result.current.data).not.toBeNull();
      expect(result.current.error).toBeNull();
    });
  });

  it("tests 'useFetchAll' failure case", async () => {
    (axios.get as MockedFunction<typeof axios>).mockRejectedValue(
      new Error("API Error")
    );

    const { result } = renderHook(() =>
      useFetchAll<PlanetDetails[] | null>([`${baseUri}/${planets}/1`])
    );

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.data).toBeNull();
      expect(result.current.error).not.toBeNull();
    });
  });
});
