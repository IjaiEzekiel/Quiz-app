import React from "react";

function LandingPage(props) {
  return (
    <div className="landing-page">
      <h1>Quizzical</h1>
      <h2>Test your knowledge of History!</h2>
      <button className="btn btn-land" onClick={props.handleClick}>
        Start quiz
      </button>
    </div>
  );
}

export default LandingPage;
