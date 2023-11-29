import { useRef } from "react";
import Input from "./Input";

export default function NewProject({ onAdd }) {
  const title = useRef();
  const dexcription = useRef();
  const dueDate = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const entereddescription = dexcription.current.value;
    const enteredDueDate = dueDate.current.value;

    //validation...

    onAdd({
      title: enteredTitle,
      description: entereddescription,
      dueDate: enteredDueDate,
    });
  }
  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end my-4 gap-4">
        <li>
          <button className="text-stone-800 hover:text-stone-950">
            Cancel
          </button>
        </li>
        <li>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          >
            Save
          </button>
        </li>
      </menu>
      <div>
        <Input ref={title} type="text" label="Title" />
        <Input ref={dexcription} label="Description" isTextarea />
        <Input ref={dueDate} type="date" label="Due Date" />
      </div>
    </div>
  );
}
