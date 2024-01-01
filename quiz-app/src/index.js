import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import Quiz from "./pages/Quiz";
import Leader_boadrd from "./pages/Leader-board";
import QuizPage from "./pages/toast";
import List from "./pages/List";
import CreateQuizModal from "./pages/CreateQuizModal";
import Complete from "./pages/CompleteQuiz";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/" element={<Main />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/board" element={<Leader_boadrd />} />
      <Route path="/test" element={<QuizPage />} />
      <Route path="/list" element={<List />} />
      <Route path="/create" element={<CreateQuizModal />} />
      <Route path="/complete" element={<Complete />} />
    </Routes>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
