import { Link, useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../../context/Theme/themeContext";
import { useContext, useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios";

export default function Details() {
  const { darkTheme } = useContext(ThemeContext);

  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const API_URL_COUNTRY_CODE = `${
    import.meta.env.VITE_REACT_REST_COUNTRIES_URL_CODE
  }/${countryCode}`;

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(API_URL_COUNTRY_CODE);
        const countryData = response.data[0];
        setCountry(countryData);

        if (countryData.borders) {
          const borderResponses = await Promise.all(
            countryData.borders.map((borderCode) => {
              const API_URL_BORDER_CODE = `${
                import.meta.env.VITE_REACT_REST_COUNTRIES_URL_CODE
              }/${borderCode}`;
              return axios.get(API_URL_BORDER_CODE);
            })
          );
          const borderDetails = borderResponses.map((res) => res.data[0]);
          setBorderCountries(borderDetails);
        }
      } catch (error) {
        console.error("Failed to fetch country data:", error);
        setError("Failed to fetch country data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryCode, API_URL_COUNTRY_CODE]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-gray-200 p-5 rounded-lg shadow-lg">
          <p className="text-lg font-semibold mb-2">Loading...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 p-5 rounded-lg shadow-lg">
          <p className="text-lg font-semibold mb-2">Error:</p>
          <p className="text-red-700">{error.message}</p>
        </div>
      </div>
    );

  const handleBorderClick = (borderCode) => {
    navigate(`/details/${borderCode}`);
  };

  return (
    <div className="mt-14 mb-28 w-[90%] mx-auto">
      <div className="grid grid-cols-1 gap-4 md:mb-16">
        <Link to="/">
          <div className="transition duration-1000">
            <button
              type="button"
              className={`${
                darkTheme
                  ? "text-white bg-dark-blue hover:text-dark-gray hover:bg-very-dark-blue-lm shadow-dark-shadow-xl"
                  : "text-very-dark-blue-dm bg-white hover:text-dark-gray hover:bg-very-dark-blue-lm shadow-xl"
              } inline-flex items-center justify-center px-8 py-3 font-semibold rounded-md text-sm transition duration-300`}
            >
              <span className="mr-2">
                <IoIosArrowRoundBack
                  className={`${darkTheme ? "text-white" : "text-dark-gray"}  `}
                />
              </span>
              Back
            </button>
          </div>
        </Link>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-10 md:justify-center md:items-center">
        <div className="mt-16 mb-10 md:mt-0 md:mb-0 w-full">
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="rounded-lg w-full"
          />
        </div>

        <div
          className={`${darkTheme ? "text-white" : "text-very-dark-blue-dm"}`}
        >
          <div className="mb-4 font-extrabold text-xl">
            <h1>{country.name.common}</h1>
          </div>

          <div className="md:grid md:grid-cols-2 md:gap-3 mb-12">
            <div className="mb-10 flex flex-col gap-2">
              <div className="flex text-sm">
                <p className="font-semibold mr-1">Native Name:</p>
                <span className="">
                  {Object.values(country.name.nativeName)[0].common}
                </span>
              </div>
              <div className="flex text-sm">
                <p className="font-semibold mr-1">Population:</p>
                <span className="">{country.population.toLocaleString()}</span>
              </div>
              <div className="flex text-sm">
                <p className="font-semibold mr-1">Region:</p>
                <span className="">{country.region}</span>
              </div>
              <div className="flex text-sm">
                <p className="font-semibold mr-1">Sub Region:</p>
                <span className="">{country.subregion}</span>
              </div>
              <div className="flex text-sm">
                <p className="font-semibold mr-1">Capital:</p>
                <span className="">{country.capital[0]}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex text-sm">
                <p className="font-semibold mr-1">Top Level Domain:</p>
                <span className="">{country.tld.join(", ")}</span>
              </div>
              <div className="flex text-sm">
                <p className="font-semibold mr-1">Currencies:</p>
                <span className="">
                  {Object.values(country.currencies)[0].symbol}{" "}
                  {Object.values(country.currencies)[0].name}
                </span>
              </div>
              <div className="flex text-sm">
                <p className="font-semibold mr-1">Languages:</p>
                <span className="">
                  {Object.values(country.languages).join(", ")}
                </span>
              </div>
              <div className="flex text-sm">
                <p className="font-semibold mr-1">Continents:</p>
                <span className="">{country.continents.join(", ")}</span>
              </div>
              <div className="flex text-sm">
                <p className="font-semibold mr-1">Timezones:</p>
                <span className="">{country.timezones.join(", ")}</span>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="md:flex md:gap-3 md:items-center">
              <div className="text-base font-semibold">
                <h3>Border Countries:</h3>
              </div>

              <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                {borderCountries.length > 0 ? (
                  borderCountries.map((borderCountry) => (
                    <button
                      key={borderCountry.cca3}
                      type="button"
                      onClick={() => handleBorderClick(borderCountry.cca3)}
                      className={`${
                        darkTheme
                          ? "text-white bg-dark-blue hover:text-dark-gray hover:bg-very-dark-blue-lm shadow-dark-shadow-xl"
                          : "text-very-dark-blue-dm bg-white hover:text-dark-gray hover:bg-very-dark-blue-lm shadow-xl"
                      } inline-flex items-center justify-center px-7 py-2 font-light rounded-md text-sm`}
                    >
                      <img
                        src={borderCountry.flags.svg}
                        alt={borderCountry.name.common}
                        className="w-6 h-4 mr-2"
                      />
                      {borderCountry.name.common}
                    </button>
                  ))
                ) : (
                  <span>No border countries</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
