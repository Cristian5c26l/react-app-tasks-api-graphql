
const CREATE_TASK_MUTATION = `
  mutation CreateTask($title: String!, $status: String!, $userId: ID!) {
    createTask(title: $title, status: $status, userId: $userId) {
      id
      title
      columnId
      userId
    }
  }
`;

const UPDATE_TASK_MUTATION = `
  mutation UpdateTask($taskId: ID!, $title: String, $status: String) {
    updateTask(taskId: $taskId, title: $title, status: $status) {
      id
      title
      columnId
      userId
    }
  }
`;

const DELETE_TASK_MUTATION = `
  mutation DeleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId) {
      id
      title
      columnId
      userId
    }
  }
`;

const ADD_COLUMN_MUTATION = `
  mutation AddColumn($columnName: String!, $userId: ID!) {
    addColumn(columnName: $columnName, userId: $userId) {
      id
      title
      userId
      isFixed
      order
    }
  }
`;

const REORDER_COLUMNS_MUTATION = `
  mutation ReorderColumns($newOrder: [ID!]!, $userId: ID!) {
    reorderColumns(newOrder: $newOrder, userId: $userId) {
      id
      title
      userId
      isFixed
      order
    }
  }
`;

const DELETE_COLUMN_MUTATION = `
  mutation DeleteColumn($columnId: ID!, $userId: ID!) {
    deleteColumn(columnId: $columnId, userId: $userId) {
      id
      title
      userId
      isFixed
      order
    }
  }
`;

export const mutations = {
  createTask: CREATE_TASK_MUTATION,
  updateTask: UPDATE_TASK_MUTATION,
  deleteTask: DELETE_TASK_MUTATION,
  addColumn: ADD_COLUMN_MUTATION,
  reorderColumns: REORDER_COLUMNS_MUTATION,
  deleteColumn: DELETE_COLUMN_MUTATION,
};