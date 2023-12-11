import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

export default function Question({
  questionText,
  answers,
  onSelectAnswer,
  selectedAnswer,
  answerState,
  onSkipAnswer,
}) {
  return (
    <div id="question">
      {/* here this component was a part of Quiz component and it is still a part fo this component and it does not updated when the Quiz component gets Re-rendered */}
      {/* for this reason we could add a key to the component. WHEN THE KEY CHANGES, DESTROY THE OLD ONE AND RE-CREATE THE NEW COMPONENT */}
      <QuestionTimer timeout={10000} onTimeOut={onSkipAnswer} />
      <h2>{questionText}</h2>
      {/* using the KEY again to destroy and re-mount new component which leads to genereate new shuffle inside component */}
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
}
