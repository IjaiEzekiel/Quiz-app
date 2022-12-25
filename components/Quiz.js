import React from "react";


export default function Quiz(props) {
  function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }

  const answersElement = props.answers.map(answer => {
    let style;
    if (!props.check) {
      style = answer.selected ? "selected" : "not--selected";
    } else {
      if (answer.answer === props.correct) {
        style = "correct--selected";
      } else if (answer.selected && answer.answer !== props.correct) {
        style = "correct--not--selected";
      } else {
        style = "not--selected--checked";
      }
    }

    return (
      <span
        key={answer.id}
        onClick={() => props.selectAnswer(props.id, answer.id)}
        className={style}>
        {b64_to_utf8(answer.answer)}
      </span>
    );
  });

  return (
    <article className="quiz">
      <p>{b64_to_utf8(props.question)}</p>
      <div className="answers">{answersElement}</div>
    </article>
  );
}

