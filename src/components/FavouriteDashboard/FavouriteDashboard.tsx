import { useNavigate } from "react-router";
import Button from "../common/Button/Button";
import "./FavouriteDashboard.css";

function FavouriteDashboard() {
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
        <div className="section-header">Favourites</div>
        <div className="blank"/>
      </div>
      <div className="section-details">H</div>
    </>
  );
}

export default FavouriteDashboard;
