import { useState, type DragEvent } from "react";
import {
  IoAddOutline,
  IoCheckmarkCircleOutline,
  IoSadOutline,
  IoTrashOutline,
} from "react-icons/io5"; // https://react-icons.github.io/react-icons/search/#q=sad
import classNames from "classnames";
import Swal from "sweetalert2";

import { SingleTask } from "./SingleTask";
import type { Task, TaskStatus } from "../interfaces/task.interface";

interface Props {
  id: string;
  title: string;
  tasks: Task[];
  status: TaskStatus;
  setDraggingTasksColumn: (order: number) => void;
  removeDraggingTasksColumn: () => void;
  order: number; // opcional, si se quiere ordenar los componentes por orden
  reOrderTasksColumns: (
    // tasksColumnDraggedOrder: number,
    tasksColumnOrderCurrent: number
  ) => void;
  addTask: (task: string, status: TaskStatus) => Promise<void>;
  deleteTask: (taskId: string, column: TaskStatus) => Promise<void>;
  editTask: (taskId: string, title: string, column: TaskStatus) => Promise<void>;
  deleteColumn: (columnId: string) => Promise<void>; // 
  isDraggingColumn: boolean; 
}

export const JiraTasks = ({
  id,
  title,
  status,
  tasks,
  setDraggingTasksColumn,
  removeDraggingTasksColumn,
  order,
  reOrderTasksColumns,
  addTask,
  deleteTask,
  editTask,
  deleteColumn,
  isDraggingColumn,
}: Props) => {
  

  const [onDragOver, setOnDragOver] = useState(false); // opcional, si se quiere saber si se esta arrastrando una tarea

  const handleAddTask = async () => {

    const resp = await Swal.fire({
      title: "Nueva tarea",
      input: "text",
      inputLabel: "Nombre de la tarea",
      inputPlaceholder: "Ingrese el nombre de la tarea",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Debe de ingresar un nombre para la tarea";
        }
      },
    });

    // console.log(resp);
    if (!resp.isConfirmed) return; // resp.isConfirmed es true cuando el usuario da click en cancel de sweet alert


    const newTask: Task = {
      title: resp.value || "Nueva Tarea",
      column: status,
    };


    addTask(newTask.title, newTask.column);

  };

  const handleDeleteTask = async (taskId: string) => {
    deleteTask(taskId, status);
  }

  const handleEditTask = async (taskId: string, title: string) => {
    const resp = await Swal.fire({
      title: "Editar tarea",
      input: "text",
      inputLabel: "Nombre de la tarea",
      inputValue: title,
      inputPlaceholder: "Ingrese el nombre de la tarea",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Debe de ingresar un nombre para la tarea";
        }
      },
    });

    // console.log(resp);
    if (!resp.isConfirmed) return; // resp.isConfirmed es true cuando el usuario da click en cancel de sweet alert

    editTask(taskId, resp.value || title, status);
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(true); // Indica que se está arrastrando una columna sobre otra
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false); // Indica que se ha dejado de arrastrar una columna sobre otra
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    reOrderTasksColumns(order); // Clave

    removeDraggingTasksColumn();
  };

  const handleDeleteColumn = () => {

    deleteColumn(id);

  }

  return (
    <div
      draggable
      // onDragEnd={removeDraggingTasksColumn}
      // onDragOver={handleDragOver} Necesario para que funcione el onDrop
      onDragStart={() => setDraggingTasksColumn(order)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={classNames(
        "!text-black border-4 relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]",
        {
          'border-blue-500 border-dotted': isDraggingColumn,
          'border-green-500 border-dotted': isDraggingColumn && onDragOver,// Sobreponer o sobreescribir border-color (border-green) y border-style (border-dotted) si isDragging && onDragOver devuelve true
        }
      )}
    >
      {/* Task Header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: "50px" }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        {/** Eliminar columna boton*/}
        <button className="transition-all hover:bg-red-800 bg-red-600 px-4 py-1 rounded-full text-gray-100 font-semibold uppercase tracking-wide shadow-md"
          onClick={handleDeleteColumn}>
          <IoTrashOutline />
        </button>  
        
        <button className="transition-all hover:bg-indigo-800 bg-indigo-600 px-8 py-2 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide shadow-md" onClick={handleAddTask}>
          <IoAddOutline />
        </button>
      </div>

      {/* Task Items */}
      <div className="h-full w-full">
        {tasks.length > 0 ? (
          tasks.map((task) => <SingleTask key={task.id} task={task} deleteTask={handleDeleteTask} editTask={handleEditTask}  />)
        ) : (
          <div className="h-full w-full flex flex-row justify-center items-center">
            {/**h-full y w-full están para que ocupen el 100% del alto y ancho del elemento HTML padre (que es el div className="h-full w-full) , display: flex (los divs internos se configuran para que se puedan colocar como se le indique), flex-direction: row (el div interno se pretende que se coloque en fila asi como otros divs internos que estuvieran), justify-content: center (posicionar en el centro de forma horizontal el div interno porque se tiene row como flex-direction), align-items: center (Partiendo del centro de forma horizontal donde esta el div, posicionarlo en el centro de forma vertical porque se tiene row como flex-direction)  */}
            <div>
              No hay tareas{" "}
              <b>
                {(status === "TODO" && "pendientes") ||
                  (status === "IN PROGRESS" && "en progreso") ||
                  (status === "DONE" && "terminadas")}
              </b>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
              <span className="flex justify-center items-center h-6 w-6 text-brand-500">
                <IoSadOutline style={{ fontSize: "50px" }} />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
