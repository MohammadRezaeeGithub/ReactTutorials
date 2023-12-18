import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  function handleShownCart() {
    setCartIsShown(true);
  }

  function handleHiddeCart() {
    setCartIsShown(false);
  }
  return (
    <>
      <CartProvider>
        <Cart showModal={cartIsShown} onClose={handleHiddeCart} />
        <Header onShowCart={handleShownCart} />
        <Meals />
      </CartProvider>
    </>
  );
}

export default App;
