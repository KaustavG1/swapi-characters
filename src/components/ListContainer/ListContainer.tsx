import Card from "../common/Card/Card";
import EmptyRecords from "../common/EmptyRecords/EmptyRecords";
import { Character } from "../../models/Character";
import "./ListContainer.css";

export interface ListContainerProps {
  data: Character[];
  className?: string;
}

function ListContainer({ data, className }: ListContainerProps) {
  if (data === null) {
    return <EmptyRecords />;
  }

  return (
    <div className={`list-container ${className}`}>
      {data?.map((character) => (
        <Card key={character.uid} character={character} />
      ))}
    </div>
  );
}

export default ListContainer;
