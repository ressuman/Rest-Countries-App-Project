import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavHeader from "./components/NavHeader/NavHeader";
import { Home } from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import { useContext } from "react";
import { ThemeContext } from "./context/Theme/themeContext";
import { Footer } from "./components/Footer/Footer";
import { NotFound } from "./pages/NotFound/NotFound";

function App() {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${
        darkTheme ? "bg-very-dark-blue-dm" : "bg-very-light-gray"
      } w-full min-h-screen flex flex-col`}
    >
      <NavHeader />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:countryCode" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
