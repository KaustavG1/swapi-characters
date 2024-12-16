import Button from "../common/Button/Button";
import { PaginationDirection } from "../../enums/PaginationDirection";
import "./Pagination.css";

export interface PaginationProps {
  previous: string | null | undefined;
  next: string | null | undefined;
  onPreviousClick: (dir: string) => void;
  onNextClick: (dir: string) => void;
}

function Pagination({
  previous,
  next,
  onPreviousClick,
  onNextClick,
}: PaginationProps) {
  const disablePrev = previous === null;
  const disableNext = next === null;

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
