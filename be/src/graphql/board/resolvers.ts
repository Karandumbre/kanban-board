import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    // Board Queries
    getBoards: async () => {
      return await prisma.board.findMany({
        include: {
          columns: {
            include: {
              tasks: {
                include: {
                  subtasks: true,
                },
              },
            },
          },
        },
      });
    },
    getBoard: async (_: any, { id }: { id: string }) => {
      return await prisma.board.findUnique({
        where: { id: parseInt(id) },
        include: {
          columns: {
            include: {
              tasks: {
                include: {
                  subtasks: true,
                },
              },
            },
          },
        },
      });
    },

    // Column Queries
    getColumns: async (_: any, { boardId }: { boardId: string }) => {
      return await prisma.column.findMany({
        where: { boardId: parseInt(boardId) },
        include: {
          tasks: {
            include: {
              subtasks: true,
            },
          },
        },
      });
    },
    getColumn: async (_: any, { id }: { id: string }) => {
      return await prisma.column.findUnique({
        where: { id: parseInt(id) },
        include: {
          tasks: {
            include: {
              subtasks: true,
            },
          },
        },
      });
    },

    // Task Queries
    getTasks: async (_: any, { columnId }: { columnId: string }) => {
      return await prisma.task.findMany({
        include: {
          subtasks: true,
        },
      });
    },
    getTask: async (_: any, { id }: { id: string }) => {
      return await prisma.task.findUnique({
        where: { id: parseInt(id) },
        include: {
          subtasks: true,
        },
      });
    },

    // Subtask Queries
    getSubtasks: async (_: any, { taskId }: { taskId: string }) => {
      return await prisma.subtask.findMany({
        where: { taskId: parseInt(taskId) },
      });
    },
    getSubtask: async (_: any, { id }: { id: string }) => {
      return await prisma.subtask.findUnique({
        where: { id: parseInt(id) },
      });
    },
  },

  Mutation: {
    // Board Mutations
    createBoard: async (_: any, { name }: { name: string }) => {
      return await prisma.board.create({
        data: { name },
      });
    },
    updateBoard: async (_: any, { id, name }: { id: string; name: string }) => {
      return await prisma.board.update({
        where: { id: parseInt(id) },
        data: { name },
      });
    },
    deleteBoard: async (_: any, { id }: { id: string }) => {
      await prisma.board.delete({
        where: { id: parseInt(id) },
      });
      return true;
    },

    // Column Mutations
    createColumn: async (
      _: any,
      { name, boardId }: { name: string; boardId: string }
    ) => {
      return await prisma.column.create({
        data: {
          name,
          board: {
            connect: { id: parseInt(boardId) },
          },
        },
      });
    },
    updateColumn: async (
      _: any,
      { id, name }: { id: string; name: string }
    ) => {
      return await prisma.column.update({
        where: { id: parseInt(id) },
        data: { name },
      });
    },
    deleteColumn: async (_: any, { id }: { id: string }) => {
      await prisma.column.delete({
        where: { id: parseInt(id) },
      });
      return true;
    },

    // Task Mutations
    createTask: async (
      _: any,
      { title, columnId }: { title: string; columnId: string }
    ) => {
      return await prisma.task.create({
        data: {
          title,
          column: {
            connect: { id: parseInt(columnId) },
          },
        },
      });
    },
    updateTask: async (
      _: any,
      { id, title }: { id: string; title: string }
    ) => {
      return await prisma.task.update({
        where: { id: parseInt(id) },
        data: { title },
      });
    },
    deleteTask: async (_: any, { id }: { id: string }) => {
      await prisma.task.delete({
        where: { id: parseInt(id) },
      });
      return true;
    },

    // Subtask Mutations
    createSubtask: async (
      _: any,
      { title, taskId }: { title: string; taskId: string }
    ) => {
      return await prisma.subtask.create({
        data: {
          title,
          task: {
            connect: { id: parseInt(taskId) },
          },
        },
      });
    },
    updateSubtask: async (
      _: any,
      {
        id,
        title,
        completed,
      }: { id: string; title?: string; completed?: boolean }
    ) => {
      const updateData: any = {};
      if (title !== undefined) updateData.title = title;
      if (completed !== undefined) updateData.completed = completed;

      return await prisma.subtask.update({
        where: { id: parseInt(id) },
        data: updateData,
      });
    },
    deleteSubtask: async (_: any, { id }: { id: string }) => {
      await prisma.subtask.delete({
        where: { id: parseInt(id) },
      });
      return true;
    },
  },

  // Field Resolvers
  Board: {
    columns: async (parent: any) => {
      return await prisma.column.findMany({
        where: { boardId: parent.id },
        include: {
          tasks: {
            include: {
              subtasks: true,
            },
          },
        },
      });
    },
  },
  Column: {
    tasks: async (parent: any) => {
      return await prisma.task.findMany({
        where: { columnId: parent.id },
        include: {
          subtasks: true,
        },
      });
    },
  },
  Task: {
    column: async (parent: any) => {
      return await prisma.column.findUnique({
        where: { id: parent.columnId },
      });
    },
    subtasks: async (parent: any) => {
      return await prisma.subtask.findMany({
        where: { taskId: parent.id },
      });
    },
  },
};
