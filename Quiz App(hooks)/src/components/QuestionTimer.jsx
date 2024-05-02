import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeOut, mode }) {
  //to update this progress bar we define a state
  const [reaminigTime, setRemainingTime] = useState(timeout);

  //here we set a timeout and we recieve the time and the function that should be executed to the parent component
  //WE NEED TO USE **USEEFFECT** FOR THIS CASE AS WELL, BEACUASE EACH TIME THE COMPONENT REXCUTED, A NEW TIMER WILL BE SET AND
  //WE WILL HAVE LOTS OF TIMERE
  useEffect(() => {
    console.log("SETTING TIMEOUT");
    const timer = setTimeout(onTimeOut, timeout);

    //for the same rason that is explained about interval here we need to clear the timer as well
    return () => {
      clearTimeout(timer);
    };
    //WHEN WE USE A FUNCITON AS A DEPENDENCI, IT CUASES A INFINITE LOUPE, BEACUAS IT CAUSES THE PARENT COMPONENT RERENDER AGAIN, IT CREATES A NEW FUNCTION, AND
    //FOR THAT THIS PART RUNS AGAIN, IT CUASES RERENDER THE PARENT AGAIN AND SO ON
    //FOR THAT IN THE PARENT COMPONENT WE CAN USE  A HOOK THAT DOES NOT LET THE FUNCTION RECREATE
  }, [timeout, onTimeOut]);

  //to update we use INTERVAL function to excute our code every 100 ms or anytime we want
  //THIS PART OF CODE IS AMKING AN **INFINITE LOUPE**, WE UPDATE A STAE, IT REXCUTE THE COMPONENT, AND TI CREATE ANOTHER SETINTERVAL********
  //AND FOR THE REASON ABOVE WE USE ***USEEFFECT***
  useEffect(() => {
    console.log("SETTING INTERVAL");
    const interval = setInterval(() => {
      //beacuse we update the state base on the previous state, it will be passed automatically to the function
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    //here here are going to clear the interval, and even if it runs lots of times, the previews does not extist
    //and this part will be executed by React before this useEffect runs or this component unmonunted from Dom
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={timeout}
      value={reaminigTime}
      className={mode}
    />
  );
}
