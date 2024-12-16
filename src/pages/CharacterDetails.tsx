import { useParams } from "react-router";
import CharacterInfo from "../components/CharacterDetails/CharacterInfo";
import ErrorMessage from "../components/common/ErrorMessage/ErrorMessage";
import Loader from "../components/common/Loader/Loader";
import useFetch from "../hooks/useFetch";
import { baseUri, people } from "../constants/constants";

function CharacterDetails() {
  const { id } = useParams();
  const uri = `${baseUri}/${people}/${id}`;
  const { isLoading, data, error } = useFetch(uri);

  if (error) {
    return <ErrorMessage />;
  }

  return <>{isLoading ? <Loader /> : <CharacterInfo data={data} />}</>;
}

export default CharacterDetails;
