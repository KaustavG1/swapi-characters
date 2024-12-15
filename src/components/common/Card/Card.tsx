
import { useNavigate } from "react-router";
import { Character } from "../../../models/Character";
import "./Card.css";

export interface CardProps {
  character: Character;
}

function Card({ character }: CardProps) {
  let navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/${character?.uid}`);
  }

  return (
    <div className="character-card" onClick={handleCardClick}>
      {character?.name}
    </div>
  );
}

export default Card;
