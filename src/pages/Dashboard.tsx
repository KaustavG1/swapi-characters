import ErrorMessage from "../components/common/ErrorMessage/ErrorMessage";
import Loader from "../components/common/Loader/Loader";
import { baseUri, people } from "../constants/constants"
import useFetch from "../hooks/useFetch"

function Dashboard() {
  const uri = `${baseUri}${people}`;
  const { isLoading, data, error } = useFetch(uri);

  console.log(data)

  if (error) {
    return <ErrorMessage />
  }

  return (
    <>
      {isLoading ?
        <Loader /> :
        <>
          <div>Search</div>
          <div>Dashboard</div>
        </>
      }
    </>
  )
}

export default Dashboard