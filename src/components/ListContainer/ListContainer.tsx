import { PeopleData } from "../../models/PeopleData";
import Card from "../common/Card/Card";
import EmptyRecords from "../common/EmptyRecords/EmptyRecords";
import "./ListContainer.css";

export interface ListContainerProps {
  data: PeopleData | null;
}

function ListContainer({ data }: ListContainerProps) {
  if (data === null) {
    return <EmptyRecords />
  }

  return (
    <>
      {data?.results?.map((character: any) => <Card character={character}/>)}
    </>
  );
}

export default ListContainer;
