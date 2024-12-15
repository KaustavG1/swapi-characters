import Button from "../common/Button/Button";
import "./Pagination.css";

function Pagination() {
  return (
    <div className="pagination-container">
      <Button text="<" disabled={false} />
      <Button text=">" disabled={false} />
    </div>
  );
}

export default Pagination;
