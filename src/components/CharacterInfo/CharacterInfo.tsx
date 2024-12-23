import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../common/Button/Button";
import Loader from "../common/Loader/Loader";
import useFetch from "../../hooks/useFetch";
import useFetchAll from "../../hooks/useFetchAll";
import { getLocalValue, setLocalValue } from "../../utils/localStorageHelper";
import { localStorageKey } from "../../constants/constants";
import { CharacterDetails } from "../../models/CharacterDetails";
import { FilmDetails } from "../../models/FilmDetails";
import { PlanetDetails } from "../../models/PlanetDetails";
import { StarshipDetails } from "../../models/StarshipDetails";
import "./CharacterInfo.css";

export interface CharacterInfoProps {
  data: CharacterDetails | null;
}

function CharacterInfo({ data }: CharacterInfoProps) {
  const [isCurrentFav, setCurrentFav] = useState(false);
  const planetUri = data?.homeworld ?? "";
  const filmUris = data?.films ?? [];
  const starshipUris = data?.starships ?? [];
  const { isLoading, data: planetData } = useFetch<PlanetDetails | null>(
    planetUri
  );

  const { isLoading: filmsLoading, data: filmsData } =
    useFetchAll<FilmDetails[]>(filmUris);
  const { isLoading: starshipsLoading, data: starshipsData } =
    useFetchAll<StarshipDetails[]>(starshipUris);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const favs: CharacterDetails[] = getLocalValue(localStorageKey);
    if (Array.isArray(favs)) {
      const isFav = favs?.find((el) => el?.url === data?.url) !== undefined;

      setCurrentFav(isFav);
    }
  }, []);

  const handleFavClick = () => {
    const favs: CharacterDetails[] = getLocalValue(localStorageKey);
    if (Array.isArray(favs)) {
      const isFav = favs?.find((el) => el?.url === data?.url) !== undefined;

      let valueSetSuccess = false;

      if (isFav) {
        const newFav = favs?.filter((el) => el?.url !== data?.url);
        valueSetSuccess = setLocalValue(localStorageKey, newFav);
      } else {
        favs.push({
          url: data?.url ?? "",
          name: data?.name ?? "",
          hair_color: data?.hair_color ?? "",
          eye_color: data?.eye_color ?? "",
          gender: data?.gender ?? "",
          homeworld: planetData?.name ?? "",
          films: [""],
          starships: [""],
        });
        valueSetSuccess = setLocalValue(localStorageKey, favs);
      }

      if (valueSetSuccess) {
        setCurrentFav(!isFav);
      }
    }
  };

  const getFilms = (filmsData: FilmDetails[] | null) => {
    let films = (filmsData ?? [])?.map((film) => film?.title)?.join(",");
    if (films === "") {
      films = "n/a";
    }

    return films;
  };

  const getStarships = (starshipsData: StarshipDetails[] | null) => {
    let starships = (starshipsData ?? [])
      ?.map((starship) => starship?.name)
      ?.join(",");
    if (starships === "") {
      starships = "n/a";
    }

    return starships;
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
          className="pagination-buttons make-fav"
          onClick={handleFavClick}
        />
      </div>
      {isLoading || filmsLoading || starshipsLoading ? (
        <Loader />
      ) : (
        <div className="section-details">
          <div className="name">{data?.name}</div>
          <div className="details">Hair Color: {data?.hair_color}</div>
          <div className="details">Eye Color: {data?.eye_color}</div>
          <div className="details">Gender: {data?.gender}</div>
          <div className="details">Home Planet: {planetData?.name}</div>
          <div className="details">Favourite: {String(isCurrentFav)}</div>
          <div className="details">Films: {getFilms(filmsData)}</div>
          <div className="details">
            Starships: {getStarships(starshipsData)}
          </div>
        </div>
      )}
    </>
  );
}

export default CharacterInfo;
