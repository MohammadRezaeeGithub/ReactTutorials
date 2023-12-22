import { useCallback, useRef, useState } from "react";

import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  //based on the answered question we can figure out we should show which question, therefor we do not need use another state
  const activeQuestionIndex = userAnswers.length;

  //here we check if we answered all the questions
  const quizIsCompelete = activeQuestionIndex === QUESTIONS.length;

  //here we update the answered questions by user
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      //as soon as the user select an answer, we change the state of the answer
      //setAnswerState("answered");

      setUserAnswers((preState) => {
        //since we do not want to change original array, we made a new array and add the selected answer into it
        return [...preState, selectedAnswer];
      });

      // //after one second we will check if user selected the right answer or wrong
      // setTimeout(() => {
      //   if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
      //     setAnswerState("correct");
      //   } else {
      //     setAnswerState("wrong");
      //   }
      //   //for setting the answer state to zero, we use a nested timeout which start when the first one is finished
      //   setTimeout(() => {
      //     setAnswerState("");
      //   }, 2000);
      // }, 1000);
    },
    //here we do not use any depencies beacuse here we update the state and it does not depend on any state or object
    []
  );

  //FOR THE INFINITE LOUP RASON AND EXPLANATION THAT IS EXPLAINED IN QUESTIONTIMER COMPONENT,
  //WE USE USECALLBACK HOOK TO AVOID RE-CREATE THE FUNCITON
  //
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  //IF THE QUIZ IS COMPLETED, WE RETURN ANOTHER JSX COMPONENT
  if (quizIsCompelete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
