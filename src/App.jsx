import { useEffect, useState } from "react";
import { getUrlWord } from "./utils/utils";
import Container from "./components/Container";
import Header from "./components/Header";
import Form from "./components/Form";
import WordDetails from "./components/WordDetails";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";
import Footer from "./components/Footer";

function App() {
  const [word, setWord] = useState(getUrlWord);
  const [wordDetails, setWordDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  function mergeWordList(wordList) {
    if (wordList.length === 1) return wordList[0];

    const initialObject = {
      word: wordList[0].word,
      phonetic: "",
      phonetics: [],
      meanings: [],
      sourceUrls: [],
    };

    return wordList.reduce((acc, current) => {
      if (!acc.phonetic && current.phonetic) acc.phonetic = current.phonetic;

      acc.phonetics = [...acc.phonetics, ...current.phonetics];
      acc.meanings = [...acc.meanings, ...current.meanings];
      acc.sourceUrls = Array.from(
        new Set([...acc.sourceUrls, ...current.sourceUrls]),
      );

      return acc;
    }, initialObject);
  }

  useEffect(
    function() {
      async function getWordDetails() {
        setIsLoading(true);

        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
        );
        const data = await response.json();

        setIsLoading(false);

        if (response.ok) {
          setWordDetails(mergeWordList(data));
          setErrorMessage(null);
        } else {
          setWordDetails(null);
          setErrorMessage({
            title: data.title,
            message: `${data.message} ${data.resolution}`,
          });
        }

        if (getUrlWord() !== word) {
          window.history.pushState({}, "", `/${word}`);
        }
      }

      if (word.trim() === "") {
        setWordDetails(null);
        setErrorMessage(null);
        return;
      }

      getWordDetails();
    },
    [word],
  );

  useEffect(function() {
    function handlePopState() {
      setWord(getUrlWord());
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className="relative h-full min-h-screen w-screen bg-white pb-24 text-sm text-black sm:text-base dark:bg-black dark:text-white">
      <Container>
        <Header />
        <main className="mt-6 space-y-8 sm:mt-[51px]">
          <section>
            <Form word={word} setWord={setWord} isDisabled={isLoading} />
          </section>
          <section>
            {isLoading && <Loader />}
            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
            {wordDetails && <WordDetails wordDetails={wordDetails} />}
          </section>
        </main>
        {wordDetails && <Footer sourceUrls={wordDetails.sourceUrls} />}
      </Container>
    </div>
  );
}

export default App;
