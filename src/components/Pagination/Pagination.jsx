import { useContext } from "react";
import { ThemeContext } from "../../context/Theme/themeContext";
import PropTypes from "prop-types";

export const Pagination = ({
  paginate,
  currentPage,
  totalCountries,
  countriesPerPage,
}) => {
  const { darkTheme } = useContext(ThemeContext);

  const totalPages = Math.ceil(totalCountries / countriesPerPage);

  const handlePagination = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      paginate(pageNumber);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      aria-label="countries-pages"
      className={`${
        darkTheme
          ? "bg-dark-blue text-white"
          : "bg-white text-very-dark-blue-lm"
      } transform transition duration-300 hover:shadow-xl hover:-translate-y-1 grid justify-center items-center text-center w-[10%] mx-auto my-10`}
    >
      <ul className="flex items-center -space-x-px h-10 text-xs md:text-base ">
        <li>
          <button
            onClick={() => handlePagination(currentPage - 1)}
            className={`flex items-center justify-center px-2 md:px-4 h-10 leading-tight border rounded-s-lg ${
              darkTheme
                ? "bg-dark-blue text-white border-dark-gray hover:text-dark-gray hover:bg-very-dark-blue-lm"
                : "bg-white text-very-dark-blue-lm border-dark-blue hover:text-dark-gray hover:bg-very-dark-blue-lm"
            }`}
            aria-label="Previous page"
            disabled={currentPage === 1}
          >
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              onClick={() => handlePagination(pageNumber)}
              className={`flex items-center justify-center px-1 md:px-4 h-10 leading-tight border ${
                darkTheme
                  ? "bg-dark-blue text-white border-dark-gray hover:text-dark-gray hover:bg-very-dark-blue-lm"
                  : "bg-white text-very-dark-blue-lm border-dark-blue hover:text-dark-gray hover:bg-very-dark-blue-lm"
              } ${currentPage === pageNumber ? "font-bold" : ""}`}
              aria-current={currentPage === pageNumber ? "page" : undefined}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => handlePagination(currentPage + 1)}
            className={`flex items-center justify-center px-2 md:px-4 h-10 leading-tight border rounded-e-lg ${
              darkTheme
                ? "bg-dark-blue text-white border-dark-gray hover:text-dark-gray hover:bg-very-dark-blue-lm"
                : "bg-white text-very-dark-blue-lm border-dark-blue hover:text-dark-gray hover:bg-very-dark-blue-lm"
            }`}
            aria-label="Next page"
            disabled={currentPage === totalPages}
          >
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalCountries: PropTypes.number.isRequired,
  countriesPerPage: PropTypes.number.isRequired,
};
