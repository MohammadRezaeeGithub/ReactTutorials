import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cart-action";

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  //to extract data from redux we use useSelector hooks
  //to use this hook we need to pass a function which recieves the state automatically
  //beacuse we put a map for the reducer in store/index.js we need to use the name which we put for the slice and then the property name
  const showCart = useSelector((state) => state.ui.cartVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  //the idea here is to write the codes with side effects.
  //beacause the store (redux reducer) must be pure without any codes with side effects
  //so here we check whenever the cart changes, we send a request to the server.
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    //if this is the first time this component is executed,
    //it has to return, otherwise it will re-write an emapty cart to the database and we lose all previous data.
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      //here we dispatch the action which we created in action creator thunks(cart-action file)
      dispatch(sendCartData(cart));
    }
    //here beacause we added the cart as dependencies, useEffect checks whenever it changes it will send the request.
    //this effect function reexecute whenever the cart changes.
    //on the other hand, we extract the cart using useSelector, so whenever the cart changes in store,it will change here as well.
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
