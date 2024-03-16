import { json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

export async function loader() {
  //in the loader function we can not use any kind of react hooks
  //they are allowed to use only in the components
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    //....
    //return { isError: true, message: "Could not fetch data!" };
    //throw { message: "Could not fetch the data!" };
    // throw new Response(JSON.stringify({ message: "Could not fetch events!" }), {
    //   status: 500,    in this case react will execute the nearest error components in the router
    //for example if we could have an error component in the root, it will be execute whenever we have an error
    // }); on the other hand, in the component we can use useRouteError hook to use the information of this error
    return json({ message: "Could not fetch events!" }, { status: 500 });
  } else {
    // const resData = await response.json();
    // return resData.events;
    return response;
  }
}
