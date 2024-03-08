import {
  useActionData,
  useNavigate,
  useNavigation,
  redirect,
  json,
} from "react-router-dom";
import { Form } from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  //to use the data which is returned by action method like the useLoaderData hook
  //it gives us the access to the closest action method data
  const actionData = useActionData();

  const navigate = useNavigate();

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }
  //in this form each field shold have a name attribute and we have to use Form component
  //in this way, all the data wiil be send to the ACTION method which we already defined in the router
  //another way to submit the data is to add the ACTION attribute to the form and set any action in any other routes

  return (
    <Form method={method} className={classes.form}>
      {actionData && actionData.errors && (
        <ul>
          {Object.values(actionData.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "http://localhost:8080/events";

  if (method === "PATCH") {
    const eventID = params.eventId;

    url = "http://localhost:8080/events/" + eventID;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  //before sending our default response we chech the errors that we sent from the backend
  if (response.status === "422") {
    //we check if there is a error like this(validation error) we return the response itself
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save the events" }, { status: 500 });
  }

  return redirect("/events");
}
