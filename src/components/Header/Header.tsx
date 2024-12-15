import Button from "../common/Button/Button";
import SearchBox, { SearchBoxProps } from "../SearchBox/SearchBox";
import "./Header.css";

function Header({searchTerm, setSearchTerm}: SearchBoxProps) {
  return (
    <div className="header">
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Button icon="♥️" text="" className="fav-button"/>
    </div>
  );
}

export default Header;
