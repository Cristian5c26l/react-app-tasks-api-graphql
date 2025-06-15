const GET_TASKS_BY_STATUS_QUERY = `
  query TasksByStatus($status: String!, $userId: ID!) {
    tasksByStatus(status: $status, userId: $userId) {
      id
      title
      columnId
      userId
      columnOrder
    }
  }
`;

export const queries = {
    // getAllTasks: GET_ALL_TASKS_QUERY,
    getTasksByStatus: GET_TASKS_BY_STATUS_QUERY,
}