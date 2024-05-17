import { useContext } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { ThemeContext } from "../../context/Theme/themeContext";

export default function NavHeader() {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="">
      <div
        className={`flex justify-between w-full py-7 md:px-16 px-5 text-sm  ${
          darkTheme
            ? "bg-dark-blue text-white shadow"
            : "bg-white text-very-dark-blue-lm shadow"
        } `}
      >
        <div className="">
          <h1 className="font-extrabold md:text-lg lg:text-3xl">
            Where in the world?
          </h1>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer focus:outline-none"
          onClick={toggleTheme}
        >
          <div className="font-semibold">
            {darkTheme ? <IoSunnyOutline /> : <IoMoonOutline />}
          </div>
          <div className="font-semibold">
            {darkTheme ? "Light Mode" : "Dark Mode"}
          </div>
        </button>
      </div>
    </div>
  );
}
