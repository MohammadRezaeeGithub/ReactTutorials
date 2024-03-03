import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function EditEvent() {
  const data = useRouteLoaderData("event-detailed");
  const event = data.event;

  return <EventForm event={event} />;
}
