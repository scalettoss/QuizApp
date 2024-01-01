import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  CaretLeft,
  HouseSimple,
  ListDashes,
  Gear,
  Info,
  SignOut,
  ArrowFatLinesDown,
} from "@phosphor-icons/react";
import createAPIEndpoint from "../API/api";
import { ENDPOINTS } from "../API/api";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

function List() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [mapdata, setMapdata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiEndpoint = createAPIEndpoint(ENDPOINTS.map);
        const response = await apiEndpoint.createBy(decodedUser.id);
        const responseData = response.data;
        console.log(responseData);
        setMapdata(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserInfo(token);
    }
  }, []);

  const encodedUser = localStorage.getItem("user");
  const decodedUser = encodedUser ? JSON.parse(atob(encodedUser)) : null;
  const fetchUserInfo = (token) => {
    const api = createAPIEndpoint(ENDPOINTS.user);
    api
      .userinfo(token)
      .then((response) => {
        setUser(response.data);
        const encodedUser = btoa(JSON.stringify(response.data));
        localStorage.setItem("user", encodedUser);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogoutClick = () => {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      localStorage.removeItem(key);
    }
    navigate("/login");
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };
  const handleDesChange = (event) => {
    setDes(event.target.value);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      const reader = new FileReader();
      reader.onload = (x) => {
        setImgURL(x.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [difficulty, setDifficulty] = useState(""); // Add state for difficulty
  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };
  const [imgURL, setImgURL] = useState(null);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [des, setDes] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitForm = (event) => {
    event.preventDefault();
    const data = {
      CreateBy: decodedUser.id,
      title: title,
      description: des,
      difficulty: difficulty || "0",
      topic: topic,
      status: 1,
      img: "/assets/main_site/images/it.png",
    };
    console.log(data);
    const api = createAPIEndpoint(ENDPOINTS.map);
    api
      .post(data)
      .then((response) => {
        console.log("Form submitted successfully!", response.data);
        setTitle("");
        setDes("");
        setDifficulty("");
        setTopic("");
        setImgURL(null);
      })
      .catch((error) => {
        console.error("Error submitting the form:", error);
      });
  };

  return (
    <Fragment>
      <Helmet>
        <script src="assets/main_site/js/script.js"></script>
      </Helmet>
      <div className="my_container">
        <div className="">
          <div className="sidebar">
            <div className="menu-btn">
              <CaretLeft size={20} />
            </div>
            <div className="head">
              <div className="user-img">
                <img src="user.jpg" alt="" />
              </div>
              <div className="user-details">
                <p className="title">BaoQuiz</p>
                <p className="name">Power by Bao</p>
              </div>
            </div>
            <div className="nav">
              <div className="menu">
                <p className="title">Main</p>
                <ul>
                  <li>
                    <a href="/#">
                      <HouseSimple size={20} />
                      <span className="text">Explore</span>
                    </a>
                  </li>
                  <li className="active">
                    <a>
                      <ListDashes size={20} />
                      <span className="text">List</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="menu">
                <p className="title">Settings</p>
                <ul>
                  <li>
                    <a href="/#">
                      <Gear size={20} />
                      <span className="text">Settings</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="menu">
              <p className="title">Account</p>
              <ul>
                <li>
                  <a href="/#">
                    <Info size={20} />
                    <span className="text">Help</span>
                  </a>
                </li>
                <li>
                  <a onClick={handleLogoutClick}>
                    <SignOut size={20} />
                    <span className="text">Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header-content">
            <div className="header-user">
              <img
                src="/assets/main_site/images/snapedit_1701926027907.png"
                id="user-img"
                alt="Error"
              />
              <div className="dropdown-menu" id="menu">
                <a href="/#">{user ? user.fullname : "Chưa Đăng Nhập"}</a>
                <a href="/#">Cài đặt</a>
                <a href="/#">Đăng xuất</a>
              </div>
            </div>
          </div>
          <div className="list-content">
            <div className="list-button">
              <span>Create a Quiz Game</span>
              <button onClick={handleOpen}>Create</button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box>
                  <Typography>
                    <div className="modal-create">
                      <div className="create-form-show">
                        <h5>Review</h5>
                        <div className="card-game-2">
                          <div className="card-game-img-2">
                            <img
                              src={
                                imgURL
                                  ? imgURL
                                  : "/assets/main_site/images/it.png"
                              }
                              alt="Preview"
                            />
                          </div>
                          <div className="card-game-text-2">
                            <span>{topic ? topic : "Topic"}</span>
                            <span>{title ? title : "Title"}</span>
                            <span>{des ? des : "Description"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="create-form">
                        <form onSubmit={submitForm}>
                          <div className="forms">
                            <h3>Create a Quiz Map</h3>
                            <lable className="lable-form">
                              Title <span>*</span>
                            </lable>
                            <input
                              type="text"
                              id="title-input"
                              onChange={handleTitleChange}
                            />
                            <lable className="lable-form">
                              Description <span>*</span>
                            </lable>
                            <input
                              type="text"
                              onChange={handleDesChange}
                            ></input>
                            <lable className="lable-form">
                              Difficulty <span>*</span>
                            </lable>
                            <select
                              value={difficulty}
                              onChange={handleDifficultyChange}
                            >
                              <option value="0">EASY</option>
                              <option value="1">MEDIUM</option>
                              <option value="2">HARD</option>
                            </select>
                            <lable className="lable-form">
                              Topic <span>*</span>
                            </lable>
                            <input
                              type="text"
                              onChange={handleTopicChange}
                            ></input>
                            <lable className="lable-form">
                              Img <span>*</span>
                            </lable>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                            ></input>
                          </div>
                          <div className="submit-btn">
                            <button type="submit">Generate</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Typography>
                </Box>
              </Modal>
            </div>
          </div>
          <div className="list-content-show">
            <span className="play-text">Your Game</span>
            <ArrowFatLinesDown style={{ color: "green", fontSize: "20px" }} />
            <div className="card-game-area-new">
              {mapdata.map((item, index) => (
                <div className="card-game-new" key={index}>
                  <div className="card-game-img">
                    <img src={item.img} alt="Error" />
                  </div>
                  <div className="card-game-text-2">
                    <div className="topic-dif">
                      <span>{item.topic}</span>
                      <span
                        style={{
                          color:
                            item.difficulty == 0
                              ? "#22c55e"
                              : item.difficulty == 1
                              ? "yellow"
                              : "red",
                        }}
                      >
                        {item.difficulty == 0
                          ? "EASY"
                          : item.difficulty == 1
                          ? "MEDIUM"
                          : "HARD"}
                      </span>
                    </div>
                    <span>{item.title}</span>
                    <span>{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default List;
