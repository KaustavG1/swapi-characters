import { useNavigate } from "react-router";
import Button from "../common/Button/Button";
import EmptyRecords from "../common/EmptyRecords/EmptyRecords";
import ListContainer from "../ListContainer/ListContainer";
import { useEffect, useState } from "react";
import { localStorageKey } from "../../constants/constants";
import { getLocalValue } from "../../utils/localStorageHelper";
import "./FavouriteDashboard.css";

function FavouriteDashboard() {
  const [currentFavList, setCurrentFavList] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(`/`);
  };

  useEffect(() => {
    const favs = getLocalValue(localStorageKey);
    setCurrentFavList(favs);
  }, []);

  return (
    <>
      <div className="top-nav">
        <Button
          text="Go Back"
          className="pagination-buttons back-button"
          onClick={handleBackClick}
        />
        <div className="section-header">Favourites</div>
        <div className="blank" />
      </div>
      {Array.isArray(currentFavList) && currentFavList?.length > 0 ? (
        <ListContainer data={currentFavList} className="fav-list" />
      ) : (
        <EmptyRecords />
      )}
    </>
  );
}

export default FavouriteDashboard;
