import { useEffect, useState } from "react";
import { mutations } from "../../graphql/mutations";
import { tasksApi } from "../../api/tasksApi";
import { queries } from "../../graphql/queries";




export const useColumn = () => {

    const [tasksColumnInfo, setTaksColumnInfo] = useState<{ columnName: string; columnId: string;  order: number}[]>([]);
      const [tasksColumnDraggedOrder, setTasksColumnDraggedOrder] = useState<number | null>(null);
    
    
      const setDraggingTasksColumn = (order: number) => {
        setTasksColumnDraggedOrder(order);
        // console.log("setDraggingTaskComponent", taskComponentDragged);
      };
    
      const removeDraggingTasksColumn = () => {
        setTasksColumnDraggedOrder(null);
      };


    const addColumn = async (columnName: string) => {
    
        const resp = await tasksApi(mutations.addColumn, {
          columnName: columnName,
          userId: localStorage.getItem("userId") || "",
        });
    
        if (!resp.addColumn) {
          throw new Error("Error al agregar la columna");
        }
    
        setTaksColumnInfo((prevColumns) => [...prevColumns!, {
          columnName: resp.addColumn.title,
          columnId: resp.addColumn.id,
          order: resp.addColumn.order,
        }]);
    
        localStorage.setItem("tasksColumnInfo", JSON.stringify([
          ...tasksColumnInfo,
          {
            columnName: resp.addColumn.title,
            columnId: resp.addColumn.id,
            order: resp.addColumn.order,
          }
        ]));
    
        // setAllTasks((prev) => ({
        //   ...prev,
        //   [resp.addColumn.title]: {
        //     tasks: [],
        //     columnId: resp.addColumn.id,
        //     columnOrder: resp.addColumn.order,
        //   },
        // }));
      }
    
      const deleteColumn = async (columnId: string) => {
        console.log("deleteColumn", columnId);
        const resp = await tasksApi(mutations.deleteColumn, {
          columnId: columnId,
          userId: localStorage.getItem("userId") || "",
        });
    
        console.log("resp.deleteColumn", resp.deleteColumn);
        if (!resp.deleteColumn) {
          throw new Error("Error al eliminar la columna");
        }
    
    
        const updatedColumns = resp.deleteColumn.map((column: { id: string; title: string; order: number }) => ({
          columnId: column.id,
          columnName: column.title,
          order: column.order,
        }));
    
        // Actualizar el LocalStorage con las nuevas columnas
        localStorage.setItem("tasksColumnInfo", JSON.stringify(updatedColumns));
    
        setTaksColumnInfo(updatedColumns);
    
        // setAllTasks((prev) => {
        //   const updatedTasks = { ...prev };
        //   delete updatedTasks[resp.deleteColumn.title];
        //   return updatedTasks;
        // });
      }
    
      const reOrderTasksColumns = async(
        // orderNew: number,
        tasksColumnOrderCurrent: number
      ) => {
        // console.log("onChangeComponentTasksOrdered", tasksColumnDraggedOrder, tasksColumnOrderCurrent);
    
        const newTasksColumnInfo = [...tasksColumnInfo].map((column) => {
          if (column.order === tasksColumnOrderCurrent) {
            return { ...column, order: tasksColumnDraggedOrder ?? column.order };
          } else if (column.order === tasksColumnDraggedOrder) {
            return { ...column, order: tasksColumnOrderCurrent };
          }
          return column;
        });
    
        const sortedNewTasksColumnInfo = newTasksColumnInfo.sort((a, b) => a.order - b.order);
    
        
        await tasksApi(mutations.reorderColumns, {
          newOrder: sortedNewTasksColumnInfo.map(col => col.columnId),
          userId: localStorage.getItem("userId") || "",
        });
    
        // Actualizar el LocalStorage con las nuevas columnas ordenadas
        localStorage.setItem("tasksColumnInfo", JSON.stringify(sortedNewTasksColumnInfo));
    
        setTaksColumnInfo(sortedNewTasksColumnInfo); // local update
    
    
        
      };


    // Efecto 1 para cargar la informacion de las columnas (solo se ejecuta la primera vez que se renderiza el componente)
      useEffect(() => {
    
        // Cargar la informacion de las columnas desde el LocalStorage o desde la API si no existe
        const storedColumnInfo = localStorage.getItem("tasksColumnInfo");
        if (storedColumnInfo) {
          setTaksColumnInfo(JSON.parse(storedColumnInfo));
          return; // Si ya hay columnas en LocalStorage, no hace falta hacer la consulta a la API
        }
    
        const loadColumns = async () => {
          const resp = await tasksApi(queries.getAllColumns, {
            userId: localStorage.getItem("userId") || "",
          });
    
          if (!resp.allColumns) {
            throw new Error("Error al cargar las columnas");
          }
    
          const updatedColumnInfo = resp.allColumns.map((column: { id: string; title: string; order: number }) => ({
            columnId: column.id,
            columnName: column.title,
            order: column.order,
          }));
    
          // Guardar en LocalStorage tasksColumnInfo
          localStorage.setItem("tasksColumnInfo", JSON.stringify(updatedColumnInfo));
          setTaksColumnInfo(updatedColumnInfo);
        };
    
        loadColumns();
      }, []);
    
    
    return {
        tasksColumnInfo,
        tasksColumnDraggedOrder,
        setDraggingTasksColumn,
        removeDraggingTasksColumn,
        addColumn,
        deleteColumn,
        reOrderTasksColumns
    
    };
    
}