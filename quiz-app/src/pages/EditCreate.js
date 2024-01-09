import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { PencilSimple, FileArrowUp } from "@phosphor-icons/react";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react";
import { Image } from "@phosphor-icons/react";
import { useState } from "react";
import { useEffect } from "react";
import createAPIEndpoint, { ENDPOINTS } from "../API/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 220,
  bgcolor: "#1e1f38",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
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
  toast.success("Save câu hỏi thành công", {
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

export default function () {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [questions, setQuestions] = useState([]);

  const { id } = useParams();
  const handleRadioChange = (index) => {
    setSelectedAnswer(index);
  };
  const encodedUser = localStorage.getItem("user");
  const decodedUser = encodedUser ? JSON.parse(atob(encodedUser)) : null;

  const handleCreateQuestion = () => {
    if (
      title.trim() === "" ||
      options.some((option) => option.trim() === "") ||
      selectedAnswer === null
    ) {
      toast_error();
      return;
    }
    const newQuestion = {
      title: title,
      OP1: options[0],
      OP2: options[1],
      OP3: options[2],
      OP4: options[3],
      answer: options[selectedAnswer],
      Img: "",
      CreateBy: decodedUser.id,
      CreateAt: new Date().toISOString(),
      MapId: id,
    };
    const AddQuestAPI = createAPIEndpoint(ENDPOINTS.question);
    AddQuestAPI.post(newQuestion)
      .then((res) => {
        console.log("post question by mapid complete", res.data);
        toast_success();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        toast_error();
      });
  };

  const handelComplete = (id) => {
    navigate(`/edit/${id}`);
  };
  const handleBackClick = () => {
    navigate("/list");
  };
  return (
    <Fragment>
      <div className="create-container">
        <div className="create-header">
          <a onClick={handleBackClick}>Back</a>
          <span>{questions.length + 1}</span>
          <button onClick={() => handelComplete(id)}>Next Step</button>
        </div>
        <div className="create-content">
          <div className="create-content-center">
            <div className="create-questions">
              <div className="create-img">
                <input type="file" accept="image/*" id="input-img"></input>
                <label htmlFor="input-img">
                  <Image size={32} style={{ color: "white" }} />
                  <p>Image</p>
                </label>
              </div>
              <div className="create-title">
                <input
                  type="text"
                  id="input-question"
                  placeholder="Type Question Here"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="create-answer-area">
              <div className="answers">
                <div className="answers-header">
                  <input
                    type="radio"
                    name="answers"
                    onChange={() => handleRadioChange(0)}
                  ></input>
                </div>
                <div className="answers-input">
                  <input
                    id="input-answer"
                    type="text"
                    placeholder="Type Answer Option Here"
                    value={options[0]}
                    onChange={(e) => {
                      const updatedOptions = [...options];
                      updatedOptions[0] = e.target.value;
                      setOptions(updatedOptions);
                    }}
                  ></input>
                </div>
              </div>
              <div className="answers">
                <div className="answers-header">
                  <input
                    type="radio"
                    name="answers"
                    onChange={() => handleRadioChange(1)}
                  ></input>
                </div>
                <div className="answers-input">
                  <input
                    id="input-answer"
                    type="text"
                    placeholder="Type Answer Option Here"
                    value={options[1]}
                    onChange={(e) => {
                      const updatedOptions = [...options];
                      updatedOptions[1] = e.target.value;
                      setOptions(updatedOptions);
                    }}
                  ></input>
                </div>
              </div>
              <div className="answers">
                <div className="answers-header">
                  <input
                    type="radio"
                    name="answers"
                    onChange={() => handleRadioChange(2)}
                  ></input>
                </div>
                <div className="answers-input">
                  <input
                    id="input-answer"
                    type="text"
                    placeholder="Type Answer Option Here"
                    value={options[2]}
                    onChange={(e) => {
                      const updatedOptions = [...options];
                      updatedOptions[2] = e.target.value;
                      setOptions(updatedOptions);
                    }}
                  ></input>
                </div>
              </div>
              <div className="answers">
                <div className="answers-header">
                  <input
                    type="radio"
                    name="answers"
                    onChange={() => handleRadioChange(3)}
                  ></input>
                </div>
                <div className="answers-input">
                  <input
                    id="input-answer"
                    type="text"
                    placeholder="Type Answer Option Here"
                    value={options[3]}
                    onChange={(e) => {
                      const updatedOptions = [...options];
                      updatedOptions[3] = e.target.value;
                      setOptions(updatedOptions);
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className="submit-create">
              <button onClick={handleCreateQuestion}>
                Create New Question
              </button>
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
    </Fragment>
  );
}
