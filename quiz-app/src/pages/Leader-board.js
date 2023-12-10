import React from "react";
import { Link } from "react-router-dom";

export default function Leader_boadrd() {
  const handleLeaveClick = () => {
    localStorage.removeItem("quizQuestions");
    localStorage.removeItem("quizCurrentQuestionIndex");
    localStorage.removeItem("quizScore");
  };

  return (
    <div className="quiz-game">
      <div className="header-quiz-game header-board">
        <div>
          <p>BAOQUIZ</p>
        </div>
        <div className="quiz-a">
          <Link to="/" className="quiz-href" onClick={handleLeaveClick}>
            LEAVE
          </Link>
        </div>
      </div>
      <div className="content-quiz-game"></div>
    </div>
  );
}
