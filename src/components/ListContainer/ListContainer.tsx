import { PeopleData } from "../../models/PeopleData";
import Card from "../common/Card/Card";
import EmptyRecords from "../common/EmptyRecords/EmptyRecords";
import "./ListContainer.css";

export interface ListContainerProps {
  data: PeopleData | null;
}

function ListContainer({ data }: ListContainerProps) {
  if (data === null) {
    return <EmptyRecords />;
  }

  return (
    <div className="list-container">
      {data?.results?.map((character) => <Card key={character.uid} character={character}/>)}
    </div>
  );
}

export default ListContainer;
