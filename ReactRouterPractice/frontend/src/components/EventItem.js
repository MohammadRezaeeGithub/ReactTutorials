import { Link, useSubmit } from "react-router-dom";
import classes from "./EventItem.module.css";

function EventItem({ event }) {
  //we could use Form component around the button below but we wanted to programmatically do it
  //so we used useSubmit hook. in the function we pass the data (in this case null and the method)
  //it will passed the action method which we already defined in the router
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure you want delete it?");

    if (proceed) {
      submit(null, { method: "DELETE" });
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
