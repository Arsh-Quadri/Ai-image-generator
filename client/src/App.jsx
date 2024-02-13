import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import sun from "./assets/sun.png";
import moon from "./assets/moon.png";
import Home from "./pages/Home";
import CreactePost from "./pages/CreactePost";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  return (
    <BrowserRouter>
      <header
        className={`w-full flex justify-between items-center ${
          darkMode ? "bg-[#1F1F1F]" : "bg-white border-b border-b-[#e6ebf4]"
        } sm:px-8 px-4 py-4  `}
      >
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className={`w-[7rem] object-contain ${
              darkMode && "filter invert grayscale"
            }`}
          />
        </Link>
        <div className="flex justify-center items-center gap-5">
          <button
            onClick={toggleTheme}
            className={`${
              darkMode
                ? "bg-[#1F1F1F] border-white"
                : "bg-white border-gray-800"
            } p-2 rounded-full  border-[0.01px]`}
          >
            {darkMode ? (
              <img src={sun} alt="sun" className="w-5" />
            ) : (
              <img src={moon} alt="moon" className="w-5" />
            )}
          </button>
          <Link
            to="/create-post"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md "
          >
            Create
          </Link>
        </div>
      </header>
      <main
        className={`sm:p-8 px-4 py-8 w-full ${
          darkMode ? "bg-[#121212]" : "bg-[#f9f8fe]"
        } min-h-[calc(100vh-73px)]`}
      >
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route
            path="/create-post"
            element={<CreactePost darkMode={darkMode} />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
