import { useEffect, useRef, useState } from "react";

export default function Form({ word, setWord }) {
  const [isBlank, setIsBlank] = useState(false);
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (word.trim() === "") {
      setIsBlank(true);
      return;
    }

    window.history.pushState({ parameter: word }, "", `/${word}`);
  }

  function handleChange(e) {
    setWord(() => e.target.value);
    setIsBlank(false);
  }

  useEffect(function() {
    function handleKeyDown(e) {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current.focus();
      } else if (e.key === "Escape" && inputRef.current) {
        inputRef.current.blur();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <input
          className={`h-12 w-full cursor-pointer rounded-2xl bg-gray-200 bg-[url('/images/icon-search.svg')] bg-[center_right_24px] bg-no-repeat px-6 text-base font-bold caret-purple outline-none placeholder:text-gray-500 sm:h-16 sm:text-lg dark:bg-gray-800 ${isBlank ? "border border-red" : "focus:border focus:border-purple"}`}
          type="text"
          placeholder="Search for any word..."
          value={word}
          onChange={(e) => handleChange(e)}
          ref={inputRef}
        />
        {isBlank && <p className="mt-3 text-red">Whoops, can't be empty...</p>}
      </div>
    </form>
  );
}
