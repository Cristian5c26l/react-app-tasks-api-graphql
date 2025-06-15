import { useEffect, useState } from "react";
import type { Task, TaskStatus } from "../interfaces/task.interface";
import { tasksApi } from "../../api/tasksApi";
import { mutations } from "../../graphql/mutations";
import { queries } from "../../graphql/queries";




export const useTask = (tasksColumnInfo: { columnName: string; columnId: string;  order: number}[]) => {
    const [allTasksDb, setAllTasksDb] = useState<{ [key: string]: { tasks: Task[], columnId: string, columnOrder: number } }>({});
      
    
      const addTask = async (taskTitle: string, column: TaskStatus) => {
    
        const resp = await tasksApi(mutations.createTask, {
          title: taskTitle,
          status: column,
          userId: localStorage.getItem("userId") || "",
        });
    
        if (!resp.createTask) {
          throw new Error("Error al crear la tarea");
        }
    
        setAllTasksDb((prev) => {
          const updatedTasks = { ...prev };
            if (!updatedTasks[column]) {
              updatedTasks[column] = { tasks: [], columnId: "", columnOrder: 0 };
              throw new Error(`Columna ${column} no encontrada`);
          } 
          
          updatedTasks[column] = {
              ...updatedTasks[column],
              tasks: [
                ...updatedTasks[column].tasks,
                {
                  id: resp.createTask.id,
                  title: resp.createTask.title,
                  column: column,
                },
              ],
          };
            
             return updatedTasks;
            
          }
    
        );
          
    
      }
    
      const editTask = async (taskId: string, newTitle: string, column: TaskStatus) => {
        const resp = await tasksApi(mutations.updateTask, {
          taskId: taskId,
          title: newTitle,
          status: column,// Para la validación solamente del lado de graphql, y aqui en el front, para completar la edicion del estado allTasks de la columna correspondiente
        });
    
        if (!resp.updateTask) {
          throw new Error("Error al editar la tarea");
        }
    
        setAllTasksDb((prev) => {
          const updatedTasks = { ...prev };
          if (!updatedTasks[column]) {
            throw new Error(`Columna ${column} no encontrada`);
          }
          updatedTasks[column].tasks = updatedTasks[column].tasks.map((task) =>
            task.id === taskId ? { ...task, title: newTitle } : task
          );
          return updatedTasks;
        });
      }
    
    
    
      const deleteTask = async (taskId: string, column: TaskStatus) => {
        const resp = await tasksApi(mutations.deleteTask, {
          taskId: taskId,
        });
    
        if (!resp.deleteTask) {
          throw new Error("Error al eliminar la tarea");
        }
    
        setAllTasksDb((prev) => {
          const updatedTasks = { ...prev };
          if (!updatedTasks[column]) {
            throw new Error(`Columna ${column} no encontrada`);
          }
          updatedTasks[column].tasks = updatedTasks[column].tasks.filter(
            (task) => task.id !== taskId
          );
          return updatedTasks;
        });
      }
    
      
    
    
      
    
    
      // Efecto 2 para cargar las tareas iniciales al principio. Despues, cuando se agregue una nueva columna, se actualice el LocalStorage y tasksColumnInfo. Este se efecto se ejecuta una sola vez al inicio y cuando cambia tasksColumnInfo.
      useEffect(() => {
        const loadTasks = async () => {
    
          const initialTasks: { [key: string]: { tasks: Task[], columnId: string, columnOrder: number } } = {};
    
          // console.log("tasksColumnInfo", tasksColumnInfo);
    
          for (const column of tasksColumnInfo ?? [] ) {
            
            const resp = await tasksApi(queries.getTasksByStatus, {
              status: column.columnName,
              userId: localStorage.getItem("userId") || "",
            });
    
            
            initialTasks[column.columnName] = {
              tasks: resp.tasksByStatus.map(
                (task: {
                  id: string;
                  title: string;
                  columnId: string;
                  userId: string;
                  columnOrder: number;
                }) => ({ id: task.id, title: task.title, column: column.columnName })
              ),
              columnId: resp.tasksByStatus[0]?.columnId || column.columnId,
              columnOrder: resp.tasksByStatus[0]?.columnOrder || column.order,
            }
          }
    
          setAllTasksDb(initialTasks);
    
        };
    
        loadTasks();
    
        // Guardar en LocalStorage tasksColumnInfo
        // localStorage.setItem("tasksColumnInfo", JSON.stringify(tasksColumnInfo));
      }, [tasksColumnInfo]);
    
        return {
            allTasksDb,
            addTask,
            editTask,
            deleteTask,
        };
}