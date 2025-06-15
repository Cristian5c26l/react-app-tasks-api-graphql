


export interface Task {
    id?: string;
    title: string;
    // columnId?: string; // opcional, si se quiere saber en que columna esta la tarea
    // columnOrder?: number; // opcional, si se quiere saber el orden de la columna
    column: TaskStatus;
}

export type TaskStatus = 'TODO' | 'IN PROGRESS' | 'DONE';