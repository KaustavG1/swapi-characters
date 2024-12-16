import Button from "../common/Button/Button";
import { PaginationDirection } from "../../enums/PaginationDirection";
import "./Pagination.css";

export interface PaginationProps {
  disablePrev: boolean;
  disableNext: boolean;
  onPreviousClick: (dir: string) => void;
  onNextClick: (dir: string) => void;
}

function Pagination({
  disablePrev,
  disableNext,
  onPreviousClick,
  onNextClick,
}: PaginationProps) {
  return (
    <div className="pagination-container">
      <Button
        text="<"
        disabled={disablePrev}
        className={`pagination-buttons ${
          disablePrev && "pagination-button-disabled"
        }`}
        onClick={() => onPreviousClick(PaginationDirection.prev)}
      />
      <Button
        text=">"
        disabled={disableNext}
        className={`pagination-buttons ${
          disableNext && "pagination-button-disabled"
        }`}
        onClick={() => onNextClick(PaginationDirection.next)}
      />
    </div>
  );
}

export default Pagination;
