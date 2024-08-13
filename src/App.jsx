import { useEffect, useState } from "react";
import Container from "./components/Container";
import Header from "./components/Header";
import Form from "./components/Form";
import WordDetails from "./components/WordDetails";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";

function App() {
  const [word, setWord] = useState(() => {
    const wordToSearch = window.location.pathname.split("/")[1];

    return wordToSearch.replace("%20", " ") || "";
  });
  const [wordDetails, setWordDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  async function getWordDetails() {
    setIsLoading(true);

    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );
    const data = await response.json();

    setIsLoading(false);

    if (response.status !== 200) {
      setErrorMessage({
        title: data.title,
        message: `${data.message} ${data.resolution}`,
      });
      setWordDetails(null);
    } else {
      setErrorMessage(null);
      setWordDetails(data[0]);
    }
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(function() {
    if (word.trim() === "") return;

    getWordDetails();
  }, []);

  useEffect(function() {
    function handlePopState() {
      const wordToSearch = window.location.pathname.split("/")[1];
      setWord(() => wordToSearch.replace("%20", " ") || "");
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
            <Form
              word={word}
              setWord={setWord}
              getWordDetails={getWordDetails}
              isDisabled={isLoading}
            />
          </section>
          <section>
            {isLoading && <Loader />}
            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
            {wordDetails && <WordDetails wordDetails={wordDetails} />}
          </section>
        </main>
      </Container>
    </div>
  );
}

export default App;
