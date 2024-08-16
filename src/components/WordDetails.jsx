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
    </>
  );
}
