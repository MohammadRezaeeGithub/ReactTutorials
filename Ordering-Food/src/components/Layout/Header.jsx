import mealImg from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
import classes from "./header.module.css";

export default function Header() {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeal</h1>
        <HeaderCartButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImg} alt="Meals image" />
      </div>
    </>
  );
}
