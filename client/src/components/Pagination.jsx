/* eslint-disable react/prop-types */
import { FcPrevious, FcNext } from "react-icons/fc";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className={`${!totalPages && 'hidden'} flex items-center gap-3 text-gray-500 mt-4`}>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        <FcPrevious />
      </button>
      <span> Page {currentPage} of {totalPages} </span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        <FcNext/>
      </button>
    </div>
  );
};

export default Pagination;
