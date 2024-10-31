Error handling in GraphQL resolvers is essential to provide meaningful feedback to clients when something goes wrong, whether it’s due to validation issues, data not found, or unexpected server errors. Here’s how to implement robust error handling in your resolvers.

### Example Scenario

We will continue with the previous example of a GraphQL server that manages books and authors. This time, we will add error handling to both queries and mutations.

### Step 1: Set Up Apollo Server

Make sure you have Apollo Server and GraphQL set up. If you need the basic setup, here’s a quick reminder:

```bash
npm install apollo-server graphql
```

### Step 2: Define the Schema

Here's our schema, including basic queries and mutations:

```javascript
const { ApolloServer, gql } = require('apollo-server');

// Sample data (simulating a database)
const authors = [
  { id: '1', name: 'George Orwell' },
  { id: '2', name: 'Aldous Huxley' },
];

let books = [
  { id: '1', title: '1984', authorId: '1' },
  { id: '2', title: 'Brave New World', authorId: '2' },
];

// Define the schema
const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: Author
  }

  type Author {
    id: ID!
    name: String!
    books: [Book]
  }

  type Query {
    books: [Book]
    authors: [Author]
    book(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, authorId: ID!): Book
    deleteBook(id: ID!): String
  }
`;
```

### Step 3: Define the Resolvers with Error Handling

Here’s how to add error handling to the resolvers:

```javascript
const resolvers = {
  Query: {
    books: async () => {
      try {
        // Simulating asynchronous fetching
        return books; // In a real scenario, fetch from database
      } catch (error) {
        throw new Error('Failed to fetch books.');
      }
    },
    authors: async () => {
      try {
        return authors; // In a real scenario, fetch from database
      } catch (error) {
        throw new Error('Failed to fetch authors.');
      }
    },
    book: async (parent, args) => {
      const book = books.find(b => b.id === args.id);
      if (!book) {
        throw new Error(`Book with ID ${args.id} not found.`);
      }
      return book;
    },
  },
  Mutation: {
    addBook: async (parent, args) => {
      const { title, authorId } = args;

      // Validate input
      if (!title || !authorId) {
        throw new Error('Title and Author ID are required.');
      }

      // Check if author exists
      const author = authors.find(a => a.id === authorId);
      if (!author) {
        throw new Error(`Author with ID ${authorId} not found.`);
      }

      const newBook = { id: String(books.length + 1), title, authorId };
      books.push(newBook);
      return newBook;
    },
    deleteBook: async (parent, args) => {
      const index = books.findIndex(b => b.id === args.id);
      if (index === -1) {
        throw new Error(`Book with ID ${args.id} not found.`);
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

### Explanation of Error Handling

1. **Try/Catch Blocks**: 
   - Wrapping asynchronous operations in `try/catch` blocks allows you to catch and handle errors gracefully. If something goes wrong, you can throw a new error with a meaningful message.

2. **Input Validation**:
   - In the `addBook` mutation, we check if the required fields (`title` and `authorId`) are provided. If not, an error is thrown.
   - We also check if the author exists before creating a new book, ensuring data integrity.

3. **Not Found Errors**:
   - The `book` query and `deleteBook` mutation check for the existence of the requested book and throw a `not found` error if it doesn't exist.

### Example Queries and Mutations with Error Handling

You can now test the server and see how it handles errors:

1. **Get a Book that Doesn't Exist**:
   ```graphql
   query {
     book(id: "999") {
       title
     }
   }
   ```
   - This will return an error: `Book with ID 999 not found.`

2. **Add a Book with Missing Fields**:
   ```graphql
   mutation {
     addBook(authorId: "1") {
       title
     }
   }
   ```
   - This will return an error: `Title and Author ID are required.`

3. **Add a Book with a Nonexistent Author**:
   ```graphql
   mutation {
     addBook(title: "New Book", authorId: "999") {
       title
     }
   }
   ```
   - This will return an error: `Author with ID 999 not found.`

### Summary

Error handling in GraphQL resolvers is crucial for providing clear feedback to clients and maintaining data integrity. By using `try/catch` blocks, validating inputs, and checking for the existence of resources, you can create a robust API that gracefully handles errors and informs clients of what went wrong. This enhances the overall user experience and reliability of your GraphQL server.