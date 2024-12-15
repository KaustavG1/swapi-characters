import React from "react";
import "./SearchBox.css";

export interface SearchBoxProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBox({searchTerm, setSearchTerm}: SearchBoxProps) {
  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm((event.target as HTMLInputElement).value);
  }

  return (
    <div className="search-container">
      <input
        className="search-bar"
        type="text"
        placeholder="search characters"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBox;

