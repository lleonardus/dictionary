import { useState } from "react";
import Header from "./components/Header";
import Container from "./components/Container";

function App() {
  const [fontFamily, setFontFamily] = useState({
    name: "Sans Serif",
    tailwindName: "sans",
  });

  return (
    <div
      className={`h-screen w-screen bg-white text-sm text-black sm:text-base dark:bg-black dark:text-white font-${fontFamily.tailwindName}`}
    >
      <Container>
        <Header fontFamily={fontFamily} setFontFamily={setFontFamily} />
      </Container>
    </div>
  );
}

export default App;
