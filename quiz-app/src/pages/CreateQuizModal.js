import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { PencilSimple, FileArrowUp } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Image } from "@phosphor-icons/react";
import { useState } from "react";
import { useEffect } from "react";

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

function CreateQuizModal({ open, handleClose }) {
  const navigate = useNavigate();
  const redirectToCreatePage = () => {
    navigate("/create");
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "gray",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography>
            <div className="create-modal-area">
              <p>Create A Quiz</p>
              <button onClick={redirectToCreatePage}>
                Create Manual <PencilSimple size={15} />
              </button>
              <button>
                Import Json <FileArrowUp size={15} />
              </button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
export { CreateQuizModal };

export default function CreateQuiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Retrieve questions from localStorage
    const savedQuestions = localStorage.getItem("questions");
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  useEffect(() => {
    // Update localStorage when questions change
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);
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
      alert("Không được bỏ trống");
      return;
    }
    const newQuestion = {
      index: questions.length + 1,
      title: title,
      options: options,
      answer: options[selectedAnswer],
      Img: "",
      CreateBy: decodedUser.id,
      CreateAt: new Date().toISOString(),
    };

    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    alert("Câu hỏi đã được lưu");
    setTitle("");
    setOptions(["", "", "", ""]);
    setSelectedAnswer("");
  };
  const handelComplete = () => {
    navigate("/complete");
  };

  return (
    <Fragment>
      <div className="create-container">
        <div className="create-header">
          <a>Back</a>
          <span>{questions.length + 1}</span>
          <button onClick={handelComplete}>Complete</button>
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
      </div>
    </Fragment>
  );
}
