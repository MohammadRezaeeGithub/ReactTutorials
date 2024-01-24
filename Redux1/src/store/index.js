import redux, { createStore } from "redux";

const conterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increament") {
    return {
      counter: state.counter + 1,
    };
  }
  if (action.type === "increase") {
    return {
      counter: state.counter + action.amount,
    };
  }
  if (action.type === "decreament") {
    return {
      counter: state.counter - 1,
    };
  }
  return state;
};

const store = createStore(conterReducer);

export default store;
