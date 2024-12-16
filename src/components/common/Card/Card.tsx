import "./Card.css";

export interface CardProps {
  name: string;
  gender: string;
  homeworld: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

function Card({ name, gender, homeworld, onClick }: CardProps) {
  return (
    <div className="character-card" onClick={onClick}>
      <div className="card-name">{name}</div>
      <div className="card-details">Gender: {gender}</div>
      <div className="card-details">Home Planet: {homeworld}</div>
    </div>
  );
}

export default Card;
