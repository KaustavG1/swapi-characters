import { useParams } from "react-router";

function CharacterDetails() {
  let { id } = useParams();
  console.log(id);

  return (
    <div>Character</div>
  );
}

export default CharacterDetails;
