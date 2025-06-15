import { JiraTasks } from "../components/JiraTasks";
import {  type TaskStatus } from "../interfaces/task.interface";
import { ColumnAdder } from "../components/ColumnAdder";
import { useColumn } from "../hooks/useColumn";
import { useTask } from "../hooks/useTask";



export const JiraPage = () => {

  const { 
    addColumn,
    deleteColumn,
    reOrderTasksColumns,
    setDraggingTasksColumn,
    removeDraggingTasksColumn,
    tasksColumnDraggedOrder,
    tasksColumnInfo,
    // columnsProcessing,
  } = useColumn();

  const { 
    allTasksDb,
    addTask,
    deleteTask,
    editTask,
    // tasksProcessing,
  } = useTask(tasksColumnInfo);

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800">Tareas</h1>
      {/* <p>Gestiona tus tareas de forma adecuada.</p>
      <p>Puedes tener agregar 2 columnas más para identificar tus tareas.</p> */}
      <p className="text-gray-600 text-xl mb-4">
        Gestiona tus tareas de forma adecuada. Puedes agregar 2 columnas más para identificar tus tareas.
      </p>
      <p className="text-gray-600 text-xl mb-4">
        Puedes reordenar las columnas arrastrandolas.
      </p>
      
      <hr className="border-gray-300 border mb-3" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(allTasksDb).map(([status, { tasks, columnId, columnOrder }]) => (
          <JiraTasks
            key={columnId}
            id={columnId}
            title={status}
            status={status as TaskStatus}
            tasks={tasks}
            order={columnOrder}
            addTask={addTask}
            deleteTask={deleteTask}
            editTask={editTask}
            deleteColumn={deleteColumn}
            reOrderTasksColumns={reOrderTasksColumns}
            setDraggingTasksColumn={setDraggingTasksColumn}
            removeDraggingTasksColumn={removeDraggingTasksColumn}
            isDraggingColumn={!!tasksColumnDraggedOrder}
            // isHappeningChange={columnsProcessing || tasksProcessing}
          />
        ))}
      </div>

      <ColumnAdder addColumn={addColumn} />
    </>
  );
};
