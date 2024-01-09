import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import createAPIEndpoint from "../API/api";
import { ENDPOINTS } from "../API/api";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function Leader_boadrd() {
  const { mapId } = useParams();
  const [CorrectAns, setCorrectAns] = useState(0);
  const [percentage, setpercentage] = useState(0);
  const [IncorectAns, setIncorectAns] = useState(0);
  const [isOldScore, setIsOldScore] = useState(null);
  const [participants, setParticipants] = useState([]);

  localStorage.removeItem("quizCurrentQuestionIndex");
  localStorage.removeItem("quizTimeRemaining");

  const handleLeaveClick = () => {
    const token = localStorage.getItem("token");
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key !== "token" && key !== "user") {
        localStorage.removeItem(key);
      }
    }
    if (token) {
      localStorage.setItem("token", token); // Đặt lại mục "token" nếu cần thiết
    }
  };
  const encodedUser = localStorage.getItem("user");
  const decodedUser = encodedUser ? JSON.parse(atob(encodedUser)) : null;

  const Score = localStorage.getItem("quizScore");
  const storedQuestions = JSON.parse(localStorage.getItem("quizQuestions"));
  const quizInCorrectQuestionIndexes = JSON.parse(
    localStorage.getItem("quizIncorrectQuestionIndexes")
  );
  useEffect(() => {
    if (quizInCorrectQuestionIndexes == null) {
      setCorrectAns(storedQuestions.length);
      setpercentage((storedQuestions.length / storedQuestions.length) * 100);
      setIncorectAns(0);
    } else {
      setCorrectAns(
        storedQuestions.length - quizInCorrectQuestionIndexes.length
      );
      setpercentage(
        ((storedQuestions.length - quizInCorrectQuestionIndexes.length) /
          storedQuestions.length) *
          100
      );
      setIncorectAns(quizInCorrectQuestionIndexes.length);
    }
  }, []);
  useEffect(() => {
    const postPart = async () => {
      const hasPosted = localStorage.getItem("hasPosted");
      if (hasPosted === "true") {
        return;
      }
      try {
        const checkPart = createAPIEndpoint(ENDPOINTS.participant);
        const response = await checkPart.getParticipant(mapId, decodedUser.id);
        console.log("Tim thay res ", response.data);
        const data = response.data;
        const oldId = data.id;
        const oldTimes = data.times;
        const oldScore = data.score;
        setIsOldScore(parseInt(oldScore));
        if (oldScore > Score) {
          const updateData = {
            id: parseInt(oldId),
            userId: parseInt(decodedUser.id),
            score: parseInt(oldScore),
            mapId: parseInt(mapId),
            dateComplete: new Date().toISOString(),
            times: parseInt(oldTimes) + 1,
          };
          const UpdatePart = createAPIEndpoint(ENDPOINTS.participant);
          await UpdatePart.put(oldId, updateData);
          console.log("Update Complete");
          localStorage.setItem("hasPosted", "true");
        } else {
          const updateData = {
            id: parseInt(oldId),
            userId: parseInt(decodedUser.id),
            score: parseInt(Score),
            mapId: parseInt(mapId),
            dateComplete: new Date().toISOString(),
            times: parseInt(oldTimes) + 1,
          };
          const UpdatePart = createAPIEndpoint(ENDPOINTS.participant);
          await UpdatePart.put(oldId, updateData);
          console.log("Update Complete");
          localStorage.setItem("hasPosted", "true");
        }
      } catch (error) {
        try {
          const newData = {
            userId: parseInt(decodedUser.id),
            Score: parseInt(Score),
            mapId: parseInt(mapId),
            datecomplete: new Date().toISOString(),
            times: parseInt(1),
          };
          const NewPostAPI = createAPIEndpoint(ENDPOINTS.participant);
          const res = await NewPostAPI.post(newData);
          const data = res.data;
          // setDuplicateid(parseInt(data.id));
          console.log("Post Complete", res.data);
          localStorage.setItem("hasPosted", "true");
        } catch (error) {
          console.log("Post Fail", error);
        }
      }
    };
    postPart();
  }, []);

  useEffect(() => {
    let isMounted = true; // Biến trạng thái để kiểm tra component đã được mount hay chưa
    setTimeout(() => {
      if (isMounted) {
        rankShow();
      }
    }, 2000);

    return () => {
      isMounted = false; // Đảm bảo trạng thái là false khi component unmount
    };
  }, []);
  const rankShow = async () => {
    const API = createAPIEndpoint(ENDPOINTS.participant);
    try {
      const response = await API.getParbyMapId(mapId);
      const data = response.data;
      console.log("Data", data);
      if (data && data.length > 0) {
        setParticipants(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="quiz-game">
        <div className="header-quiz-game header-board">
          <div>
            <p>BAOQUIZ</p>
          </div>
          <div className="quiz-a">
            <Link to="/main" className="quiz-href" onClick={handleLeaveClick}>
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
            <h3>{decodedUser.fullname}</h3>
            <span>
              {Score > isOldScore ? (
                <span className="new-scores">
                  new! <span className="score-number">{Score}</span>
                </span>
              ) : (
                Score
              )}{" "}
              Point
            </span>
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
                  const incorrectQuestion = quizInCorrectQuestionIndexes
                    ? quizInCorrectQuestionIndexes.find(
                        (item) => item.index === index
                      )
                    : null;
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
                          : quizInCorrectQuestionIndexes === null
                          ? "10px solid white"
                          : "10px solid #22c55e",
                      }}
                    >
                      <h3>
                        {index + 1}. {question.title}
                      </h3>
                      <ul>
                        {question.options.map((option, optionIndex) => {
                          const isIncorrectOption =
                            isIncorrect && option === incorrectQuestion?.answer;

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
        <div className="rank-player">
          <div className="show-rank-area">
            <p>RANKING</p>
            {participants.map((participant, index) => (
              <div
                className="rank-area"
                style={{ border: "1px solid yellow" }}
                key={index}
              >
                <span>Player: {participant.fullname}</span>
                <span>Score: {participant.score}</span>
                <span>Time: {participant.times}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
