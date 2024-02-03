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

// Create an instance of ApolloServer with context setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Extract the Authorization header from the request
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1]; // Assuming "Bearer TOKEN"

    // You can then add your logic to validate the token
    // For example, a simple hardcoded check:
    const isValidToken = token === "57ae9a2bab31d328cbe7fbc15582caf6631a7b172f86f15424953dc1b34a5e1eceacb1634144714e6fd417b62601141a575ab87a9873cb84bae88e3815c71c8fde7e402fb23c70ba960909a107f440a30a778fcb3a657739b72a2a9deccc9b2d28d1249831c8e2a7e39c5ac430d2683213c0b62c54ec354c66cb2bfdeed09c1c";

    if (!isValidToken) {
      // If the token is not valid, throw an error or return null based on your API design
      throw new Error('Unauthorized');
    }

    // If the token is valid, or you want to allow the request with certain conditions,
    // you can return a context object here that will be accessible in all resolvers
    return { user: { id: '123', name: 'John Doe' } }; // Example context
  }
});

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
