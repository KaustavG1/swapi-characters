import { useNavigate } from "react-router";
import Card from "../common/Card/Card";
import EmptyRecords from "../common/EmptyRecords/EmptyRecords";
import { Character } from "../../models/Character";
import "./ListContainer.css";

export interface ListContainerProps {
  data: Character[];
  className?: string;
}

function ListContainer({ data, className }: ListContainerProps) {
  const navigate = useNavigate();

  const handleCardClick = (url: string) => {
    const splitUrl = url?.split("/");
    const id = splitUrl[splitUrl.length - 1];
    navigate(`/${id}`);
  };

  if (data === null) {
    return <EmptyRecords />;
  }

  return (
    <div className={`list-container ${className}`}>
      {data?.map((character) => (
        <Card
          key={character?.url}
          name={character?.name}
          gender={character?.gender}
          homeworld={character?.homeworld}
          onClick={() => handleCardClick(character?.url)}
        />
      ))}
    </div>
  );
}

export default ListContainer;
