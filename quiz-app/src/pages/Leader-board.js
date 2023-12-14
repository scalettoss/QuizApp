import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowElbowDownRight, CaretCircleRight } from "@phosphor-icons/react";
import { borderBottom } from "@mui/system";

export default function Leader_boadrd() {
  const handleLeaveClick = () => {
    const token = localStorage.getItem("token"); // Giữ lại mục "token"
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key !== "token") {
        localStorage.removeItem(key);
      }
    }

    if (token) {
      localStorage.setItem("token", token); // Đặt lại mục "token" nếu cần thiết
    }
  };
  const storedQuestions = JSON.parse(localStorage.getItem("quizQuestions"));
  const quizInCorrectQuestionIndexes = JSON.parse(
    localStorage.getItem("quizIncorrectQuestionIndexes")
  );
  const Score = localStorage.getItem("quizScore");
  const CorrectAns =
    storedQuestions.length - quizInCorrectQuestionIndexes.length;
  const percentage = (CorrectAns / storedQuestions.length) * 100;
  const IncorectAns = quizInCorrectQuestionIndexes.length;
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
      <div className="board-content">
        <div className="board-user-info">
          <img
            src="/assets/main_site/images/snapedit_1701926027907.png"
            alt=""
          />
          <h3>Full Name</h3>
          <span>{Score} Point</span>
          <div className="total-area">
            <div
              className="total-color"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="total-answer">
            <p>Correct: {CorrectAns}</p>
            <p>Incorrect: {IncorectAns}</p>
          </div>
        </div>
        <div className="board-review">
          <span>Review the questions</span>
          <div className="board-question">
            <div className="board-question">
              {storedQuestions.map((question, index) => {
                const incorrectQuestion = quizInCorrectQuestionIndexes.find(
                  (item) => item.index === index
                );
                const isIncorrect = incorrectQuestion !== undefined;
                return (
                  <div
                    key={question.id}
                    className={`board-question-edit ${
                      isIncorrect ? "incorrect-question" : ""
                    }`}
                    style={{
                      borderLeft: isIncorrect
                        ? "10px solid red"
                        : "10px solid #22c55e",
                    }}
                  >
                    <h3>
                      {index + 1}. {question.title}
                    </h3>
                    <ul>
                      {question.options.map((option, optionIndex) => {
                        const isIncorrectOption =
                          isIncorrect && option === incorrectQuestion.answer;

                        return (
                          <li
                            key={optionIndex}
                            style={{
                              color: isIncorrectOption
                                ? "red"
                                : option === question.answer
                                ? "#22c55e"
                                : "white",
                            }}
                          >
                            {option}
                          </li>
                        );
                      })}
                    </ul>
                    <hr className="hr-for-board" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
