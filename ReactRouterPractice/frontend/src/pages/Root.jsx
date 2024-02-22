import MainNavigation from "../components/MainNavigation.js";
import { Outlet, useNavigation } from "react-router-dom";

export default function Root() {
  //const navigation = useNavigation();
  return (
    <>
      <MainNavigation />
      {/* {navigation.state === "loading" && <p>Loading...</p>} */}
      <Outlet />
    </>
  );
}
