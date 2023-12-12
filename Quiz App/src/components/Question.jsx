import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import { useState } from "react";
import QUESTION from "../questions.js";

export default function Question({ onSelectAnswer, onSkipAnswer, index }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTION[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      {/* here this component was a part of Quiz component and it is still a part fo this component and it does not updated when the Quiz component gets Re-rendered */}
      {/* for this reason we could add a key to the component. WHEN THE KEY CHANGES, DESTROY THE OLD ONE AND RE-CREATE THE NEW COMPONENT */}
      <QuestionTimer timeout={10000} onTimeOut={onSkipAnswer} />
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
