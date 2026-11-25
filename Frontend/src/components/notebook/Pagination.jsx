
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  totalPages,
  currentPage,
  setQueryParams
}) => {
  const [pageInput, setPageInput] = useState(String(currentPage));

  // Synchronize input whenever the actual page changes
  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);

  const handlePageChange = () => {
    const page = Number(pageInput);

    if (
      pageInput === "" ||
      !Number.isInteger(page) ||
      page < 1 ||
      page > totalPages
    ) {
      setPageInput(String(currentPage));
      return;
    }

    setQueryParams(prev => ({
      ...prev,
      page
    }));
  };

  const handlePrevious = () => {
    setQueryParams(prev => ({
      ...prev,
      page: Math.max(1, prev.page - 1)
    }));
  };

  const handleNext = () => {
    setQueryParams(prev => ({
      ...prev,
      page: Math.min(totalPages, prev.page + 1)
    }));
  };

  return (
    <div className="h-10 w-full flex justify-center gap-10">
      <button
        disabled={currentPage <= 1}
        onClick={handlePrevious}
        className="flex items-center justify-center w-25 border rounded-full p-2"
      >
        <ChevronLeft />
        Previous
      </button>

      <div>
        Page
        <input
          type="text"
          inputMode="numeric"
          value={pageInput}
          className="h-full px-3 border rounded-full w-20 mx-1"
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setPageInput(value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePageChange();
            }
          }}
        />
        of {totalPages}
      </div>

      <button
        disabled={currentPage >= totalPages}
        onClick={handleNext}
        className="flex items-center justify-center w-25 border rounded-full p-2"
      >
        Next
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
