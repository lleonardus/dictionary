import ListOfMeanings from "./ListOfMeanings";
import AudioButton from "./AudioButton";

export default function WordDetails({ wordDetails }) {
  const audio = wordDetails.phonetics.filter((item) => item.audio)[0];
  const phonetics = audio?.text;
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

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-[14px] sm:space-y-[21px]">
          <h1 className="text-xl font-bold sm:text-2xl">{wordDetails.word}</h1>
          <p className="text-purple sm:text-xl">
            {phonetics || wordDetails.phonetic}
          </p>
        </div>
        <AudioButton audio={audio?.audio} />
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
