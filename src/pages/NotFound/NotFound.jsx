import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/Theme/themeContext";
import { useContext } from "react";
import NotFoundImage from "../../assets/images/page_not_found.svg";

export const NotFound = () => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${
        darkTheme
          ? "bg-dark-blue text-white "
          : "bg-white text-very-dark-blue-lm"
      } flex flex-col items-center justify-center min-h-screen px-6 py-12`}
    >
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Go to Home
      </Link>
      <div className="mt-8">
        <img
          src={NotFoundImage}
          alt="404 Illustration"
          className="max-w-full h-44"
        />
      </div>
    </div>
  );
};
