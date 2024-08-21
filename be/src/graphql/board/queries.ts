export const queries = `#graphql
    getBoards: [Board!]!
    getBoard(id: ID!): Board
    getColumns(boardId: ID!): [Column!]!
    getColumn(id: ID!): Column
    getTasks(columnId: ID!): [Task!]!
    getTask(id: ID!): Task
    getSubtasks(taskId: ID!): [Subtask!]!
    getSubtask(id: ID!): Subtask
`;
