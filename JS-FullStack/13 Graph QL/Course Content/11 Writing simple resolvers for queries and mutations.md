Sure! Below is an example of a simple GraphQL server using Apollo Server with basic resolvers for both queries and mutations. This example includes a list of books and allows you to query the books and add new ones via mutations.

### Step-by-Step Example

1. **Set Up Apollo Server**: Ensure you have Apollo Server and GraphQL installed. If you haven't set it up yet, you can run:

   ```bash
   npm install apollo-server graphql
   ```

2. **Create the Server**:

Here's the complete code:

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

### Explanation:

1. **Schema Definition (`typeDefs`)**:
   - **Book Type**: Defines the structure of a book with `id`, `title`, and `author`.
   - **Queries**: 
     - `books`: Returns a list of all books.
     - `book(id: ID!)`: Returns a specific book by its ID.
   - **Mutations**:
     - `addBook(title: String!, author: String!)`: Adds a new book and returns it.
     - `deleteBook(id: ID!)`: Deletes a book by its ID and returns a success message.

2. **Resolvers**:
   - **Query Resolvers**:
     - `books`: Returns the entire books array.
     - `book`: Finds and returns a specific book by its ID using the provided `args`.
   - **Mutation Resolvers**:
     - `addBook`: Creates a new book object, pushes it to the `books` array, and returns the new book.
     - `deleteBook`: Finds the book by ID, removes it from the array, and returns a success message. If the book is not found, it throws an error.

3. **Starting the Server**: The server listens for incoming requests and logs the URL to access the GraphQL playground.

### Testing the API

Once your server is running, you can use a tool like the GraphQL Playground (available at the URL printed in your console) to test your queries and mutations.

**Example Queries**:

1. To get all books:
   ```graphql
   query {
     books {
       id
       title
       author
     }
   }
   ```

2. To get a specific book:
   ```graphql
   query {
     book(id: "1") {
       title
       author
     }
   }
   ```

**Example Mutations**:

1. To add a new book:
   ```graphql
   mutation {
     addBook(title: "Fahrenheit 451", author: "Ray Bradbury") {
       id
       title
       author
     }
   }
   ```

2. To delete a book:
   ```graphql
   mutation {
     deleteBook(id: "1")
   }
   ```

This setup provides a straightforward way to implement resolvers for queries and mutations in a GraphQL server. You can expand upon this by adding more fields, types, and advanced features as needed!