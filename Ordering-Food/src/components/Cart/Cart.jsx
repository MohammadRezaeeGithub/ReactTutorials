import { useContext, useEffect, useRef } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import { CartContext } from "../../store/cart-context.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart({ showModal, onClose }) {
  const cartCtx = useContext(CartContext);
  const modalRef = useRef();

  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const cartHasItems = cartCtx.items.length > 0;

  function cartItemRemoveHandler(id) {
    cartCtx.removeItem(id);
  }

  function cartItemAddHandler(item) {
    cartCtx.addItem({ ...item, amount: 1 });
  }

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      id={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
      onRemove={cartItemRemoveHandler}
      onAdd={cartItemAddHandler}
    />
  ));

  if (showModal) {
    modalRef.current.open();
  }

  function closeModal() {
    modalRef.current.close();
    onClose();
  }

  return (
    <Modal ref={modalRef}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={closeModal}>
          Close
        </button>
        {cartHasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}
