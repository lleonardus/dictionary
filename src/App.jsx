import { useEffect, useState } from "react";
import Header from "./components/Header";
import Container from "./components/Container";
import Form from "./components/Form";

function App() {
  const [word, setWord] = useState(window.location.pathname.substring(1) || "");
  const [fontFamily, setFontFamily] = useState({
    name: "Sans Serif",
    tailwindName: "sans",
  });

  useEffect(function() {
    function handlePopState() {
      const path = window.location.pathname;
      setWord(path.substring(1) || "");
    }

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div
      className={`h-screen w-screen bg-white text-sm text-black sm:text-base dark:bg-black dark:text-white font-${fontFamily.tailwindName}`}
    >
      <Container>
        <Header fontFamily={fontFamily} setFontFamily={setFontFamily} />
        <main className="mt-6 sm:mt-[51px]">
          <section>
            <Form word={word} setWord={setWord} />
          </section>
        </main>
      </Container>
    </div>
  );
}

export default App;
