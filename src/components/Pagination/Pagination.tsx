import Button from "../common/Button/Button";
import "./Pagination.css";

function Pagination() {
  return (
    <div className="pagination-container">
      <Button text="<" disabled={false} className="pagination-buttons" />
      <Button text=">" disabled={false} className="pagination-buttons" />
    </div>
  );
}

export default Pagination;
