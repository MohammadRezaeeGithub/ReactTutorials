import { useParams } from "react-router-dom";

export default function EventDetails() {
  const param = useParams();
  return (
    <>
      <h1>Event Details Page</h1>
      <p>Event ID: {param.eventId}</p>
    </>
  );
}
