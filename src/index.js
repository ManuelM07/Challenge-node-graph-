const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios"); // import axios for requests to api quotes


const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Breaking {
    quote: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    breakingquotes: [Breaking]
  }

  type Mutation {
      addQuote(quote: String!, author: String!): Breaking
    }
`;

const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

  axios.get("https://api.breakingbadquotes.xyz/v1/quotes/10") // Create request
  .then(response => {
    dataQuote = response.data;
  })
  .catch(error => {
    console.log(error);
  });  

const resolvers = {
  Query: {
    books: () => {return books},
    breakingquotes: () => {return dataQuote},
  },
  Mutation: {
    addQuote: (root, args) => {
        const newQuote = {
            quote: args.quote,
            author: args.author
        };
        dataQuote.push(newQuote);
        return newQuote;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});