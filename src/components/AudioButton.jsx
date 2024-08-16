import { useRef } from "react";

export default function AudioButton({ audio }) {
  const audioRef = useRef(null);
  const isAudioAvailable = audio !== undefined;

  function handlePlayAudio() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }

  return (
    <>
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
      <audio ref={audioRef} src={`${audio}`} />
    </>
  );
}
