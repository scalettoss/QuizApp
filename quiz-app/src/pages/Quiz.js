import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import createAPIEndpoint from "../API/api";
import { ENDPOINTS } from "../API/api";
import { Link } from "react-router-dom";
import CorrectSound from "../mp3/correct.mp3";
import IncorrectSound from "../mp3/incorrect.mp3";
import TimeRemain from "../mp3/timeremains.mp3";
import { Alarm } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(9);
  const [tempScore, setTempScore] = useState(0);
  const correctAudio = new Audio(CorrectSound);
  const incorrectAudio = new Audio(IncorrectSound);
  const timeremain = new Audio(TimeRemain);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let fetchedQuestions = [];
        const storedQuestions = localStorage.getItem("quizQuestions");
        const storedScore = localStorage.getItem("quizScore");
        const storedCurrentQuestionIndex = localStorage.getItem(
          "quizCurrentQuestionIndex"
        );
        const storedTimeRemaining = localStorage.getItem("quizTimeRemaining");

        if (
          storedQuestions &&
          storedScore &&
          storedCurrentQuestionIndex &&
          storedTimeRemaining
        ) {
          fetchedQuestions = JSON.parse(storedQuestions);
          setScore(parseInt(storedScore));
          setCurrentQuestionIndex(parseInt(storedCurrentQuestionIndex));
          setTimeRemaining(parseInt(storedTimeRemaining));
        } else {
          const response = await createAPIEndpoint(ENDPOINTS.question).fetch();
          fetchedQuestions = response.data;
          fetchedQuestions.forEach((question) => {
            question.options = shuffleOptions(question.options);
          });
          localStorage.setItem(
            "quizQuestions",
            JSON.stringify(fetchedQuestions)
          );

          localStorage.setItem("quizScore", "0");
          localStorage.setItem("quizCurrentQuestionIndex", "0");
          localStorage.setItem("quizTimeRemaining", "10");
        }

        setQuestions(fetchedQuestions);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    // Lưu trữ số điểm và vị trí hiện tại vào Local Storage
    localStorage.setItem("quizScore", score.toString());
    localStorage.setItem(
      "quizCurrentQuestionIndex",
      currentQuestionIndex.toString()
    );
  }, [score, currentQuestionIndex]);
  useEffect(() => {
    // Lưu trữ giá trị timeRemaining vào Local Storage
    localStorage.setItem("quizTimeRemaining", timeRemaining.toString());
  }, [timeRemaining]);

  useEffect(() => {
    // Đếm ngược thời gian
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);
    // if (timeRemaining === 4) {
    //   // timeremain.play();
    // }
    if (timeRemaining === 0) {
      handleOptionClick(""); // Xử lý không chọn đáp án khi hết thời gian
    }
    // Dọn dẹp timer khi component unmount
    return () => clearInterval(timer);
  }, [timeRemaining]);
  useEffect(() => {
    // Reset timeRemaining to 10 when currentQuestionIndex changes
    setTimeRemaining(10);
  }, [currentQuestionIndex]);

  const handleOptionClick = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    let updatedScore = score;

    if (selectedAnswer === currentQuestion.answer) {
      if (timeRemaining >= 8) {
        updatedScore = score + 100;
        setTempScore(100);
      } else {
        const timeElapsed = 8 - timeRemaining;
        updatedScore = score + (100 - timeElapsed * 10);
        setTempScore(100 - timeElapsed * 10);
      }

      setIsCorrect(true);
      correctAudio.play();
    } else {
      const storedIndexes = localStorage.getItem(
        "quizIncorrectQuestionIndexes"
      );
      const incorrectQuestionIndexes = storedIndexes
        ? JSON.parse(storedIndexes)
        : [];

      // Thêm vị trí và đáp án sai vào mảng incorrectQuestionIndexes
      incorrectQuestionIndexes.push({
        index: currentQuestionIndex,
        answer: selectedAnswer,
      });

      localStorage.setItem(
        "quizIncorrectQuestionIndexes",
        JSON.stringify(incorrectQuestionIndexes)
      );

      setIsCorrect(false);
      incorrectAudio.play();
    }

    setScore(updatedScore);
    setSelectedAnswer(selectedAnswer);
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer("");
        setShowResult(false);
        setIsCorrect(false);
      } else {
        navigate("/board");
      }
    }, 1000);
  };

  const shuffleOptions = (options) => {
    const shuffledOptions = [...options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [
        shuffledOptions[j],
        shuffledOptions[i],
      ];
    }
    return shuffledOptions;
  };

  const handleLeaveClick = () => {
    const token = localStorage.getItem("token"); // Giữ lại mục "token"

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

  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const currentOptions = currentQuestion.options;
  return (
    <div className="quiz-game">
      <div className="header-quiz-game">
        <div>
          <p>BAOQUIZ</p>
        </div>
        <div className="currentQ-btn">
          <span>Number: {currentQuestionIndex + 1}</span>
        </div>
        <div className="currentQ-btn">
          <Alarm size={30} />
          <span>{timeRemaining}</span>
        </div>
        <div>
          <span className="quiz-quest-icon">{questions.length} Question</span>
        </div>
        <div className="quiz-a">
          <Link to="/" className="quiz-href" onClick={handleLeaveClick}>
            LEAVE
          </Link>
        </div>
      </div>
      <div className="content-quiz-game">
        <div className="content-layout1">
          <div className="quiz-question">
            <span className="quiz-question-title">{currentQuestion.title}</span>
          </div>
          <div className="quiz-submit-button">
            {currentOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                disabled={selectedAnswer !== "" || showResult}
                className={
                  selectedAnswer === option
                    ? isCorrect
                      ? "selected correct"
                      : "selected incorrect"
                    : ""
                }
              >
                {option}
              </button>
            ))}
          </div>
          {showResult && (
            <div
              className={`quiz-game-check ${
                isCorrect ? "correct" : "incorrect"
              }`}
            >
              <span>
                {isCorrect
                  ? "+" + tempScore.toString() + " Point"
                  : "INCORRECT"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Quiz;
