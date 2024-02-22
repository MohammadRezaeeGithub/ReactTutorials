import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const naviaget = useNavigate();

  function navigationHandler() {
    naviaget("/products");
  }
  return (
    <>
      <h1>Home</h1>
      <p>
        Go to <Link to="/products">the products page</Link>
      </p>

      <button onClick={navigationHandler}>Navigator</button>
    </>
  );
}
