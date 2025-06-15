// src/services/taskService.ts

interface Variables {
  status?: string;
  title?: string;
  taskId?: string;
  columnName?: string;
  columnId?: string;
  newOrder?: string[];
  userId?: string;
}

export const tasksApi = async (query = "", variables: Variables) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      // o donde esté corriendo tu Apollo Server
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          query: query,
          variables: variables,
      }),
    });

    const json = await response.json();

    if (json.errors) {
      throw new Error("Query no se pudo realizar");
    }

    return json.data;
  } catch (error) {
    console.log("Error fetching tasks:", error);
  }
};
