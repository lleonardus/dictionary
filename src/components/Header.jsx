import { useState } from "react";
import { useEffect } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontFamily, setFontFamily] = useState({
    name: "Sans Serif",
    tailwindName: "sans",
  });
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) return storedTheme;

    const isPreferredColorSchemeDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    return isPreferredColorSchemeDark ? "dark" : "light";
  });

  function handleTheme() {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  }

  useEffect(
    function() {
      const htmlElement = document.documentElement;
      htmlElement.classList.add(theme);
      htmlElement.classList.remove(theme === "light" ? "dark" : "light");
      localStorage.setItem("theme", theme);
    },
    [theme],
  );

  useEffect(
    function() {
      const htmlElement = document.documentElement;
      const regex = /font-/;

      htmlElement.classList.forEach((className) => {
        if (regex.test(className)) {
          htmlElement.classList.remove(className);
        }
      });

      htmlElement.classList.add(`font-${fontFamily.tailwindName}`);
    },
    [fontFamily],
  );

  return (
    <header className="relative z-10 flex items-center justify-between">
      <div>
        <img src="./images/logo.svg" alt="logo" />
      </div>
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="relative border-r border-gray-400 pr-4 font-bold sm:pr-6">
          <div
            className="flex cursor-pointer gap-5"
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          >
            <span>{fontFamily.name}</span>
            <img src="./images/icon-arrow-down.svg" alt="arrow down" />
          </div>
          <ul
            className={`absolute right-4 mt-5 flex flex-col gap-4 rounded-2xl bg-white py-6 pl-6 pr-20 font-mono shadow-md drop-shadow *:cursor-pointer sm:right-5 dark:bg-gray-800 dark:shadow-[0px_0px_30px_0px_rgba(164,69,237,1)] ${!isOpen ? "hidden" : ""}`}
          >
            <li
              onClick={() =>
                setFontFamily({ name: "Sans Serif", tailwindName: "sans" })
              }
              className="w-max font-sans hover:text-purple"
            >
              Sans Serif
            </li>
            <li
              onClick={() =>
                setFontFamily({ name: "Serif", tailwindName: "serif" })
              }
              className="w-max font-serif hover:text-purple"
            >
              Serif
            </li>
            <li
              onClick={() =>
                setFontFamily({ name: "Mono", tailwindName: "mono" })
              }
              className="w-max font-mono hover:text-purple"
            >
              Mono
            </li>
          </ul>
        </div>
        <div className="flex gap-3 sm:gap-4">
          <button
            onClick={handleTheme}
            className="relative h-5 w-10 rounded-xl bg-gray-500 text-black hover:bg-purple dark:bg-purple dark:text-white"
          >
            <div
              className={`absolute top-[50%] aspect-square w-[14px] translate-x-[3px] translate-y-[-50%] rounded-full bg-white transition-transform dark:translate-x-[23px]`}
            ></div>
          </button>
          <div className="text-gray-500 dark:text-purple">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 22 22"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
