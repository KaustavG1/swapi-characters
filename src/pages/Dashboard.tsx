import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import ErrorMessage from "../components/common/ErrorMessage/ErrorMessage";
import Loader from "../components/common/Loader/Loader";
import ListContainer from "../components/ListContainer/ListContainer";
import Header from "../components/Header/Header";
import Pagination from "../components/Pagination/Pagination";
import useFetch from "../hooks/useFetch";
import { baseUri, people } from "../constants/constants";
import { PaginationDirection } from "../enums/PaginationDirection";
import { Character } from "../models/Character";
import fetchDataFromUrl from "../utils/fetchData";
import { CharacterDetails } from "../models/CharacterDetails";
import { PlanetDetails } from "../models/PlanetDetails";
import usePaginatedData from "../hooks/usePaginatedData";

function Dashboard() {
  const [isPlanetLoading, setPlanetLoading] = useState(false);
  const [planetError, setPlanetError] = useState<AxiosError | null>(null);
  const [collatedData, setCollatedData] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const uri = `${baseUri}/${people}`;
  const {
    isLoading,
    data: peopleData,
    error,
  } = useFetch<CharacterDetails[]>(uri);
  const { paginatedData, previous, next, setData, page, totalPages } =
    usePaginatedData(peopleData);

  useEffect(() => {
    if (Array.isArray(peopleData)) {
      setData(peopleData?.slice(0, 14));
    }
  }, [peopleData]);

  const handlePagination = (dir: string) => {
    if (dir === PaginationDirection.prev) {
      previous();
    } else {
      next();
    }
  };

  useEffect(() => {
    console.log("here");
    if (Array.isArray(paginatedData) && paginatedData?.length > 0) {
      const fetchPlanetData = async () => {
        const reqdDetails: any = [];
        for (const detail of paginatedData) {
          setPlanetLoading(true);
          const { data, error } = await fetchDataFromUrl<PlanetDetails>(
            detail?.homeworld
          );
          setPlanetLoading(false);
          setPlanetError(error as AxiosError);

          reqdDetails.push({
            name: detail?.name,
            uid: detail?.url,
            url: detail?.url,
            hair_color: detail?.hair_color,
            eye_color: detail?.eye_color,
            gender: detail?.gender,
            homeworld: data?.name,
          });
        }

        setCollatedData(reqdDetails);
      };

      fetchPlanetData();
    }
  }, [paginatedData]);

  const getCollatedData = () => {
    return collatedData?.filter((e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (error || planetError) {
    return <ErrorMessage />;
  }

  return (
    <>
      {isLoading || isPlanetLoading ? (
        <Loader />
      ) : (
        <>
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ListContainer data={getCollatedData()} />
          <Pagination
            disablePrev={page < 1}
            disableNext={page === totalPages - 1}
            onPreviousClick={handlePagination}
            onNextClick={handlePagination}
          />
        </>
      )}
    </>
  );
}

export default Dashboard;
