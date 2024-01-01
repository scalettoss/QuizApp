import React from "react";
import { Trash, X } from "@phosphor-icons/react";
export default function Complete() {
  return (
    <div className="complete-container">
      <div className="complete-header">
        <span>BAOQUIZ</span>
        <button>Publish</button>
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
              <input id="title"></input>
            </div>
            <div className="form-complete">
              <label htmlFor="topic">
                Topic <span>*</span>
              </label>
              <input id="topic"></input>
            </div>
            <div className="form-complete">
              <label htmlFor="diff">
                Difficulty level <span>*</span>
              </label>
              <select className="diff-options">
                <option value="0">EASY</option>
                <option value="1">MEDIUM</option>
                <option value="2">HARD</option>
              </select>
            </div>
            <div className="quiz-img">
              <img src="/assets/img/quiz.png"></img>
              <label htmlFor="quiz-imgs" id="changes-lable">
                Change Image
              </label>
              <input type="file" accept="image/*" id="quiz-imgs"></input>
              <div className="quiz-des">
                <label htmlFor="Description">
                  Description <span>*</span>
                </label>
                <input
                  id="Description"
                  placeholder="Type description here"
                ></input>
              </div>
            </div>
          </form>
          <p id="p-hr">Question OverView</p>
          <div className="question-view">
            <div className="overview">
              <span>STT</span>
              <span>
                <Trash size={20} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
