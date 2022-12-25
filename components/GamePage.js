import React from "react";
import { nanoid } from "nanoid";
import QuizPage from "./QuizPage";

export default function GamePage() {
  const [quizData, setQuizData] = React.useState([]);
  const [newQuiz, setNewQuiz] = React.useState(false);

  React.useEffect(() => {
    function getQuiz() {
      fetch(
        "https://opentdb.com/api.php?amount=10&category=23&encode=base64"
      )
      .then(res => res.json())
      .then(data => setQuizData(data.results));
    }
    getQuiz();
  }, [newQuiz]);

  // Shuffle array
  let arrayShuffle = function (arr) {
    let newPos, temp;
    for (let i = 0; i < arr.length; i++) {
      newPos = Math.ceil(Math.random() * i);
      temp = arr[i];
      arr[i] = arr[newPos];
      arr[newPos] = temp;
    }
    return arr;
  };

  // Create array with the data you will use
  function creatQuestions() {
    let array = [];
    quizData.forEach(item => {
      let answersArray = [item.correct_answer, ...item.incorrect_answers];

      answersArray = arrayShuffle(answersArray);
      answersArray = answersArray.map(answer => ({
        id: nanoid(),
        answer: answer,
        selected: false,
      }));

      const question = {
        id: nanoid(),
        question: item.question,
        answers: answersArray,
        correct_answer: item.correct_answer,
      };
      array.push(question);
    });

    return array;
  }

  function newGame() {
    setNewQuiz(prev => !prev);
    setQuizData([]);
  }

  return (
    <>
      {quizData[0] ? (
        <QuizPage quizData={creatQuestions()} newGame={newGame} />
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

