In GraphQL, arguments in resolvers are a way to pass additional data to the resolver functions. This allows you to customize how the data is fetched or modified based on input provided by the client. Here’s a breakdown of how arguments work in resolvers, along with examples.

### Structure of Arguments

In a resolver, arguments are typically passed in as an object. This object can include:

1. **Arguments defined in the schema**: These are specified in the GraphQL schema and can be required or optional.
2. **Parent Object**: The result of the previous resolver, which can provide context for the current resolver.
3. **Context**: A shared object throughout the operation, often used for authentication or database connections.

### Example Schema with Arguments

Let’s expand on our previous example, incorporating arguments into our resolvers.

```javascript
const { ApolloServer, gql } = require('apollo-server');

// Sample data
let books = [
  { id: '1', title: '1984', author: 'George Orwell' },
  { id: '2', title: 'Brave New World', author: 'Aldous Huxley' },
];

// Define the schema
const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
    booksByAuthor(author: String!): [Book]
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
    deleteBook(id: ID!): String
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    books: () => books,
    book: (parent, args) => books.find(book => book.id === args.id),
    booksByAuthor: (parent, args) => books.filter(book => book.author === args.author),
  },
  Mutation: {
    addBook: (parent, args) => {
      const newBook = { id: String(books.length + 1), title: args.title, author: args.author };
      books.push(newBook);
      return newBook;
    },
    deleteBook: (parent, args) => {
      const index = books.findIndex(book => book.id === args.id);
      if (index === -1) {
        throw new Error('Book not found');
      }
      books.splice(index, 1);
      return `Book with ID ${args.id} deleted successfully.`;
    },
  },
};

// Create the server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

### Explanation of Arguments

1. **Query Resolvers**:
   - `book(id: ID!)`: This resolver retrieves a book by its ID. The ID is passed in as `args.id`.
   - `booksByAuthor(author: String!)`: This resolver filters the books based on the provided author name. The author's name is accessed via `args.author`.

2. **Mutation Resolvers**:
   - `addBook(title: String!, author: String!)`: This resolver adds a new book. The title and author are accessed via `args.title` and `args.author`.
   - `deleteBook(id: ID!)`: This resolver deletes a book by its ID, accessed via `args.id`.

### Example Queries and Mutations with Arguments

You can use the following queries and mutations to test the resolvers:

1. **Query a Specific Book**:
   ```graphql
   query {
     book(id: "1") {
       title
       author
     }
   }
   ```

2. **Query Books by Author**:
   ```graphql
   query {
     booksByAuthor(author: "George Orwell") {
       title
       author
     }
   }
   ```

3. **Add a New Book**:
   ```graphql
   mutation {
     addBook(title: "Fahrenheit 451", author: "Ray Bradbury") {
       id
       title
       author
     }
   }
   ```

4. **Delete a Book**:
   ```graphql
   mutation {
     deleteBook(id: "1")
   }
   ```

### Summary

Using arguments in resolvers allows you to create flexible and dynamic GraphQL APIs. You can tailor the response based on user input, making your API more powerful and user-friendly. The arguments provide a clear way to customize data fetching and manipulation operations, enhancing the overall functionality of your GraphQL server.