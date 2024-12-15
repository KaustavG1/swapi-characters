import ErrorMessage from "../components/common/ErrorMessage/ErrorMessage";
import Loader from "../components/common/Loader/Loader";
import ListContainer from "../components/ListContainer/ListContainer";
import SearchBox from "../components/SearchBox/SearchBox";
import { baseUri, people } from "../constants/constants";
import useFetch from "../hooks/useFetch";

function Dashboard() {
  const uri = `${baseUri}${people}`;
  const { isLoading, data, error } = useFetch(uri);

  console.log(data); // Remove console log

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <>
      {isLoading ?
        <Loader /> :
        <>
          <SearchBox />
          <ListContainer data={data} />
        </>
      }
    </>
  );
}

export default Dashboard;
