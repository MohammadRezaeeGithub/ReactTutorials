import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  //we need to shuffle once and it should not be shuffeled each time component get updated
  //then we can use USEREF which is used to connect an html element or
  //TO STORE A VALUE WHICH WILL NOT BE CHANGED IF COMPONENT GETS RE-RENDERED
  const shuffledAnswers = useRef();

  //we chech if shuffeled is undefined
  if (!shuffledAnswers.current) {
    //WE BROUGHT THIS PART OF CODE HERE BECAUSE IF GAME IS NOT COMPLETED, THEN WE NEED TO SHUFFLE THE ANSWERS
    //AND IF WE HAD ALREADY ANSERED ALL THE QUESTION, THIS PART OF CODE SHOULD NOT BE ANSWERED
    //shuffling the answers  while we don't change the original array
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = "";
        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }
        return (
          <li key={answer} className="answer">
            <button onClick={() => onSelect(answer)} className={cssClass}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
