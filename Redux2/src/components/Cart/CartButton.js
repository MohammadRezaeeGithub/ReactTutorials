import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import { uiActions } from "../../store/ui-slice";

const CartButton = (props) => {
  const dispatch = useDispatch();
  //to extract data from the store we use useSelector hook
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  //to toggle this butotn and show or hide the cart we need to call the toggle function from ui-slice.js
  //for that we import uiActions which we imported from ui-slice.js
  //and using dispatch function from useDispatch hooks, we dispatch this action.
  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
