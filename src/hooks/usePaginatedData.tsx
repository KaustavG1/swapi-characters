import { useEffect, useState } from "react";
import { CharacterDetails } from "../models/CharacterDetails";

function usePaginatedData(
  inputData: CharacterDetails[] | null,
  itemsPerPage: number = 10
) {
  const [data, setData] = useState<CharacterDetails[] | null>(inputData);
  const [page, setPage] = useState(0);
  const [paginatedData, setPaginatedData] = useState<CharacterDetails[] | null>(
    null
  );
  const totalPages = Math.ceil((data ?? []).length / itemsPerPage);

  useEffect(() => console.log(paginatedData, "besttt"), [paginatedData]);

  useEffect(() => {
    const slicedData = (data ?? [])?.slice(
      page * itemsPerPage,
      page * itemsPerPage + itemsPerPage
    );

    setPaginatedData(slicedData);
  }, [page, data]);

  const previous = () => {
    setPage((prevState) => {
      if (prevState > 0) {
        return prevState - 1;
      }

      return prevState;
    });
  };

  const next = () => {
    setPage((prevState) => {
      if (prevState < totalPages) {
        return prevState + 1;
      }

      return prevState;
    });
  };

  return { paginatedData, previous, next, setData, page, totalPages };
}

export default usePaginatedData;
