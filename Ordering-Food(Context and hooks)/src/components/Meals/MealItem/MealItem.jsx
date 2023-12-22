import classes from "./MealItem.module.css";
import MealitemFrom from "./MealItemForm";
import { CartContext } from "../../../store/cart-context.jsx";
import { useContext } from "react";

export default function MealItem({ name, price, description, id }) {
  const cartCtx = useContext(CartContext);

  const formattedprice = `$${price.toFixed(2)}`;

  function addToCartHandler(amount) {
    cartCtx.addItem({
      id: id,
      name: name,
      price: price,
      amount: amount,
    });
  }
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{formattedprice}</div>
      </div>
      <div>
        <MealitemFrom ide={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}
