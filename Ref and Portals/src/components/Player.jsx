import { useRef, useState } from "react";

export default function Player() {
  //state cuases the component to be reexecuted when we want to update the changes through that function.when we want to reflect the changes in UI
  //the REf is used to direct acces to the value of DOM vriable

  const playerName = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  const handleClick = () => {
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = "";
    //in this case we can code like that, beacuse our ref is not connected to a state or somehing like that.
    //but in general we can not use REF for all the variables of out application. just when we can make our life easier like this case.
  };

  return (
    <section id="player">
      <h2>
        Welcome {enteredPlayerName ? enteredPlayerName : "unknown entity"}
      </h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
