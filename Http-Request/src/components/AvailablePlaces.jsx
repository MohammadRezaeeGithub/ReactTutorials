import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    //here we use the useEffect beacuse if use this operation out of useEffect,it makes infinite loop
    //we can not add ASYNC to the functional components
    //we can not use async for the function that we pass to useEffect
    //we could use either FETCH and THENS or the operation below
    async function fetchPlaces() {
      setIsFetching(true);
      //for any reason we might not be able to fetch data and we need to handle it
      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        //in this part we handle the error which in React application mean we need to change the UI
        setError({
          message:
            error.message ||
            "Could not fetch places. Please try it again later",
        });
        setIsFetching(false);
      }
    }
    //outside of the function we defined, we call it beacuse we never called it.
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occured" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data ..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
