import { useNavigate } from "react-router";
import { Character } from "../../../models/Character";
import "./Card.css";

export interface CardProps {
  character: Character;
}

function Card({ character }: CardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/${character?.uid}`);
  };

  return (
    <div className="character-card" onClick={handleCardClick}>
      <div className="card-name">{character?.name}</div>
      <div className="card-details">Gender: {character?.gender}</div>
      <div className="card-details">Home Planet: {character?.homeworld}</div>
    </div>
  );
}

export default Card;
