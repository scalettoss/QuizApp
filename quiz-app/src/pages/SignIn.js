import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import createAPIEndpoint from "../API/api";
import { ENDPOINTS } from "../API/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userEndpoint = createAPIEndpoint(ENDPOINTS.user);
    const user = {
      email: email,
      password: password,
      FullName: "",
    };
    const toast_success = () => {
      toast.success("Đăng nhập thành công!", {
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
    const toast_error = () => {
      toast.error("Đăng nhập thất bại!", {
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

    userEndpoint
      .login(user)
      .then((response) => {
        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data);
        toast_success();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Login failed:", error);
        toast_error();
      });
  };
  return (
    <Fragment>
      <div
        style={{
          backgroundImage: "url(assets/img/figure/bg5-l.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "100% 100%",
        }}
        className="bg-fix"
      >
        <link
          rel="stylesheet"
          type="text/css"
          href="/assets/css/bootstrap.min.css"
        />
        <div id="wrapper" className="wrapper">
          <div className="fxt-template-layout5">
            <div
              className="fxt-bg-img fxt-none-767 bg-fix"
              data-bg-image="assets/img/figure/bg5-l.jpg"
            >
              <div className="fxt-intro">
                <div className="sub-title">Welcome To</div>
                <h1>Quiz</h1>
                <p>
                  Grursus mal suada faci lisis Lorem ipsum dolarorit ametion
                  consectetur elit. Vesti ulum nec the dumm.
                </p>
              </div>
            </div>
            <div className="fxt-bg-color">
              <div className="fxt-header">
                <Link to="/login" className="fxt-logo"></Link>
                <p>BAOQUIZ</p>
                <div className="fxt-page-switcher">
                  <Link
                    to="/login"
                    className="switcher-text switcher-text1 active"
                  >
                    Login
                  </Link>
                  <Link to="/register" className="switcher-text switcher-text2">
                    Register
                  </Link>
                </div>
              </div>
              <div className="fxt-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group fxt-transformY-50 fxt-transition-delay-1">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email Address"
                      required="required"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <i className="flaticon-envelope"></i>
                  </div>
                  <div className="form-group fxt-transformY-50 fxt-transition-delay-2">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      required="required"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <i className="flaticon-padlock"></i>
                    <Link to="/forgot" className="switcher-text3">
                      Forgot Password
                    </Link>
                  </div>
                  <div className="form-group fxt-transformY-50 fxt-transition-delay-3">
                    <div className="fxt-content-between">
                      <button type="submit" className="fxt-btn-fill">
                        Log in
                      </button>
                      <ToastContainer
                        position="bottom-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                      />
                      <div className="checkbox">
                        <input id="checkbox1" type="checkbox" />
                        <label htmlFor="checkbox1">Keep me logged in</label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="fxt-footer">
                <ul className="fxt-socials">
                  <li className="fxt-facebook fxt-transformY-50 fxt-transition-delay-5">
                    <a href="/#" title="Facebook">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="fxt-twitter fxt-transformY-50 fxt-transition-delay-6">
                    <a href="/#" title="twitter">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li className="fxt-google fxt-transformY-50 fxt-transition-delay-7">
                    <a href="/#" title="google">
                      <i className="fab fa-google-plus-g"></i>
                    </a>
                  </li>
                  <li className="fxt-linkedin fxt-transformY-50 fxt-transition-delay-8">
                    <a href="/#" title="linkedin">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li className="fxt-pinterest fxt-transformY-50 fxt-transition-delay-9">
                    <a href="/#" title="pinterest">
                      <i className="fab fa-pinterest-p"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default SignIn;
