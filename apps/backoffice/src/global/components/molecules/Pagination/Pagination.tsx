import { ArrowLeft, ArrowRight } from "lucide-react";

import { css } from "../../../../../styled-system/css";
import Button from "../../atoms/Button/Button";

type PaginationProps = {
  setPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
};

function Pagination({ currentPage, totalPages, setPage }: PaginationProps) {
  const maxValue = currentPage + 2 <= totalPages ? currentPage + 2 : totalPages;
  const minValue = maxValue - 5 > 0 ? maxValue - 4 : 1;
  const pages: number[] = Array.from(
    {
      length: totalPages >= 5 ? 5 : totalPages,
    },
    (_, index) => {
      return minValue + index;
    },
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };
  return (
    <div
      className={css({ display: "flex", flexFlow: "row nowrap", gap: "16px" })}
    >
      {currentPage !== 1 && (
        <Button onClick={previousPage}>
          <ArrowLeft />
        </Button>
      )}
      {pages.map((page) => (
        <Button
          borders="circle"
          active={page === currentPage}
          key={page}
          onClick={() => setPage(page)}
        >
          {page}
        </Button>
      ))}
      {currentPage !== totalPages && (
        <Button onClick={nextPage}>
          <ArrowRight />
        </Button>
      )}
    </div>
  );
}

export default Pagination;
