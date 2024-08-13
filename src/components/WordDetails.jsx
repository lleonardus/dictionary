import { useRef } from "react";
import ListOfMeanings from "./ListOfMeanings";

export default function WordDetails({ wordDetails }) {
  const audioRef = useRef(null);
  const audio = wordDetails.phonetics.filter((item) => item.audio)[0];
  const audioUrl = audio?.audio;
  const phonetics = audio?.text;
  const isAudioAvailable = audioUrl !== undefined;
  const meanings = wordDetails.meanings.reduce((acc, current) => {
    const existing = acc.find(
      (item) => item.partOfSpeech === current.partOfSpeech,
    );

    if (existing) {
      existing.definitions = [
        ...new Set([...existing.definitions, ...current.definitions]),
      ];
      existing.synonyms = [
        ...new Set([...existing.synonyms, ...current.synonyms]),
      ];
      existing.antonyms = [
        ...new Set([...existing.antonyms, ...current.antonyms]),
      ];
    } else {
      acc.push({ ...current });
    }

    return acc;
  }, []);

  function handlePlayAudio() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-[14px] sm:space-y-[21px]">
          <h1 className="text-xl font-bold sm:text-2xl">{wordDetails.word}</h1>
          <p className="text-purple sm:text-xl">
            {phonetics || wordDetails.phonetic}
          </p>
        </div>
        <button
          disabled={!isAudioAvailable}
          onClick={handlePlayAudio}
          className={`group relative h-12 w-12 rounded-full sm:h-[75px] sm:w-[75px] ${!isAudioAvailable ? "cursor-not-allowed" : ""}`}
        >
          <span
            className={`absolute bottom-10 right-12 hidden w-max rounded-lg rounded-br-none bg-black/70 px-2 py-1 text-sm text-white sm:bottom-16 sm:right-[75px] dark:bg-gray-800/60 ${!isAudioAvailable ? "group-hover:block" : ""}`}
          >
            Not Available
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75">
            <g fillRule="evenodd">
              <circle
                cx="37.5"
                cy="37.5"
                r="37.5"
                className={`fill-purple opacity-25 ${isAudioAvailable ? "group-hover:opacity-100" : ""}`}
              />
              <path
                d="M29 27v21l21-10.5z"
                className={`fill-purple ${isAudioAvailable ? "group-hover:fill-white" : ""}`}
              />
            </g>
          </svg>
        </button>
        <audio ref={audioRef} src={`${audioUrl}`} />
      </div>
      <div className="border-b border-gray-400 pb-10 sm:pb-11 dark:border-gray-600">
        {meanings.map((meanings, index) => {
          return <ListOfMeanings key={index} meanings={meanings} />;
        })}
      </div>
      <div className="flex flex-col gap-3 pt-8 underline-offset-2 sm:flex-row sm:pt-6">
        <p className="text-gray-500 underline decoration-gray-500">Source</p>
        <span className="flex items-center gap-[10px] underline decoration-black dark:decoration-white">
          <a
            className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-700 dark:text-white"
            href={wordDetails.sourceUrls[0]}
            target="_blank"
          >
            {wordDetails.sourceUrls[0]}
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
          >
            <path
              fill="none"
              stroke="#838383"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"
            />
          </svg>
        </span>
      </div>
    </>
  );
}
