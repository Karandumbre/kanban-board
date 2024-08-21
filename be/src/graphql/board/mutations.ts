export const mutations = `#graphql
    createBoard(name: String!): Board!
    updateBoard(id: ID!, name: String!): Board!
    deleteBoard(id: ID!): Boolean!

    # Column Mutations
    createColumn(name: String!, boardId: ID!): Column!
    updateColumn(id: ID!, name: String!): Column!
    deleteColumn(id: ID!): Boolean!

    # Task Mutations
    createTask(title: String!, columnId: ID!): Task!
    updateTask(id: ID!, title: String!): Task!
    deleteTask(id: ID!): Boolean!

    # Subtask Mutations
    createSubtask(title: String!, taskId: ID!): Subtask!
    updateSubtask(id: ID!, title: String, completed: Boolean): Subtask!
    deleteSubtask(id: ID!): Boolean!
`;
