// import { useEffect, useState } from "react";
// import { JiraTasks } from "../components/JiraTasks";
// import { tasksApi } from "../../api/tasksApi";
// import { queries } from "../../graphql/queries";
// import { type Task, type TaskStatus } from "../interfaces/task.interface";
// import { mutations } from "../../graphql/mutations";
// import { ColumnAdder } from "../components/ColumnAdder";



// export const JiraPage = () => {

//   const [allTasksDb, setAllTasksDb] = useState<{ [key: string]: { tasks: Task[], columnId: string, columnOrder: number } }>({});
//   const [tasksColumnInfo, setTaksColumnInfo] = useState<{ columnName: string; columnId: string;  order: number}[]>([]);
//   const [tasksColumnDraggedOrder, setTasksColumnDraggedOrder] = useState<number | null>(null);


//   const setDraggingTasksColumn = (order: number) => {
//     setTasksColumnDraggedOrder(order);
//     // console.log("setDraggingTaskComponent", taskComponentDragged);
//   };

//   const removeDraggingTasksColumn = () => {
//     setTasksColumnDraggedOrder(null);
//   };

  

//   const addTask = async (taskTitle: string, column: TaskStatus) => {

//     const resp = await tasksApi(mutations.createTask, {
//       title: taskTitle,
//       status: column,
//       userId: localStorage.getItem("userId") || "",
//     });

//     if (!resp.createTask) {
//       throw new Error("Error al crear la tarea");
//     }

//     setAllTasksDb((prev) => {
//       const updatedTasks = { ...prev };
//         if (!updatedTasks[column]) {
//           updatedTasks[column] = { tasks: [], columnId: "", columnOrder: 0 };
//           throw new Error(`Columna ${column} no encontrada`);
//       } 
      
//       updatedTasks[column] = {
//           ...updatedTasks[column],
//           tasks: [
//             ...updatedTasks[column].tasks,
//             {
//               id: resp.createTask.id,
//               title: resp.createTask.title,
//               column: column,
//             },
//           ],
//       };
        
//          return updatedTasks;
        
//       }

//     );
      

//   }

//   const editTask = async (taskId: string, newTitle: string, column: TaskStatus) => {
//     const resp = await tasksApi(mutations.updateTask, {
//       taskId: taskId,
//       title: newTitle,
//       status: column,// Para la validación solamente del lado de graphql, y aqui en el front, para completar la edicion del estado allTasks de la columna correspondiente
//     });

//     if (!resp.updateTask) {
//       throw new Error("Error al editar la tarea");
//     }

//     setAllTasksDb((prev) => {
//       const updatedTasks = { ...prev };
//       if (!updatedTasks[column]) {
//         throw new Error(`Columna ${column} no encontrada`);
//       }
//       updatedTasks[column].tasks = updatedTasks[column].tasks.map((task) =>
//         task.id === taskId ? { ...task, title: newTitle } : task
//       );
//       return updatedTasks;
//     });
//   }



//   const deleteTask = async (taskId: string, column: TaskStatus) => {
//     const resp = await tasksApi(mutations.deleteTask, {
//       taskId: taskId,
//     });

//     if (!resp.deleteTask) {
//       throw new Error("Error al eliminar la tarea");
//     }

//     setAllTasksDb((prev) => {
//       const updatedTasks = { ...prev };
//       if (!updatedTasks[column]) {
//         throw new Error(`Columna ${column} no encontrada`);
//       }
//       updatedTasks[column].tasks = updatedTasks[column].tasks.filter(
//         (task) => task.id !== taskId
//       );
//       return updatedTasks;
//     });
//   }

//   const addColumn = async (columnName: string) => {

//     const resp = await tasksApi(mutations.addColumn, {
//       columnName: columnName,
//       userId: localStorage.getItem("userId") || "",
//     });

//     if (!resp.addColumn) {
//       throw new Error("Error al agregar la columna");
//     }

//     setTaksColumnInfo((prevColumns) => [...prevColumns!, {
//       columnName: resp.addColumn.title,
//       columnId: resp.addColumn.id,
//       order: resp.addColumn.order,
//     }]);

//     localStorage.setItem("tasksColumnInfo", JSON.stringify([
//       ...tasksColumnInfo,
//       {
//         columnName: resp.addColumn.title,
//         columnId: resp.addColumn.id,
//         order: resp.addColumn.order,
//       }
//     ]));

//     // setAllTasks((prev) => ({
//     //   ...prev,
//     //   [resp.addColumn.title]: {
//     //     tasks: [],
//     //     columnId: resp.addColumn.id,
//     //     columnOrder: resp.addColumn.order,
//     //   },
//     // }));
//   }

//   const deleteColumn = async (columnId: string) => {
//     console.log("deleteColumn", columnId);
//     const resp = await tasksApi(mutations.deleteColumn, {
//       columnId: columnId,
//       userId: localStorage.getItem("userId") || "",
//     });

//     console.log("resp.deleteColumn", resp.deleteColumn);
//     if (!resp.deleteColumn) {
//       throw new Error("Error al eliminar la columna");
//     }


//     const updatedColumns = resp.deleteColumn.map((column: { id: string; title: string; order: number }) => ({
//       columnId: column.id,
//       columnName: column.title,
//       order: column.order,
//     }));

//     // Actualizar el LocalStorage con las nuevas columnas
//     localStorage.setItem("tasksColumnInfo", JSON.stringify(updatedColumns));

//     setTaksColumnInfo(updatedColumns);

//     // setAllTasks((prev) => {
//     //   const updatedTasks = { ...prev };
//     //   delete updatedTasks[resp.deleteColumn.title];
//     //   return updatedTasks;
//     // });
//   }

