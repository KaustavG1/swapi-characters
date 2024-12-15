import { useNavigate } from "react-router";
import Button from "../common/Button/Button";
import { DetailsData } from "../../models/DetailsData";
import Loader from "../common/Loader/Loader";
import useFetch from "../../hooks/useFetch";
import "./CharacterInfo.css";
import { getLocalValue, setLocalValue } from "../../utils/localStorageHelper";
import { localStorageKey } from "../../constants/constants";
import { useEffect, useState } from "react";
export interface CharacterInfoProps {
  data: DetailsData;
}

function CharacterInfo({ data }: CharacterInfoProps) {
  const [isCurrentFav, setCurrentFav] = useState(false);
  const planetUri = data?.result?.properties?.homeworld;
  const { isLoading, data: planetData } = useFetch(planetUri);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(`/`);
  };

  useEffect(() => {
    const favs = getLocalValue(localStorageKey);
    if (Array.isArray(favs)) {
      const isFav =
        favs?.find((el: any) => el?.uid === data?.result?.uid) !== undefined;

      setCurrentFav(isFav);
    }
  }, []);

  const handleFavClick = () => {
    const favs = getLocalValue(localStorageKey);
    if (Array.isArray(favs)) {
      const isFav =
        favs?.find((el: any) => el?.uid === data?.result?.uid) !== undefined;

      setCurrentFav(!isFav);

      if (isFav) {
        const newFav = favs?.filter((el: any) => el?.uid !== data?.result?.uid);
        setLocalValue(localStorageKey, JSON.stringify(newFav));
      } else {
        favs.push({
          uid: data?.result?.uid,
          name: data?.result?.properties?.name,
          hair_color: data?.result?.properties?.hair_color,
          eye_color: data?.result?.properties?.eye_color,
          gender: data?.result?.properties?.gender,
          homeworld: planetData?.result?.properties?.name,
        });
        setLocalValue(localStorageKey, JSON.stringify(favs));
      }
    }
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
          icon={isCurrentFav ? "💔" : "♥️"}
          text=""
          className="pagination-buttons"
          onClick={handleFavClick}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="section-details">
          <div className="name">{data?.result?.properties?.name}</div>
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
          <div className="details">Favourite: {String(isCurrentFav)}</div>
        </div>
      )}
    </>
  );
}

export default CharacterInfo;
