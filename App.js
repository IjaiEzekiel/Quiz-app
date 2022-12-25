import React from "react";
import LandingPage from "./components/LandingPage";
import GamePage from "./components/GamePage";
import "./styles.css"

export default function App() {
  const [isQuizON, setIsQuizON] = React.useState(false);

  function startQuiz() {
    setIsQuizON(true);
  }

  return (
    <main className="main">
      {isQuizON ? (
        <GamePage isQuizON={isQuizON} />
      ) : (
        <LandingPage handleClick={startQuiz} />
      )}
    </main>
  );
}


