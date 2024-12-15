import { useParams } from "react-router";

function Character() {
  let { id } = useParams();
  console.log(id)

  return (
    <div>Character</div>
  )
}

export default Character
