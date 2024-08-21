import { ApolloServer } from "@apollo/server";
import { KanbanBoard } from "./board";

async function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
            ${KanbanBoard.typeDefs}
            type Query {
               ${KanbanBoard.queries}
            }

            type Mutation {
               ${KanbanBoard.mutations}
            }
        `,
    resolvers: {
      Query: {
        ...KanbanBoard.resolvers.Query,
      },
      Mutation: {
        ...KanbanBoard.resolvers.Mutation,
      },
    },
  });

  // Start the gql server
  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;
