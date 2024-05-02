import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import { useState } from "react";
import QUESTION from "../questions.js";

export default function Question({ onSelectAnswer, onSkipAnswer, index }) {
  //we brought this state down here to manage the answers state here
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect) {
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    //we just add the selected answer and we have to wait acually one second to check if the answer is correct and change the state
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    //therefore here we set a timeout and after one second we check if the answer is correct
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTION[index].answers[0] === answer,
      });

      setTimeout(() => {
        //after all the process here we still need to tell the parent compnent about the answer user selected
        //therefore we call this function here
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  //we check this condition beacuse we don't want to show the answer right away
  //so we check if an answer is selected and isCorrect is not null
  //if it is null, it means we don't want yet show the correct answer
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      {/* here this component was a part of Quiz component and it is still a part fo this component and it does not updated when the Quiz component gets Re-rendered */}
      {/* for this reason we could add a key to the component. WHEN THE KEY CHANGES, DESTROY THE OLD ONE AND RE-CREATE THE NEW COMPONENT */}
      <QuestionTimer
        timeout={timer}
        onTimeOut={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTION[index].text}</h2>
      {/* using the KEY again to destroy and re-mount new component which leads to genereate new shuffle inside component */}
      <Answers
        answers={QUESTION[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
