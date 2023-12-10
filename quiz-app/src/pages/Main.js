import React, { Fragment } from "react";
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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const handleSinglePlayClick = () => {
    navigate("/quiz");
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Fragment>
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          href="/assets/main_site/css/style.css"
        />
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
          <div className="Avaliable-game">
            <div className="card">
              <Card sx={{ maxWidth: 450 }}>
                <CardMedia
                  sx={{ height: 160 }}
                  image="/assets/main_site/images/img_for_quiz_game.png"
                  title="green iguana"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Chủ đề về lĩnh vực công nghệ thông tin
                  </Typography>
                </CardContent>
                <CardActions>
                  <div className="game-button">
                    <button
                      className="game-button-1"
                      onClick={handleSinglePlayClick}
                    >
                      Single Play <Play style={{ fontSize: "11px" }} />
                    </button>
                    <button className="game-button-2">
                      Host Play <HardDrives style={{ fontSize: "11px" }} />{" "}
                    </button>
                  </div>
                </CardActions>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Main;
