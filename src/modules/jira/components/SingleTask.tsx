import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import type { Task } from "../interfaces/task.interface";

interface Props {
  task: Task;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, title: string) => void;
}

export const SingleTask = ({ task, deleteTask, editTask }: Props) => {
  // const setDraggingTaskId = useTaskStore(state => state.setDraggingTaskId );
  // const removeDraggingTaskId = useTaskStore(state => state.removeDraggingTaskId );

  // draggable permite que se pueda hacer drag del div (permite arrastrar el div)
  // Se ejecuta onDragStart cuando se comienza a arrastrar el div
  // Se ejecuta onDragEnd cuando se suelta lo que se esta arrastrando
  return (
    <div
      // draggable
      className="mt-5 flex items-center justify-between p-2"
      //  onDragStart={() => setDraggingTaskId(task.id)}
      //    onDragEnd={() => removeDraggingTaskId()}
    >
      <div className="flex justify-between w-full">
        {/**w-full para ocupar el ancho del padre */}
        <div>
          <p className="text-base font-bold text-navy-700">{task.title}</p>
        </div>

        <div>
          <button
            onClick={() => task.id && deleteTask(task.id)}
            className="transition-all hover:bg-red-800 bg-red-600 px-8 py-2 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide shadow-md mr-2">
            <IoTrashOutline />
          </button>
          <button
            onClick={() => task.id && editTask(task.id, task.title)}
            className="transition-all hover:bg-green-800 bg-green-600 px-8 py-2 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide shadow-md">
            <IoPencilOutline />
          </button>
        </div>
      </div>
    </div>
  );
};
