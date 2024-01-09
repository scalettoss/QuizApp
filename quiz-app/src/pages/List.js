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
  CirclesThreePlus,
  Trash,
  PencilSimple,
} from "@phosphor-icons/react";
import createAPIEndpoint from "../API/api";
import { ENDPOINTS } from "../API/api";
import { useNavigate } from "react-router-dom";
import { CreateQuizModal } from "./CreateQuizModal";
import { error } from "jquery";

function List() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [mapdata, setMapdata] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiEndpoint = createAPIEndpoint(ENDPOINTS.map);
        const response = await apiEndpoint.createBy(decodedUser.id);
        const responseData = response.data;
        console.log("List Map Post by UserId: ", responseData);
        setMapdata(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const encodedUser = localStorage.getItem("user");
  const decodedUser = encodedUser ? JSON.parse(atob(encodedUser)) : null;

  const handleLogoutClick = () => {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      localStorage.removeItem(key);
    }
    navigate("/");
  };
  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };
  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };
  const [difficulty, setDifficulty] = useState(""); // Add state for difficulty
  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };
  const handleCardClick = (eid) => {
    // navigate(`/complete/${eid}`)
  };

  const handleremoveMap = (id) => {
    const deletePartFromId = (id) => {
      const deletePartFromIds = createAPIEndpoint(ENDPOINTS.participant);
      deletePartFromIds
        .deletePartByMapUserId(id, decodedUser.id)
        .then(() => {
          console.log("Delete Participant Complete");
        })
        .catch((error) => {
          console.log("Delete Participant Fail");
        });
    };

    const deleteQuestionFromId = (id) => {
      const deleteQuestFromIDs = createAPIEndpoint(ENDPOINTS.question);
      deleteQuestFromIDs
        .deleteQuestByMapId(id)
        .then(() => {
          console.log("Delete Question Complete");
        })
        .catch((error) => {
          console.log("Delete Question Fail");
        });
    };

    const deleteMapFromId = (id) => {
      const deleteMapFromIds = createAPIEndpoint(ENDPOINTS.map);
      deleteMapFromIds
        .delete(id)
        .then(() => {
          console.log("Map deleted successfully");
          localStorage.removeItem("questions");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting map:", error);
        });
    };

    deletePartFromId(id);
    deleteQuestionFromId(id);
    deleteMapFromId(id);
  };
  const handleEditMap = (id) => {
    navigate(`/edit/${id}`);
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
                    <a href="#" onClick={handleOpenCreateModal}>
                      <CirclesThreePlus size={20} />
                      <span className="text">Create A Quiz</span>
                    </a>
                  </li>
                  <li>
                    <a href="/main">
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
                <CreateQuizModal
                  open={createModalOpen}
                  handleClose={handleCloseCreateModal}
                />
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
                <a href="/#">{decodedUser.fullname}</a>
                <a href="/#">Cài đặt</a>
                <a href="/#">Đăng xuất</a>
              </div>
            </div>
          </div>
          <div className="list-content">
            <div className="list-button">
              <span>Your Quiz Game is here</span>
            </div>
          </div>
          <div className="list-content-show">
            <span className="play-text">Your Game</span>
            <ArrowFatLinesDown style={{ color: "green", fontSize: "20px" }} />
            <div className="card-game-area-new">
              {mapdata.map((item, index) => (
                <div
                  className="card-game-new"
                  key={index}
                  onClick={() => handleCardClick(item.id)}
                >
                  <div className="game-icon">
                    <div
                      className="edit-icon"
                      onClick={() => handleEditMap(item.id)}
                    >
                      <PencilSimple size={15} />
                    </div>
                    <div
                      className="trash-icon"
                      onClick={() => handleremoveMap(item.id)}
                    >
                      <Trash size={15} />
                    </div>
                  </div>
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
