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

const GET_ALL_COLUMNS_QUERY = `
  query AllColumns($userId: ID!) {
    allColumns(userId: $userId) {
      id
      title
      userId
      isFixed
      order
    }
  }
`;

export const queries = {
    // getAllTasks: GET_ALL_TASKS_QUERY,
  getTasksByStatus: GET_TASKS_BY_STATUS_QUERY,
  getAllColumns: GET_ALL_COLUMNS_QUERY

}