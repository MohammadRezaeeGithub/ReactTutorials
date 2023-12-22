import logoImage from "../assets/quiz-complete.png";

export default function Header() {
  return (
    <header>
      <img src={logoImage} alt="Quiz Logo" />
      <h1>ReactQuiz</h1>
    </header>
  );
}
