import Badge from "./Badge.jsx";
import { motion } from "framer-motion";

function Tab({ isSelected, onSelect, badgeCaption, children }) {
  return (
    <li>
      <button
        className={isSelected ? "selected" : undefined}
        onClick={onSelect}
      >
        {children}
        {/* here we use the badgeCaption as the key, 
        so whenever the value changes the component will be rerenderd and animation will be executed again. */}
        <Badge key={badgeCaption} caption={badgeCaption}></Badge>
      </button>
      {/* here technically we render 3 different elemnt in dom,but we want that the bar behind them have an animation */}
      {/* first we need to chanage it to motion.div, then add LAYOUTID and set an id for that */}
      {/* when framer-motion see that we create different elemnt with the same id, it makes a smooth animation between them */}
      {isSelected && (
        <motion.div layoutId="tab-indicator" className="active-tab-indicator" />
      )}
    </li>
  );
}

export default function ChallengeTabs({
  selectedType,
  onSelectType,
  challenges,
  children,
}) {
  return (
    <>
      <menu id="tabs">
        <Tab
          isSelected={selectedType === "active"}
          onSelect={() => onSelectType("active")}
          badgeCaption={challenges.active.length}
        >
          Active
        </Tab>
        <Tab
          isSelected={selectedType === "completed"}
          onSelect={() => onSelectType("completed")}
          badgeCaption={challenges.completed.length}
        >
          Completed
        </Tab>
        <Tab
          isSelected={selectedType === "failed"}
          onSelect={() => onSelectType("failed")}
          badgeCaption={challenges.failed.length}
        >
          Failed
        </Tab>
      </menu>
      <div>{children}</div>
    </>
  );
}
