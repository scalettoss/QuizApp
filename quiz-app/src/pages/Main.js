import React, { Fragment, useState } from "react";
import {
  CaretLeft,
  HouseSimple,
  ListDashes,
  Gear,
  Info,
  SignOut,
  ArrowFatLinesDown,
  HardDrives,
  Play,
} from "@phosphor-icons/react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ThreeDots } from "react-loader-spinner";
import { colors } from "@mui/material";

function Main() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSinglePlayClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/quiz");
    }, 2000);
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
                  <li className="active">
                    <a href="/#">
                      <HouseSimple size={20} />
                      <span className="text">Explore</span>
                    </a>
                  </li>
                  <li>
                    <a href="/#">
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
                alt=""
              />
              <div className="dropdown-menu" id="menu">
                <a href="/#">Name</a>
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
            <div className="card-game" onClick={handleOpen}>
              <div className="card-game-img">
                <img src="/assets/main_site/images/it.png"></img>
              </div>
              <div className="card-game-text">
                <span>10 Question</span>
                <p>Basic level of Programing Language</p>
              </div>
            </div>
          </div>

          {/* Modal */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="modal-box">
              <Typography>
                <div className="modal-title">
                  <img src="/assets/main_site/images/it.png"></img>
                  <span>10 Question</span>
                  <p>Basic level of Programing Language</p>
                </div>
                <div className="modal-hr"></div>
                <div className="modal-des">
                  <p>
                    Difficulty level: <span>EASY</span>
                  </p>
                  <h5>
                    Kiến thức cơ bản về các ngôn ngữ trong lập trình (python,
                    java, html, swift,...)Mỗi câu có 10 giây đếm ngược để trả
                    lời
                  </h5>
                </div>
                <div className="border-hr"></div>
                <div className="modal-button">
                  <button onClick={handleSinglePlayClick}>Single Play</button>
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
            </Box>
          </Modal>
        </div>
      </div>
    </Fragment>
  );
}
export default Main;
