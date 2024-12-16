import { useEffect, useState } from "react";
import ErrorMessage from "../components/common/ErrorMessage/ErrorMessage";
import Loader from "../components/common/Loader/Loader";
import ListContainer from "../components/ListContainer/ListContainer";
import Header from "../components/Header/Header";
import Pagination from "../components/Pagination/Pagination";
import useFetch from "../hooks/useFetch";
import { baseUri, people } from "../constants/constants";
import { PaginationDirection } from "../enums/PaginationDirection";
import { Character } from "../models/Character";
import useFetchAll from "../hooks/useFetchAll";
import fetchDataFromUrl from "../utils/fetchData";
import { AxiosError } from "axios";

function Dashboard() {
  const [isPlanetLoading, setPlanetLoading] = useState(false);
  const [planetError, setPlanetError] = useState<AxiosError | null>(null);
  const [collatedData, setCollatedData] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [urlList, setUrlList] = useState<string[]>([]);
  const uri = `${baseUri}/${people}`;
  const { isLoading, data: peopleData, error, fetchData } = useFetch(uri);
  const {
    isLoading: isDetailsLoading,
    data: detailsData,
    error: isDetailsError,
  } = useFetchAll(urlList);

  const handlePagination = (dir: string) => {
    if (dir === PaginationDirection.prev) {
      fetchData(peopleData?.previous);
    } else {
      fetchData(peopleData?.next);
    }
  };

  useEffect(() => {
    if (Array.isArray(peopleData?.results) && peopleData?.results?.length > 0) {
      const detailUrlList = peopleData?.results?.map(
        (el: Character) => el?.url
      );
      setUrlList(detailUrlList);
    }
  }, [peopleData]);

  useEffect(() => {
    if (Array.isArray(detailsData) && detailsData?.length > 0) {
      const fetchPlanetData = async () => {
        const reqdDetails: any = [];
        for (const detail of detailsData) {
          setPlanetLoading(true);
          const { data, error } = await fetchDataFromUrl(
            detail?.result?.properties?.homeworld
          );
          setPlanetLoading(false);
          setPlanetError(error as AxiosError);

          reqdDetails.push({
            name: detail?.result?.properties?.name,
            uid: detail?.result.uid,
            url: detail?.result?.properties?.url,
            hair_color: detail?.result?.properties?.hair_color,
            eye_color: detail?.result?.properties?.eye_color,
            gender: detail?.result?.properties?.gender,
            homeworld: data?.result?.properties?.name,
          });
        }

        setCollatedData(reqdDetails);
      };

      fetchPlanetData();
    }
  }, [detailsData]);

  const getCollatedData = () => {
    return collatedData?.filter((e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (error || isDetailsError || planetError) {
    return <ErrorMessage />;
  }

  return (
    <>
      {isLoading || isDetailsLoading || isPlanetLoading ? (
        <Loader />
      ) : (
        <>
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ListContainer data={getCollatedData()} />
          <Pagination
            previous={peopleData?.previous}
            next={peopleData?.next}
            onPreviousClick={handlePagination}
            onNextClick={handlePagination}
          />
        </>
      )}
    </>
  );
}

export default Dashboard;
