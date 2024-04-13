import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ChallengesContext } from "../store/challenges-context.jsx";
import ChallengeItem from "./ChallengeItem.jsx";
import ChallengeTabs from "./ChallengeTabs.jsx";

export default function Challenges() {
  const { challenges } = useContext(ChallengesContext);
  const [selectedType, setSelectedType] = useState("active");
  const [expanded, setExpanded] = useState(null);

  function handleSelectType(newType) {
    setSelectedType(newType);
  }

  function handleViewDetails(id) {
    setExpanded((prevId) => {
      if (prevId === id) {
        return null;
      }

      return id;
    });
  }

  const filteredChallenges = {
    active: challenges.filter((challenge) => challenge.status === "active"),
    completed: challenges.filter(
      (challenge) => challenge.status === "completed"
    ),
    failed: challenges.filter((challenge) => challenge.status === "failed"),
  };

  const displayedChallenges = filteredChallenges[selectedType];

  return (
    <div id="challenges">
      <ChallengeTabs
        challenges={filteredChallenges}
        onSelectType={handleSelectType}
        selectedType={selectedType}
      >
        {/* for the last item in the list, it will be removed suddenly. beacuase the array will be empty and it will remove suddenly by React */}
        {/* so we need to put in AnimatePresence to iform react of the animation */}
        {/* we need also to change ol to motion.ol */}
        {/* in the animatepresence if we have more than one elemetn, for each one we have to add a key,  */}
        {/* so framer-motion can make a difference and run the animations */}
        <AnimatePresence mode="wait">
          {/* we add mode to tell that do not run all the animation at the same time(removing list and show the text) */}
          {displayedChallenges.length > 0 && (
            <motion.ol
              key="list"
              exit={{ y: -30, opacity: 0 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="challenge-items"
            >
              {/* we add this component beacuse we want to add some animation for the moment when the items is removed. */}
              {/* so we add the animation inside the component and we inform react that there is an animation before removing it suddenly */}
              {/* in framer-motion we also need a key when we have animtepresence and multiple child inside */}
              <AnimatePresence>
                {displayedChallenges.map((challenge) => (
                  <ChallengeItem
                    key={challenge.id}
                    challenge={challenge}
                    onViewDetails={() => handleViewDetails(challenge.id)}
                    isExpanded={expanded === challenge.id}
                  />
                ))}
              </AnimatePresence>
            </motion.ol>
          )}

          {displayedChallenges.length === 0 && (
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              No challenges found.
            </motion.p>
          )}
        </AnimatePresence>
      </ChallengeTabs>
    </div>
  );
}
