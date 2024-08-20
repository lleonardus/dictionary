import { useEffect, useRef, useState } from "react";

export default function Form({ word, setWord, isDisabled }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isBlank, setIsBlank] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const inputRef = useRef(null);

  function isValidEnglishWord(word) {
    const regex = /^[a-zA-Z-' ]+$/;

    return regex.test(word);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setIsBlank(true);
      return;
    } else if (!isValidEnglishWord(searchTerm)) {
      setIsInvalid(true);
      return;
    }

    setWord(searchTerm);
  }

  function handleChange(e) {
    setSearchTerm(() => e.target.value);
    setIsBlank(false);
    setIsInvalid(false);
  }

  useEffect(() => setSearchTerm(word), [word]);

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
          className={`h-12 w-full cursor-pointer rounded-2xl border bg-gray-200 bg-[url('/images/icon-search.svg')] bg-[center_right_24px] bg-no-repeat px-6 pr-14 text-base font-bold caret-purple outline-none placeholder:text-gray-500 sm:h-16 sm:text-lg dark:bg-gray-800 ${isBlank || isInvalid ? "border-red" : "border-[transparent] hover:border-purple focus:border-purple"} ${isDisabled ? "cursor-wait" : ""}`}
          type="text"
          placeholder="Search for any word..."
          disabled={isDisabled}
          value={searchTerm}
          onChange={handleChange}
          ref={inputRef}
        />
        <p className="z-1 absolute mt-1.5 text-red">
          {isBlank && "Whoops, can't be empty..."}
          {isInvalid && "Whoops, invalid word..."}
        </p>
      </div>
    </form>
  );
}
