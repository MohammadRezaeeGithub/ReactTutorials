import NewTask from "./NewTask";

export default function Tasks({ tasks, onAdd, onDelete }) {
  return (
    <section>
      <h2 className="font-bold text-2xl text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any task yet.
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8  rounded-md">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between p-2 my-2 bg-stone-100 rounded-md"
            >
              <span>{task.text}</span>
              <button
                onClick={() => onDelete(task.id)}
                className="text-stone-700 hover:text-red-500"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
