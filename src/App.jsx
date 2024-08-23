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
    if (wordList?.title) return null;
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

  function updateUrl(word) {
    if (getUrlWord() !== word) {
      window.history.pushState(null, "", `/${word}`);
    }
  }

  function isWordEmpty(word) {
    if (word.trim() === "") {
      setWordDetails(null);
      setErrorMessage(null);
      return true;
    }
    return false;
  }

  function updateStateFromCache(storagedWord) {
    if (storagedWord?.word) {
      setErrorMessage(null);
      setWordDetails(storagedWord);
    } else if (storagedWord?.title) {
      setWordDetails(null);
      setErrorMessage({
        title: storagedWord.title,
        message: `${storagedWord.message} ${storagedWord.resolution}`,
      });
    }
  }

  useEffect(
    function () {
      async function fetchAndCacheWordDetails() {
        setIsLoading(true);

        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
        );
        const data = await response.json();

        setIsLoading(false);

        const mergedWordList = mergeWordList(data);

        if (response.ok) {
          setWordDetails(mergedWordList);
          setErrorMessage(null);
        } else {
          setWordDetails(null);
          setErrorMessage({
            title: data.title,
            message: `${data.message} ${data.resolution}`,
          });
        }

        sessionStorage.setItem(word, JSON.stringify(mergedWordList ?? data));

        updateUrl(word);
      }

      if (isWordEmpty(word)) return;

      const storagedWord = JSON.parse(sessionStorage.getItem(word));

      if (storagedWord) {
        updateStateFromCache(storagedWord);
      } else {
        fetchAndCacheWordDetails();
      }
    },
    [word],
  );

  useEffect(function () {
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
