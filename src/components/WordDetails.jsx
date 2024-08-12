import { useRef } from "react";

export default function WordDetails({ wordDetails }) {
  const audioRef = useRef(null);
  const audio = wordDetails.phonetics.filter(
    (item) => item.audio !== "" && item.text,
  )[0];
  const audioUrl = audio?.audio;
  const phonetics = audio?.text;
  const isAudioAvailable = audioUrl !== undefined;

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
      <div>
        <h2 className="relative mt-10 overflow-hidden text-base font-bold italic after:absolute after:-right-14 after:top-[50%] after:h-[1px] after:w-full after:translate-y-[50%] after:bg-gray-400 sm:mt-14 sm:text-xl sm:after:-right-20 dark:after:bg-gray-600">
          noun
        </h2>
        <div className="mt-9 space-y-8 sm:mt-12">
          <h3 className="text-base font-normal text-gray-500">Meaning</h3>
          <ul className="space-y-6 text-base">
            {wordDetails.meanings[0].definitions.map((item, index) => {
              return (
                <li
                  key={index}
                  className="relative pl-5 before:absolute before:left-1 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-purple"
                >
                  {item.definition}
                </li>
              );
            })}
          </ul>
          {wordDetails.meanings[0].synonyms.length > 0 && (
            <div className="flex gap-6">
              <h3 className="text-base font-normal text-gray-500">Synonyms</h3>
              <p>
                {wordDetails.meanings[0].synonyms.map(
                  (synonym, index, array) => (
                    <span key={index}>
                      <span className="cursor-pointer text-base font-bold text-purple hover:underline">
                        {synonym}
                      </span>
                      {index < array.length - 1 ? ", " : ""}
                    </span>
                  ),
                )}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="border-b border-gray-400 pb-10 sm:pb-11 dark:border-gray-600">
        {wordDetails.meanings.length > 1 && (
          <>
            <h2 className="relative mt-10 overflow-hidden text-base font-bold italic after:absolute after:-right-14 after:top-[50%] after:h-[1px] after:w-full after:translate-y-[50%] after:bg-gray-400 sm:mt-14 sm:text-xl sm:after:-right-20 dark:after:bg-gray-600">
              verb
            </h2>
            <div className="mt-9 space-y-8 sm:mt-12">
              <h3 className="text-base font-normal text-gray-500">Meaning</h3>
              <ul className="space-y-6 text-base">
                {wordDetails.meanings[1].definitions.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="relative space-y-[26px] pl-5 before:absolute before:left-1 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-purple sm:space-y-6"
                    >
                      <p className="text-gray-700 dark:text-white">
                        {item.definition}
                      </p>
                      <p className="text-gray-500">{item.example}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-3 pt-8 underline-offset-2 sm:flex-row sm:pt-6">
        <p className="text-gray-500 underline decoration-gray-500">Source</p>
        <span className="flex items-center gap-[10px] underline decoration-black dark:decoration-white">
          <a href={wordDetails.sourceUrls[0]} target="_blank">
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
