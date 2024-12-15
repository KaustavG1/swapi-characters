import { useNavigate } from "react-router";
import Button from "../common/Button/Button";
import "./CharacterInfo.css";

export interface CharacterInfoProps {
  data: any;
}

function CharacterInfo({ data }: CharacterInfoProps) {
  console.log(data);

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
      <div className="section-details">H</div>
    </>
  );
}

export default CharacterInfo;
