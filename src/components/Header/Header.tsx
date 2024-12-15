import { useNavigate } from "react-router";
import Button from "../common/Button/Button";
import SearchBox, { SearchBoxProps } from "../SearchBox/SearchBox";
import "./Header.css";

function Header({searchTerm, setSearchTerm}: SearchBoxProps) {
  const navigate = useNavigate();

  const handleFavClick = () => {
    navigate("/favourites");
  };

  return (
    <div className="header">
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Button icon="♥️" text="" className="fav-button" onClick={handleFavClick} />
    </div>
  );
}

export default Header;
