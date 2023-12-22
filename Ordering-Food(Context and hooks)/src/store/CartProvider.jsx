import { useReducer } from "react";
import { CartContext } from "./cart-context.jsx";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

function cartReducer(state, action) {
  if (action.type === "ADD") {
    //anyway we must calculate the total amount even if the item exist
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    //we find the index of item if it exist
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    //we find the item itself with the help of index
    const existingCartItem = state.items[existingCartItemIndex];
    //now if the items exist, we update everything
    let updatedItems;
    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updateItem;
      //if the item does not exist we just add the item to the state(cart)
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  //now we check if the action is REMOVE
  if (action.type === "REMOVE") {
    //we find the index of item if it exist
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    //we find the item itself with the help of index
    const existingCartItem = state.items[existingCartItemIndex];
    //anyway we must calculate the total amount even if the item exist
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updateditem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updateditem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
}

export default function CartProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  function addItemToCartHandler(item) {
    dispatchCartAction({ type: "ADD", item: item });
  }

  function removeItemFromCartHnadler(id) {
    dispatchCartAction({ type: "REMOVE", id: id });
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHnadler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
