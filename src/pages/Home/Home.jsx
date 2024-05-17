import { useContext, useEffect, useMemo, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { ThemeContext } from "../../context/Theme/themeContext";
import CardGrid from "../../components/CardGrid/CardGrid";
import axios from "axios";
import { Pagination } from "../../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { darkTheme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(20);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_REACT_REST_COUNTRIES_URL;

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        setCountries(response.data);
      } catch (error) {
        setError("Failed to fetch countries data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [API_URL]);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

  useEffect(() => {
    setSearchResults(
      countries.filter((country) => {
        const searchValue = searchInput.toLowerCase();
        const matchesSearchInput =
          country.name.common?.toLowerCase().includes(searchValue) ||
          country.name.official?.toLowerCase().includes(searchValue) ||
          country.altSpellings?.some((spelling) =>
            spelling.toLowerCase().includes(searchValue)
          ) ||
          country.cca2?.toLowerCase().includes(searchValue) ||
          country.cca3?.toLowerCase().includes(searchValue) ||
          country.ccn3?.includes(searchValue) ||
          country.cioc?.toLowerCase().includes(searchValue) ||
          country.capital?.some((cap) =>
            cap.toLowerCase().includes(searchValue)
          ) ||
          Object.values(country.name.nativeName || {}).some((native) =>
            native.common?.toLowerCase().includes(searchValue)
          );

        const matchesRegion = selectedRegion
          ? country.region.toLowerCase() === selectedRegion.toLowerCase()
          : true;

        return matchesSearchInput && matchesRegion;
      })
    );
    setCurrentPage(1);
  }, [countries, searchInput, selectedRegion]);

  const currentCountries = useMemo(
    () => searchResults.slice(indexOfFirstCountry, indexOfLastCountry),
    [searchResults, indexOfFirstCountry, indexOfLastCountry]
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}`);
      const searchValue = searchInput.toLowerCase();
      const country = response.data.find(
        (c) =>
          c.name.common?.toLowerCase() === searchValue ||
          c.name.official?.toLowerCase() === searchValue ||
          c.altSpellings?.some(
            (spelling) => spelling.toLowerCase() === searchValue
          ) ||
          c.cca2?.toLowerCase() === searchValue ||
          c.cca3?.toLowerCase() === searchValue ||
          c.ccn3 === searchValue ||
          c.cioc?.toLowerCase() === searchValue ||
          c.capital?.some((cap) => cap.toLowerCase() === searchValue) ||
          Object.values(c.name.nativeName || {}).some(
            (native) => native.common?.toLowerCase() === searchValue
          )
      );
      if (country) {
        const countryCode = country.cca3;
        navigate(`/details/${countryCode}`);
      } else {
        setError("Country not found.");
      }
    } catch (error) {
      setError("Failed to fetch search results.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleRegionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedRegion(selectedValue === "" ? "" : selectedValue);
  };

  const totalPages = Math.ceil(searchResults.length / countriesPerPage);
  const showPagination = searchResults.length > countriesPerPage;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className={` w-[90%] mx-auto my-10 md:grid md:grid-flow-col md:grid-cols-none md:justify-between md:items-center md:my-16 `}
      >
        <div
          className={`flex items-center flex-1 relative mb-14 md:mb-0 cursor-pointer md:flex-none ${
            darkTheme ? "shadow-dark-shadow-lg" : "shadow-lg"
          } `}
        >
          <div className="flex flex-col gap-6">
            <IoIosSearch
              onClick={handleSearch}
              className={`absolute mx-6 top-1/2 transform -translate-y-1/2 text-sm ${
                darkTheme ? "text-white" : "text-dark-gray"
              }`}
            />
          </div>
          <div className="flex-1 md:flex-none w-full">
            <input
              type="search"
              name="search"
              id="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={` w-[100%] px-14 py-4 outline-none rounded-md placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg  ${
                darkTheme
                  ? "bg-dark-blue placeholder-white text-white"
                  : "bg-white placeholder-dark-gray text-very-dark-blue-lm "
              }`}
              placeholder="Search for a country..."
            />
          </div>
        </div>

        <div className="cursor-pointer lg:w-[300px] md:w-[200px]">
          <div
            className={` ${
              darkTheme
                ? "bg-dark-blue placeholder-white text-very-dark-blue-lm shadow-dark-shadow-lg"
                : "bg-white placeholder-dark-gray shadow-lg"
            } border-none outline-none text-sm md:text-base md:placeholder:text-base lg:placeholder:text-xl rounded-md w-[65%] md:w-[100%] cursor-pointer pl-2 pr-4 md:pr-8 md:pl-5 py-4 `}
          >
            <select
              value={selectedRegion}
              onChange={handleRegionChange}
              className={`${
                darkTheme
                  ? "bg-dark-blue placeholder-dark-blue  text-white"
                  : "bg-white placeholder-white text-very-dark-blue-lm"
              } border-none outline-none form-select w-full cursor-pointer pl-4 md:pl-1 lg:w-full`}
            >
              <option className="cursor-pointer" value="">
                Filter by Region
              </option>
              <option className="cursor-pointer" value="africa">
                Africa
              </option>
              <option className="" value="americas">
                Americas
              </option>
              <option className="" value="asia">
                Asia
              </option>
              <option className="" value="europe">
                Europe
              </option>
              <option className="" value="oceania">
                Oceania
              </option>
              <option className="" value="antarctic">
                Antarctic
              </option>
            </select>
          </div>
        </div>
      </form>

      <CardGrid countries={currentCountries} loading={loading} error={error} />

      {showPagination && (
        <Pagination
          paginate={paginate}
          currentPage={currentPage}
          totalCountries={searchResults.length}
          countriesPerPage={countriesPerPage}
        />
      )}
    </div>
  );
};
