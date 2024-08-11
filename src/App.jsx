import { useEffect, useState } from "react";
import Container from "./components/Container";
import Header from "./components/Header";
import Form from "./components/Form";
import WordDetails from "./components/WordDetails";

function App() {
  const [word, setWord] = useState(
    window.location.pathname.split("/")[1] || "",
  );
  const [wordDetails, setWordDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [fontFamily, setFontFamily] = useState({
    name: "Sans Serif",
    tailwindName: "sans",
  });

  async function getWordDetails() {
    setIsLoading(true);
    setErrorMessage(null);

    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );
    const data = await response.json();

    setIsLoading(false);

    if (response.status === 404) {
      setErrorMessage({
        title: data.title,
        message: `${data.message} ${data.resolution}`,
      });
      setWordDetails(null);
    } else {
      setWordDetails(data[0]);
    }
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(function () {
    if (word.trim() === "") return;

    getWordDetails();
  }, []);

  useEffect(function () {
    function handlePopState() {
      const path = window.location.pathname;
      setWord(path.split("/")[1] || "");
    }

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div
      className={`h-full min-h-screen w-screen bg-white pb-24 text-sm text-black sm:text-base dark:bg-black dark:text-white font-${fontFamily.tailwindName}`}
    >
      <Container>
        <Header fontFamily={fontFamily} setFontFamily={setFontFamily} />
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
            {isLoading && <p>Loading...</p>}
            {errorMessage && <p>Not found!</p>}
            {wordDetails && <WordDetails wordDetails={wordDetails} />}
          </section>
        </main>
      </Container>
    </div>
  );
}

export default App;
