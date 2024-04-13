import { useContext, useRef, useState } from "react";
import { motion, useAnimate, stagger } from "framer-motion";

import { ChallengesContext } from "../store/challenges-context.jsx";
import Modal from "./Modal.jsx";
import images from "../assets/images.js";

export default function NewChallenge({ onDone }) {
  //to add imperative animations, we could use useAnimation hooks from framer-motion
  //it returns two prameetrs and the first one will be added to element and second one is a function that triggers the animation
  //for example we can call it when the entered information is not correct
  const [scope, animation] = useAnimate();

  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      //here we call the function to trigger the animation and pass the element which should be animated
      //the second argument will be for describing the animation
      //the same object that we paased to exit or vriants
      //the third argument is a configuration object how animation will be played
      //we can another fantsy thing, delay to animation, but for that we need to add stgger from framer-motion to shake them on after another
      animation(
        "input,textarea",
        { x: [-10, 0, 10, 0] },
        { type: "spring", duration: 0.2, delay: stagger(0.05) }
      );
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      {/* here we add the scope, so the framer-motion can understand in which area he has to select elements to animate */}
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        {/* in a list when we want the memebers to appear on after the other and not at the same time we do like this: */}
        {/* we have to do it in the parent elemnt */}
        <motion.ul
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          id="new-challenge-images"
        >
          {images.map((image) => (
            <motion.li
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: [0.8, 1.3, 1] }, //here if instead of only one number, we add an array of the numbers,we create a keyframes
                //with different stages, first it gets bigger till 0.8 and then till 1.3 and then it returns to 1
              }}
              // here when we close the modal the backdrop stays there for a few seconds
              //so we need to add the exit property in here and we can give it a name of vairable we already define
              //we have to give the values
              exit={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? "selected" : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
