import { gql } from "@apollo/client";

export const getAllBoards = gql`
  query GetBoards {
    getBoards {
      id
      name
    }
  }
`;

export const ADD_NEW_BOARD = gql`
  mutation Mutation($name: String!) {
    createBoard(name: $name) {
      id
      name
    }
  }
`;

export const GET_BOARD_BY_ID = gql`
  query GetBoards($id: ID!) {
    getBoard(id: $id) {
      columns {
        boardId
        id
        name
        tasks {
          title
          id
          columnId
          subtasks {
            id
            title
            completed
          }
        }
      }
      name
      id
    }
  }
`;

export const ADD_COLUMN = gql`
  mutation Mutation($name: String!, $boardId: ID!) {
    createColumn(name: $name, boardId: $boardId) {
      boardId
      id
      name
    }
  }
`;

export const REMOVE_COLUMN = gql`
  mutation DeleteColumn($deleteColumnId: ID!) {
    deleteColumn(id: $deleteColumnId)
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($deleteTaskId: ID!) {
    deleteTask(id: $deleteTaskId)
  }
`;

export const ADD_TASK = gql`
  mutation Mutation($title: String!, $columnId: ID!) {
    createTask(title: $title, columnId: $columnId) {
      id
      title
      columnId
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($updateTaskId: ID!, $title: String!) {
    updateTask(id: $updateTaskId, title: $title) {
      id
      title
      columnId
    }
  }
`;

// Create Subtask
export const CREATE_SUBTASK = gql`
  mutation CreateSubtask($title: String!, $taskId: ID!) {
    createSubtask(title: $title, taskId: $taskId) {
      id
      title
      completed
    }
  }
`;

// Update Subtask
export const UPDATE_SUBTASK = gql`
  mutation UpdateSubtask($id: ID!, $title: String, $completed: Boolean) {
    updateSubtask(id: $id, title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`;

// Delete Subtask
export const DELETE_SUBTASK = gql`
  mutation DeleteSubtask($id: ID!) {
    deleteSubtask(id: $id)
  }
`;

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      subtasks {
        id
        title
        completed
      }
    }
  }
`;
