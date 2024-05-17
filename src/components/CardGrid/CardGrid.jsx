import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/Theme/themeContext";
import { useContext } from "react";

export default function CardGrid({ countries, loading, error }) {
  const { darkTheme } = useContext(ThemeContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-gray-200 p-5 rounded-lg shadow-lg">
          <p className="text-lg font-semibold mb-2">Loading...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 p-5 rounded-lg shadow-lg">
          <p className="text-lg font-semibold mb-2">Error:</p>
          <p className="text-red-700">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" grid grid-cols-1 mdcg:grid-cols-2 lgcg:grid-cols-3 xl:grid-cols-4 gap-12 w-[90%] mx-auto">
      {countries.map((country) => {
        return (
          <Link
            key={country.name.common}
            to={`/details/${country.cca3}`}
            className="block"
          >
            <div
              className={`${
                darkTheme
                  ? "bg-dark-blue text-white shadow-dark-shadow-xl border-very-dark-blue-lm "
                  : "bg-white text-very-dark-blue-lm shadow-xl border-dark-gray"
              } max-w-sm rounded-lg shadow transform duration-300 hover:shadow-xl hover:-translate-y-1 transition-shadow h-[420px]`}
            >
              <img
                className="rounded-t-lg transform transition duration-1000 hover:scale-100 h-48 object-cover w-full"
                src={country.flags?.svg || ""}
                alt={country.name.alt || "Country flag"}
              />
              <div className="py-5 transform transition duration-300 hover:-translate-y-1 grid gap-4 mb-4">
                <div className="font-extrabold">
                  <h3 className=" text-center text-lg">
                    {country.name.official}
                  </h3>
                </div>

                <div className="grid gap-2 px-8">
                  <div className="flex gap-3">
                    <p className="font-semibold mr-1">Population:</p>
                    <span className="font-light">
                      {country.population.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <p className="font-semibold mr-1">Region:</p>
                    <span className="font-light">{country.region}</span>
                  </div>
                  {country.capital && (
                    <div className="flex gap-3">
                      <p className="font-semibold mr-1">Capital:</p>
                      <span className="font-light">
                        {country.capital.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

CardGrid.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.shape({
        common: PropTypes.string.isRequired,
      }),
      flags: PropTypes.shape({
        svg: PropTypes.string,
      }),
      population: PropTypes.number,
      region: PropTypes.string,
      capital: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};
