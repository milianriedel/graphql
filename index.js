const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Define your schema
const typeDefs = gql`
  type Query {
    hello: String
    jobs: JobQueryResponse
    job(id: ID!): Job
  }

  type JobQueryResponse {
    data: [Job]
  }

  type Job {
    id: ID
    attributes: JobAttributes
  }

  type JobAttributes {
    name: String
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
    jobs: () => ({
      data: [
        { id: "61", attributes: { name: "Učitel dějepisu" } },
        { id: "63", attributes: { name: "asdasd" } },
        { id: "62", attributes: { name: "asd" } },
        { id: "64", attributes: { name: "asdasd" } },
        { id: "60", attributes: { name: "Učitel matematiky" } }
      ]
    }),
    job: (_, { id }) => {
      const jobsData = [
        { id: "61", attributes: { name: "Učitel dějepisu" } },
        { id: "63", attributes: { name: "asdasd" } },
        { id: "62", attributes: { name: "asd" } },
        { id: "64", attributes: { name: "asdasd" } },
        { id: "60", attributes: { name: "Učitel matematiky" } }
      ];

      const job = jobsData.find(job => job.id === id);
      return job ? job : null;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Context setup omitted for brevity
  }
});

const app = express();

server.start().then(res => {
  server.applyMiddleware({ app, path: '/graphql' });

  const port = process.env.PORT || 4000;
  app.listen(port, () => 
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
});