//   const reOrderTasksColumns = async(
//     // orderNew: number,
//     tasksColumnOrderCurrent: number
//   ) => {
//     // console.log("onChangeComponentTasksOrdered", tasksColumnDraggedOrder, tasksColumnOrderCurrent);

//     const newTasksColumnInfo = [...tasksColumnInfo].map((column) => {
//       if (column.order === tasksColumnOrderCurrent) {
//         return { ...column, order: tasksColumnDraggedOrder ?? column.order };
//       } else if (column.order === tasksColumnDraggedOrder) {
//         return { ...column, order: tasksColumnOrderCurrent };
//       }
//       return column;
//     });

//     const sortedNewTasksColumnInfo = newTasksColumnInfo.sort((a, b) => a.order - b.order);

    
//     await tasksApi(mutations.reorderColumns, {
//       newOrder: sortedNewTasksColumnInfo.map(col => col.columnId),
//       userId: localStorage.getItem("userId") || "",
//     });

//     // Actualizar el LocalStorage con las nuevas columnas ordenadas
//     localStorage.setItem("tasksColumnInfo", JSON.stringify(sortedNewTasksColumnInfo));

//     setTaksColumnInfo(sortedNewTasksColumnInfo); // local update


    
//   };


//   // Efecto 1 para cargar la informacion de las columnas (solo se ejecuta la primera vez que se renderiza el componente)
//   useEffect(() => {

//     // Cargar la informacion de las columnas desde el LocalStorage o desde la API si no existe
//     const storedColumnInfo = localStorage.getItem("tasksColumnInfo");
//     if (storedColumnInfo) {
//       setTaksColumnInfo(JSON.parse(storedColumnInfo));
//       return; // Si ya hay columnas en LocalStorage, no hace falta hacer la consulta a la API
//     }

//     const loadColumns = async () => {
//       const resp = await tasksApi(queries.getAllColumns, {
//         userId: localStorage.getItem("userId") || "",
//       });

//       if (!resp.allColumns) {
//         throw new Error("Error al cargar las columnas");
//       }

//       const updatedColumnInfo = resp.allColumns.map((column: { id: string; title: string; order: number }) => ({
//         columnId: column.id,
//         columnName: column.title,
//         order: column.order,
//       }));

//       // Guardar en LocalStorage tasksColumnInfo
//       localStorage.setItem("tasksColumnInfo", JSON.stringify(updatedColumnInfo));
//       setTaksColumnInfo(updatedColumnInfo);
//     };

//     loadColumns();
//   }, []);


//   // Efecto 2 para cargar las tareas iniciales al principio. Despues, cuando se agregue una nueva columna, se actualice el LocalStorage y tasksColumnInfo. Este se efecto se ejecuta una sola vez al inicio y cuando cambia tasksColumnInfo.
//   useEffect(() => {
//     const loadTasks = async () => {

//       const initialTasks: { [key: string]: { tasks: Task[], columnId: string, columnOrder: number } } = {};

//       // console.log("tasksColumnInfo", tasksColumnInfo);

//       for (const column of tasksColumnInfo ?? [] ) {
        
//         const resp = await tasksApi(queries.getTasksByStatus, {
//           status: column.columnName,
//           userId: localStorage.getItem("userId") || "",
//         });

        
//         initialTasks[column.columnName] = {
//           tasks: resp.tasksByStatus.map(
//             (task: {
//               id: string;
//               title: string;
//               columnId: string;
//               userId: string;
//               columnOrder: number;
//             }) => ({ id: task.id, title: task.title, column: column.columnName })
//           ),
//           columnId: resp.tasksByStatus[0]?.columnId || column.columnId,
//           columnOrder: resp.tasksByStatus[0]?.columnOrder || column.order,
//         }
//       }

//       setAllTasksDb(initialTasks);

//     };

//     loadTasks();

//     // Guardar en LocalStorage tasksColumnInfo
//     // localStorage.setItem("tasksColumnInfo", JSON.stringify(tasksColumnInfo));
//   }, [tasksColumnInfo]);

//   return (
//     <>
//       <h1 className="text-3xl font-bold text-gray-800">Tareas</h1>
//       {/* <p>Gestiona tus tareas de forma adecuada.</p>
//       <p>Puedes tener agregar 2 columnas más para identificar tus tareas.</p> */}
//       <p className="text-gray-600 text-xl mb-4">
//         Gestiona tus tareas de forma adecuada. Puedes agregar 2 columnas para identificar tus tareas.
//       </p>
//       <p className="text-gray-600 text-xl mb-4">
//         Puedes reordenar las columnas arrastrantodas.
//       </p>
      
//       <hr className="border-gray-300 border mb-3" />

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {Object.entries(allTasksDb).map(([status, { tasks, columnId, columnOrder }]) => (
//           <JiraTasks
//             key={columnId}
//             id={columnId}
//             title={status}
//             status={status as TaskStatus}
//             tasks={tasks}
//             order={columnOrder}
//             addTask={addTask}
//             deleteTask={deleteTask}
//             editTask={editTask}
//             deleteColumn={deleteColumn}
//             reOrderTasksColumns={reOrderTasksColumns}
//             setDraggingTasksColumn={setDraggingTasksColumn}
//             removeDraggingTasksColumn={removeDraggingTasksColumn}
//             isDraggingColumn={!!tasksColumnDraggedOrder}
//           />
//         ))}
//       </div>

//       <ColumnAdder addColumn={addColumn} />
//     </>
//   );
// };
