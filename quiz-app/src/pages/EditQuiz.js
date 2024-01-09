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
import { error } from "jquery";
import { useEffect } from "react";

export default function EditQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const encodedUser = localStorage.getItem("user");
  const decodedUser = encodedUser ? JSON.parse(atob(encodedUser)) : null;
  const [selectedDifficulty, setSelectedDifficulty] = useState("0");
  const [questions, setQuestions] = useState([]);
  const [tempTitle, setTempTitle] = useState("");
  const [tempTopic, setTempTopic] = useState("");
  const [tempDes, setTempDes] = useState("Type description here");

  //fetch lay cac cau hoi tu map theo id user
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await createAPIEndpoint(ENDPOINTS.question).getbymap(
          id
        );
        const modifiedQuestions = response.data.map((question) => ({
          ...question,
          options: [question.oP1, question.oP2, question.oP3, question.oP4],
        }));
        setQuestions(modifiedQuestions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestions();
  }, []);

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
    id: id,
    title: "",
    topic: "",
    difficulty: "",
    description: "",
    createby: decodedUser.id,
    img: "/assets/img/quiz.png",
    status: 1,
  });

  const QuizTemp = () => {
    const MapTempAPI = createAPIEndpoint(ENDPOINTS.map);
    MapTempAPI.fetchById(id)
      .then((response) => {
        const data = response.data;
        const tempTitle = data.title;
        const tempTopic = data.topic;
        const tempDes = data.description;
        setTempTitle(tempTitle);
        setTempTopic(tempTopic);
        setTempDes(tempDes);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  QuizTemp();

  //submit edit
  const handlePublish = (id) => {
    const EditmapAPI = createAPIEndpoint(ENDPOINTS.map);
    EditmapAPI.put(id, quizData)
      .then((response) => {
        console.log("put complete");
        toast_success();
        navigate("/list");
      })
      .catch((error) => {
        console.log("put error");
        toast_error();
      });
  };

  //delete question
  const handleDeleteQuestion = (index) => {
    const delQuestAPI = createAPIEndpoint(ENDPOINTS.question);
    delQuestAPI
      .delete(index)
      .then((response) => {
        console.log("delete complete");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
  const handleChange = (e) => {
    const { id, value } = e.target;
    setQuizData((prevData) => ({
      ...prevData,
      [id]: value,
      difficulty: selectedDifficulty,
    }));
  };
  const handleEditCreate = (id) => {
    navigate(`/editcreate/${id}`);
  };
  const handleExit = () => {
    navigate("/list");
  };

  return (
    <div className="complete-container">
      <div className="complete-header">
        <span>BAOQUIZ</span>
        <div>
          <button onClick={handleExit}>Exit</button>
          <button onClick={() => handlePublish(id)}>Save</button>
        </div>
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
              <input
                id="title"
                onChange={handleChange}
                placeholder={tempTitle}
              ></input>
            </div>
            <div className="form-complete">
              <label htmlFor="topic">
                Topic <span>*</span>
              </label>
              <input
                id="topic"
                onChange={handleChange}
                placeholder={tempTopic}
              ></input>
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
                  placeholder={tempDes}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </form>
          <div className="question-overview-title">
            <p>Question OverView</p>
            <div className="plus-icon" onClick={() => handleEditCreate(id)}>
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
                  <span onClick={() => handleDeleteQuestion(question.id)}>
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
