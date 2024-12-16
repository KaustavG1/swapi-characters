import { useState } from "react";
import ErrorMessage from "../components/common/ErrorMessage/ErrorMessage";
import Loader from "../components/common/Loader/Loader";
import ListContainer from "../components/ListContainer/ListContainer";
import Header from "../components/Header/Header";
import Pagination from "../components/Pagination/Pagination";
import useFetch from "../hooks/useFetch";
import { baseUri, people } from "../constants/constants";
import { PaginationDirection } from "../enums/PaginationDirection";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const uri = `${baseUri}/${people}`;
  const { isLoading, data, error } = useFetch(uri);

  const handlePagination = (dir: string) => {
    if (dir === PaginationDirection.prev) {
      console.log(dir + " prevvv");
    } else {
      console.log(dir + " nexttt");
    }
  };

  if (error) {
    return <ErrorMessage />;
  }

  // TODO: After a page data is fetched, fetch all data of results
  // Optional: Caching in session storage

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ListContainer data={data?.results} />
          <Pagination
            previous={data?.previous}
            next={data?.next}
            onPreviousClick={handlePagination}
            onNextClick={handlePagination}
          />
        </>
      )}
    </>
  );
}

export default Dashboard;
