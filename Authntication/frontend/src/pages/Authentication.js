import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  //we need to access the search params to see if we want to signup or signIn
  //to get access to the searchParams
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  // if (mode !== "signup" && mode !== "login") {
  //   throw json({ message: "Unsupported mode" }, { status: 422 });
  // }

  //getting the form data
  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not athenticate user" }, { status: 500 });
  }

  //getting the token from the response and save it in the localstorage
  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);

  return redirect("/");
}
