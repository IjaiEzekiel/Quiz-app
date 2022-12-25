import React from "react";

import Quiz from "./Quiz";


export default function QuizPage(props) {
  const [questionsArray, setQuestionsArray] = React.useState(props.quizData);
  const [check, setCheck] = React.useState(false);
  const [counter, setCounter] = React.useState(0);

  // Select answer
  function selectAnswer(id, answerId) {
    setQuestionsArray(prevQuestions => {
      let array = [];
      prevQuestions.forEach(question => {
        if (question.id !== id) {
          array.push(question);
        } else {
          let anserArr = [];

          question.answers.forEach(answer => {
            if (answerId === answer.id) {
              anserArr.push({ ...answer, selected: !answer.selected });
            } else {
              anserArr.push({ ...answer, selected: false });
            }
          });

          array.push({ ...question, answers: anserArr });
        }
      });
      return array;
    });
  }

  // Checks how many questions you answered right
  function CheckAnswers() {
    setCounter(0);
    questionsArray.forEach(questions => {
      questions.answers.forEach(answer => {
        if (answer.selected) {
          answer.answer === questions.correct_answer
            ? setCounter(prev => prev + 1)
            : setCounter(prev => prev + 0);
        }
      });
    });

    setCheck(true);
  }

  const quizElements = questionsArray.map(question => (
    <Quiz
      key={question.id}
      id={question.id}
      question={question.question}
      answers={question.answers}
      selectAnswer={selectAnswer}
      check={check}
      correct={question.correct_answer}
    />
  ));

  return (
    <div className="quiz--container">
      {quizElements}
      <div className="center-btn">
        {check && (
          <p className="score">You scored {counter}/10 correct answers</p>
        )}

        {!check ? (
          <button className="btn" onClick={CheckAnswers}>
            Check answers
          </button>
          
        ) : (
          <button className="btn" onClick={props.newGame}>
            Play again
          </button>
        )}
      </div>
    </div>
  );
}


