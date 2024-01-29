import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../store/counter";
import classes from "./Counter.module.css";

const Counter = () => {
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);
  const dispatch = useDispatch();

  const toggleCounterHandler = () => {
    //dispatch({ type: "toggle" });
    dispatch(counterActions.toggle());
  };

  const increamentHandler = () => {
    //dispatch({ type: "increament" });
    dispatch(counterActions.increament());
  };

  const increaseHandler = () => {
    //dispatch({ type: "increase", amount: 5 });
    dispatch(counterActions.increase(10)); //{ type: UNIQUE_IDENRIFIER_ID, payload:10}
  };

  const decreamentHandler = () => {
    //dispatch({ type: "decreament" });
    dispatch(counterActions.decreament());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}

      <div>
        <button onClick={increamentHandler}>Increament</button>
        <button onClick={increaseHandler}>Increament by 5</button>
        <button onClick={decreamentHandler}>Decreament</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
