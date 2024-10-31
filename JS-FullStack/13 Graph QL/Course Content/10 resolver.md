In GraphQL, **resolvers** are functions responsible for fetching the data for a specific field in your schema. When a query is made, the GraphQL server uses resolvers to populate the fields in the returned data structure.

### Key Points about Resolvers:

1. **Function Mapping**: Each field in a GraphQL schema can have its own resolver function. The resolver maps the field to its corresponding data source (like a database, an API, etc.).

2. **Arguments**: Resolvers can accept arguments. For example, if you have a field that requires an ID to fetch a specific resource, the resolver will use that ID to query the data.

3. **Parent Object**: Resolvers receive a `parent` argument (sometimes called `root`), which is the result of the previous resolver in the chain. This allows for nested queries, where the resolver for a child field can access the data from the parent field.

4. **Context**: Resolvers can also receive a `context` argument, which is an object shared across all resolvers for a particular operation. This is often used to store authentication information or database connections.

5. **Return Value**: A resolver typically returns a value (or a promise that resolves to a value) that matches the type defined in the schema. If a field is expected to return a list, the resolver should return an array.

### Example:

Here’s a simple example of how resolvers work in a GraphQL server:

```javascript
const { ApolloServer, gql } = require('apollo-server');

// Sample data
const books = [
  { title: '1984', authorId: 1 },
  { title: 'Brave New World', authorId: 2 },
];

const authors = [
  { id: 1, name: 'George Orwell' },
  { id: 2, name: 'Aldous Huxley' },
];

// Define the schema
const typeDefs = gql`
  type Book {
    title: String
    author: Author
  }

  type Author {
    id: ID
    name: String
  }

  type Query {
    books: [Book]
    authors: [Author]
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
  },
  Book: {
    author: (book) => authors.find(author => author.id === book.authorId),
  },
};

// Create the server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

### In this example:

- The `Query` type has two fields: `books` and `authors`, each with its own resolver that returns a list of books and authors, respectively.
- The `Book` type has a field `author`, which has a resolver that finds the author for each book based on `authorId`.

### Conclusion:

Resolvers are a fundamental part of how data is retrieved in a GraphQL application, allowing for flexibility and modularity in your API design. They enable you to control how your API fetches and returns data, making it easier to adapt to various data sources and requirements.