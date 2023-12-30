import { useState } from "react";
import Input from "./Input";
import { useInput } from "../hooks/useInput";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";

export default function LoginState() {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [enteredValues, setEnteredValues] = useState({
  //   email: "",
  //   password: "",
  // });

  // //adding these states for validating on loosing Blur
  // const [didEdit, setDidEdit] = useState({
  //   email: false,
  //   password: false,
  // });
  const {
    value: emailValue,
    handleValuesChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => {
    //here instead of passing a function we could send an array and go through that array to check
    //....
    return isEmail(value) && isNotEmpty(value);
  });

  const {
    value: passwordValue,
    handleInputBlur: handlePasswordBlur,
    handleValuesChange: handlePasswordChange,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 6));

  //variable to show error message
  // const emailIsNotValid = didEdit.email && !enteredValues.email.includes("@");
  // const passwordIsInvalid =
  //   didEdit.password && enteredValues.password.trim().length < 6;

  function handleSubmit(event) {
    event.preventDefault();
    console.log(enteredValues);
  }

  // function handleValuesChange(identifier, value) {
  //   setEnteredValues((preState) => ({
  //     ...preState,
  //     [identifier]: value,
  //   }));
  //   //when user type again, removing the error message
  //   setDidEdit((prevEdit) => ({
  //     ...prevEdit,
  //     [identifier]: false,
  //   }));
  // }

  // function handleInputBlur(identifier) {
  //   setDidEdit((prevEdit) => ({
  //     ...prevEdit,
  //     [identifier]: true,
  //   }));
  // }

  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value);
  // }

  // function handlePasswordChange(event) {
  //   setEnteredPassword(event.target.value);
  // }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          error={emailHasError && "Please enter a valid email."}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          value={passwordValue}
          error={passwordHasError && "Please enter a valid password."}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
