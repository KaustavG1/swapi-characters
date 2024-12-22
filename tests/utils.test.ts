import axios from "axios";
import { it, expect, vi, afterEach, MockedFunction } from "vitest";
import { mockPlanetsData } from "./__mocks__/mockPlanetsData";
import fetchDataFromUrl from "../src/utils/fetchData";
import { PlanetDetails } from "../src/models/PlanetDetails";
import { baseUri, localStorageKey, planets } from "../src/constants/constants";
import { mockLocalStorage, mockValue } from "./__mocks__/mockLocalStorage";
import { getLocalValue, setLocalValue } from "../src/utils/localStorageHelper";

vi.mock("axios");
(axios.get as MockedFunction<typeof axios>).mockResolvedValue({
  data: mockPlanetsData,
});

afterEach(vi.clearAllMocks);

describe("fetchDataFromUrl function", () => {
  it("tests 'fetchDataFromUrl' success case", async () => {
    const { data, error } = await fetchDataFromUrl<PlanetDetails>(
      `${baseUri}/${planets}/1`
    );
    expect(data).not.toBeNull();
    expect(data).toEqual(mockPlanetsData);
    expect(error).toBeNull();
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it("tests 'fetchDataFromUrl' failure case", async () => {
    (axios.get as MockedFunction<typeof axios>).mockRejectedValue(
      new Error("API Error")
    );

    const { data, error } = await fetchDataFromUrl<PlanetDetails>(
      `${baseUri}/${planets}/1`
    );
    expect(data).toBeNull();
    expect(error).not.toBeNull();
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});

describe("setLocalValue and getLocalValue function", () => {
  it("tests 'setLocalValue' and 'getLocalValue' functions", async () => {
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });

    const success = setLocalValue(localStorageKey, mockValue);
    expect(JSON.stringify(getLocalValue(localStorageKey))).equal(
      JSON.stringify(mockValue)
    );
    expect(success).toBeTruthy();
  });
});
