import { Character } from "../../../models/Character";
import "./Card.css";

export interface CardProps {
  character: Character;
}

function Card({ character }: CardProps) {
  return (
    <div>{character?.name}</div>
  );
}

export default Card;
