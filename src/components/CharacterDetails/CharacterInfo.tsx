import { useNavigate } from "react-router";
import Button from "../common/Button/Button";
import { DetailsData } from "../../models/DetailsData";
import Loader from "../common/Loader/Loader";
import useFetch from "../../hooks/useFetch";
import "./CharacterInfo.css";

export interface CharacterInfoProps {
  data: DetailsData;
}

function CharacterInfo({ data }: CharacterInfoProps) {
  const planetUri = data?.result?.properties?.homeworld;
  const { isLoading, data: planetData, error } = useFetch(planetUri);
  console.log(data, planetData, error);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(`/`);
  };

  return (
    <>
      <div className="top-nav">
        <Button
          text="Go Back"
          className="pagination-buttons back-button"
          onClick={handleBackClick}
        />
        <div className="section-header">Character Details</div>
        <Button
          icon="💔"
          text=""
          className="pagination-buttons"
          onClick={() => console.log('update preference')}
        />
      </div>
      {isLoading ?
        <Loader /> :
        <div className="section-details">
          <div className="name">
            {data?.result?.properties?.name}
          </div>
          <div className="details">
            Hair Color: {data?.result?.properties?.hair_color}
          </div>
          <div className="details">
            Eye Color: {data?.result?.properties?.eye_color}
          </div>
          <div className="details">
            Gender: {data?.result?.properties?.gender}
          </div>
          <div className="details">
            Home Planet: {planetData?.result?.properties?.name}
          </div>
          <div className="details">
            Favourite: {String(true)}
          </div>
        </div>
      }
    </>
  );
}

export default CharacterInfo;
