import React, { Fragment, useState, useEffect } from "react";
import {
  CaretLeft,
  HouseSimple,
  ListDashes,
  Gear,
  Info,
  SignOut,
  ArrowFatLinesDown,
  FilePlus,
  CirclesThreePlus,
} from "@phosphor-icons/react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ThreeDots } from "react-loader-spinner";
import createAPIEndpoint from "../API/api";
import { ENDPOINTS } from "../API/api";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import EditIcon from "@mui/icons-material/Edit";
import { CreateQuizModal } from "./CreateQuizModal";
import { color, style } from "@mui/system";

function Main() {
  const [user, setUser] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [selectedMap, setSelectedMap] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserInfo(token);
    }
  }, []);
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
  useEffect(() => {
    const fetchMap = async () => {
      try {
        const mapAPI = createAPIEndpoint(ENDPOINTS.map);
        const response = await mapAPI.getAvailableMap();
        console.log("Response from map endpoint:", response.data);
        setMapData(response.data);
      } catch (error) {
        console.error("Error fetching data from map endpoint:", error);
      }
    };

    fetchMap();
  }, []);

  const navigate = useNavigate();
  const [cardGameModalOpen, setCardGameModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleCardGameModalOpen = (mapId) => {
    const selectedMap = mapData.find((map) => map.id === mapId);
    setSelectedMap(selectedMap);
    setCardGameModalOpen(true);
    console.log(selectedMap);
  };

  const handleCardGameModalClose = () => {
    setCardGameModalOpen(false);
  };

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleSinglePlayClick = (mapId) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/quiz/${mapId}`); // Truyền mapId qua đường dẫn
    }, 2000);
  };

  const handleLogoutClick = () => {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      localStorage.removeItem(key);
    }
    navigate("/");
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
                  <li className="active">
                    <a href="/main">
                      <HouseSimple size={20} />
                      <span className="text">Explore</span>
                    </a>
                  </li>
                  <li>
                    <a href="/list">
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
                <a href="/#">{user ? user.fullname : "Chưa Đăng Nhập"}</a>
                <a href="/#">Cài đặt</a>
                <a href="/#">Đăng xuất</a>
              </div>
            </div>
          </div>
          <div className="room">
            <div className="room-position">
              <h3 className="text-room">CHƠI CÙNG BẠN BÈ! NHẬP MÃ CODE</h3>
              <div className="input-room">
                <input type="text" placeholder="Enter room code" />
                <button type="submit">PLAY</button>
              </div>
            </div>
          </div>
          <span className="play-text">Play Now</span>

          <ArrowFatLinesDown style={{ color: "green", fontSize: "20px" }} />
          <div className="card-game-area">
            {mapData &&
              mapData.map((map) => (
                <div
                  className="card-game"
                  onClick={() => handleCardGameModalOpen(map.id)}
                >
                  <div className="card-game-img">
                    <img src="/assets/img/quiz.png" alt="Error"></img>
                  </div>
                  <div className="card-game-text">
                    <p key={map.id}>{map.title}</p>
                  </div>
                </div>
              ))}
          </div>
          {/* Modal */}
          <Modal
            open={cardGameModalOpen}
            onClose={handleCardGameModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="modal-box">
              {selectedMap && (
                <Typography>
                  <div className="modal-title">
                    <img src={selectedMap.img} alt="Error"></img>
                    <span>Topic: {selectedMap.topic}</span>
                    <p>{selectedMap.title}</p>
                  </div>
                  <div className="modal-hr"></div>
                  <div className="modal-des">
                    <p>
                      Difficulty level:{" "}
                      <span
                        style={{
                          color:
                            selectedMap.difficulty == 0
                              ? "#22c55e"
                              : selectedMap.difficulty == 1
                              ? "yellow"
                              : "red",
                        }}
                      >
                        {selectedMap.difficulty == 0
                          ? "EASY"
                          : selectedMap.difficulty == 1
                          ? "MEDIUM"
                          : "HARD"}
                      </span>
                    </p>
                    <h5>{selectedMap.description}</h5>
                  </div>
                  <div className="border-hr"></div>
                  <div className="modal-button">
                    <button
                      onClick={() => handleSinglePlayClick(selectedMap.id)}
                    >
                      Single Play
                    </button>
                    <button>Host Play</button>
                  </div>
                  {isLoading && (
                    <div className="spinner-container">
                      <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#5b21b6"
                        ariaLabel="three-dots-loading"
                        visible={true}
                      />
                    </div>
                  )}
                </Typography>
              )}
            </Box>
          </Modal>
        </div>
      </div>
    </Fragment>
  );
}
export default Main;
