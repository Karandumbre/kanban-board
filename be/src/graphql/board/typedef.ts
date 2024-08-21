export const typeDefs = `#graphql
  # Board Type
  type Board {
    id: ID!
    name: String!
    columns: [Column!]!
    createdAt: String!
    updatedAt: String!
  }

  # Column Type
  type Column {
    id: ID!
    name: String!
    boardId: ID!
    tasks: [Task!]!
    createdAt: String!
    updatedAt: String!
  }

  # Task Type
  type Task {
    id: ID!
    title: String!
    columnId: ID!
    subtasks: [Subtask!]!
    createdAt: String!
    updatedAt: String!
  }

  # Subtask Type
  type Subtask {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
