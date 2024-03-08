import {
  json,
  redirect,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";

export default function EventDetails() {
  const data = useRouteLoaderData("event-detailed");
  return <EventItem event={data.event} />;
}

export async function loader({ request, params }) {
  const id = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    return json(
      { message: "Could not fetch details for this event" },
      { status: 500 }
    );
  } else {
    return response;
  }
}

export async function action({ params, request }) {
  const eventId = params.eventId;

  //here we could use the method we already defined in the eventItem component or manually set it to delete
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    return json({ message: "Could not delete this event" }, { status: 500 });
  }

  return redirect("/events");
}
