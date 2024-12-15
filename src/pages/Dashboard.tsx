import { useState } from "react";
import ErrorMessage from "../components/common/ErrorMessage/ErrorMessage";
import Loader from "../components/common/Loader/Loader";
import ListContainer from "../components/ListContainer/ListContainer";
import { baseUri, people } from "../constants/constants";
import useFetch from "../hooks/useFetch";
import Header from "../components/Header/Header";
import Pagination from "../components/Pagination/Pagination";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const uri = `${baseUri}${people}`;
  const { isLoading, data, error } = useFetch(uri);

  console.log(data, searchTerm); // Remove console log

  if (error) {
    return <ErrorMessage />;
  }

  // TODO: After a page data is fetched, fetch all data of results
  // Optional: Caching in session storage

  return (
    <>
      {isLoading ?
        <Loader /> :
        <>
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ListContainer data={data} />
          <Pagination />
        </>
      }
    </>
  );
}

export default Dashboard;
