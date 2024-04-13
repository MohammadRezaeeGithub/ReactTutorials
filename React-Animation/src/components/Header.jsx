import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import NewChallenge from "./NewChallenge.jsx";

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      {/* here beacuse animation happens in the newChanllenge and react does not know anout it */}
      {/* so as soon as the vriable changes, react remove the component form the screen and we do not see the animation */}
      {/* for that we add another component from Framer-motion for such a code like that */}
      {/* in this case react search for exit property and if it exists it will execute it before remove component  */}
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>

      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button
          //we can also add the coloer to the animation,
          //for example here we could add a color to whilehover property
          whileHover={{ scale: 1.1, backgroundColor: "#8b11f0" }}
          transition={{ type: "spring", stiffness: 500 }}
          onClick={handleStartAddNewChallenge}
          className="button"
        >
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
