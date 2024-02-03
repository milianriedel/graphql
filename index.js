const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Define your schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Create an instance of express
const app = express();

// Apply the Apollo GraphQL middleware and specify the path
server.start().then(res => {
  server.applyMiddleware({ app, path: '/graphql' });

  // Specify the port
  const port = process.env.PORT || 4000;

  // Start the server
  app.listen(port, () => 
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
});
