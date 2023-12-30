import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import LoginState from "./components/LoginState.jsx";
import Signup from "./components/Signup.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <LoginState />
        {/* <Signup /> */}
      </main>
    </>
  );
}

export default App;
