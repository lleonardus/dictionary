export default function ListOfMeanings({ meanings }) {
  return (
    <>
      <div className="flex items-center gap-7 pt-10 sm:pt-14">
        <h2 className="whitespace-nowrap text-base font-bold italic sm:text-xl sm:after:-right-20 dark:after:bg-gray-600">
          {meanings.partOfSpeech}
        </h2>
        <div className="h-[1px] w-full bg-gray-400 dark:bg-gray-600"></div>
      </div>
      <div className="mt-9 space-y-8 sm:mt-12">
        <h3 className="text-base font-normal text-gray-500">Meaning</h3>
        <ul className="space-y-6 text-base">
          {meanings.definitions.map((item, index) => {
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
        {meanings.synonyms.length > 0 && (
          <div className="flex gap-6">
            <h3 className="text-base font-normal text-gray-500">Synonyms</h3>
            <p>
              {Array.from(new Set(meanings.synonyms)).map(
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
    </>
  );
}
