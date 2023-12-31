import React from "react";
import { Trash } from "@phosphor-icons/react";
import { useState } from "react";
import createAPIEndpoint from "../API/api";
import { ENDPOINTS } from "../API/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus } from "@phosphor-icons/react";
export default function Complete() {
  const { eid } = useParams();
  const navigate = useNavigate();
  const encodedUser = localStorage.getItem("user");
  const decodedUser = encodedUser ? JSON.parse(atob(encodedUser)) : null;
  const [selectedDifficulty, setSelectedDifficulty] = useState("0");
  const [questions, setQuestions] = useState(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions"));
    return storedQuestions ? storedQuestions : [];
  });
  const toast_error = () => {
    toast.error("Không được để trống", {
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const toast_success = () => {
    toast.success("Save thành công", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const [quizData, setQuizData] = useState({
    title: "",
    topic: "",
    difficulty: "",
    description: "",
    createby: decodedUser.id,
    img: "/assets/img/quiz.png",
    status: 1,
  });

  const handleStatusChange = (event) => {
    const { checked } = event.target;
    const newStatus = checked ? 2 : 1;
    setQuizData((prevData) => ({
      ...prevData,
      status: newStatus,
    }));
  };
  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };
  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };
  const handlePublish = () => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions"));
    // Gửi quizData đến ENDPOINT.map để lấy mapid
    const api = createAPIEndpoint(ENDPOINTS.map);
    api
      .post(quizData)
      .then((response) => {
        const mapid = response.data.id;
        console.log("Quiz Data posted successfully:", response.data);
        const questApi = createAPIEndpoint(ENDPOINTS.question);
        // Gửi từng đối tượng question một cách tuần tự
        const sendQuestion = (index, mapid) => {
          if (index >= storedQuestions.length) {
            console.log("All questions posted successfully");
            return;
          }
          const question = storedQuestions[index];
          const questData = {
            img: "/assets/img/quiz.png",
            title: question.title,
            oP1: question.options[0],
            oP2: question.options[1],
            oP3: question.options[2],
            oP4: question.options[3],
            answer: question.answer,
            createAt: new Date().toISOString(),
            createBy: decodedUser.id,
            MapId: mapid,
          };
          questApi
            .post(questData)
            .then((response) => {
              console.log("Question Data posted successfully:", response.data);
              sendQuestion(index + 1, mapid); // Gửi đối tượng question tiếp theo với cùng mapid
            })
            .catch((error) => {
              console.error("Error posting question data:", error);
              console.log(questData);
            });
        };
        sendQuestion(0, mapid);
        toast_success();
        localStorage.removeItem("questions");
        navigate("/list");
      })
      .catch((error) => {
        console.error("Error posting data:", error);
        toast_error();
      });
  };

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
  const handleChange = (e) => {
    const { id, value } = e.target;
    setQuizData((prevData) => ({
      ...prevData,
      [id]: value,
      difficulty: selectedDifficulty,
    }));
  };
  const handleCreateQuiz = () => {
    navigate("/create");
  };
  return (
    <div className="complete-container">
      <div className="complete-header">
        <span>BAOQUIZ</span>
        <button onClick={handlePublish}>Publish</button>
      </div>
      <div className="complete-content">
        <div className="comp-title">
          <p>FINAL STEP: COMPLETE YOUR QUIZ</p>
        </div>
        <div className="quiz-setting">
          <p>Quiz Setting</p>
          <form className="form-c">
            <div className="form-complete">
              <label htmlFor="title">
                Name of Quiz <span>*</span>
              </label>
              <input id="title" onChange={handleChange}></input>
            </div>
            <div className="form-complete">
              <label htmlFor="topic">
                Topic <span>*</span>
              </label>
              <input id="topic" onChange={handleChange}></input>
            </div>
            <div className="form-complete">
              <label htmlFor="diff">
                Difficulty level <span>*</span>
              </label>
              <select
                className="diff-options"
                onChange={handleDifficultyChange}
              >
                <option value="0">EASY</option>
                <option value="1">MEDIUM</option>
                <option value="2">HARD</option>
              </select>
            </div>
            <div className="form-complete">
              <div className="radio-status">
                <label htmlFor="status">Public</label>
                <input
                  type="checkbox"
                  name="status-check"
                  id="status"
                  onChange={handleStatusChange}
                ></input>
              </div>
            </div>
            <div className="quiz-img">
              <img src="/assets/img/quiz.png"></img>
              <label htmlFor="quiz-imgs" id="changes-lable">
                Change Image
              </label>
              <input type="file" accept="image/*" id="quiz-imgs"></input>
              <div className="quiz-des">
                <label htmlFor="description">
                  Description <span>*</span>
                </label>
                <input
                  id="description"
                  placeholder="Type description here"
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </form>
          <div className="question-overview-title">
            <p>Question OverView</p>
            <div className="plus-icon" onClick={handleCreateQuiz}>
              <Plus size={25} />
            </div>
          </div>
          <div>
            {questions.map((question, index) => (
              <div className="question-view" key={index}>
                <div className="overview">
                  <span>
                    {index + 1}.{question.title}
                  </span>
                  {question.options.map((option, optionIndex) => (
                    <span
                      key={optionIndex}
                      style={{
                        color: option === question.answer ? "#22c55e" : "white",
                      }}
                    >
                      {option}
                    </span>
                  ))}
                  <span onClick={() => handleDeleteQuestion(index)}>
                    <Trash size={20} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
      <ToastContainer
        position="top-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </div>
  );
}
