import { useContext } from "react";
import { ThemeContext } from "../../context/Theme/themeContext";

export const Footer = () => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div>
      <footer
        className={` ${
          darkTheme
            ? "bg-dark-blue text-white shadow-dark-shadow-xl"
            : "bg-white text-very-dark-blue-lm shadow-xl"
        } py-6 transition duration-1000 ease-in-out`}
      >
        <div className="container mx-auto grid grid-cols-1 gap-4 md:flex justify-between items-center px-4">
          <p className="text-base">
            &copy; 2024 Richard Essuman. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-3">
            <a
              href="#"
              className={`${
                darkTheme
                  ? "text-white hover:bg-very-dark-blue-lm hover:text-dark-gray"
                  : "text-very-dark-blue-lm hover:bg-dark-blue hover:text-dark-gray"
              } transition duration-1000 ease-in-out md:mr-4  `}
            >
              Terms of Service
            </a>
            <a
              href="#"
              className={`${
                darkTheme
                  ? "text-white  hover:bg-very-dark-blue-lm hover:text-dark-gray"
                  : "text-very-dark-blue-lm  hover:bg-dark-blue hover:text-dark-gray"
              } transition duration-1000 ease-in-out`}
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
