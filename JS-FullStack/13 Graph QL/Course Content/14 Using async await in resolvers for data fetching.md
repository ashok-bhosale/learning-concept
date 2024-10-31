Using `async/await` in GraphQL resolvers is a common practice when fetching data, especially when dealing with asynchronous operations like database calls or REST API requests. This makes your code cleaner and easier to read compared to traditional promise handling.

### Example Scenario

Let’s build a more comprehensive example that simulates fetching data from a database or an external API using `async/await`. We'll create a simple GraphQL server that allows you to query books and authors with asynchronous data fetching.

### Step 1: Set Up Apollo Server

First, make sure you have Apollo Server and GraphQL installed if you haven’t done so yet:

```bash
npm install apollo-server graphql
```

### Step 2: Define the Schema

Here’s a sample schema with `Book` and `Author` types, along with queries to get books and authors:

```javascript
const { ApolloServer, gql } = require('apollo-server');

// Sample data (simulating a database)
const authors = [
  { id: '1', name: 'George Orwell' },
  { id: '2', name: 'Aldous Huxley' },
];

const books = [
  { id: '1', title: '1984', authorId: '1' },
  { id: '2', title: 'Brave New World', authorId: '2' },
  { id: '3', title: 'Animal Farm', authorId: '1' },
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
  }
`;
```

### Step 3: Define the Resolvers with Async/Await

Now, let's create resolvers using `async/await`. We'll simulate data fetching with asynchronous functions.

```javascript
const resolvers = {
  Query: {
    // Simulating asynchronous fetching for books
    books: async () => {
      // Simulate a delay (like a database call)
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(books);
        }, 100); // Simulate 100ms delay
      });
    },
    // Simulating asynchronous fetching for authors
    authors: async () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(authors);
        }, 100);
      });
    },
  },
  Book: {
    // Fetching the author for each book asynchronously
    author: async (book) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(authors.find(author => author.id === book.authorId));
        }, 50);
      });
    },
  },
  Author: {
    // Fetching books for each author asynchronously
    books: async (author) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(books.filter(book => book.authorId === author.id));
        }, 50);
      });
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

### Explanation of Async/Await Usage

1. **Query Resolvers**:
   - The `books` and `authors` resolvers return a promise that simulates an asynchronous operation. Here, we use `setTimeout` to mimic a delay as if we were querying a database or an external API.

2. **Nested Resolvers**:
   - The `author` resolver in the `Book` type uses async behavior to fetch the author associated with the book. Similarly, the `books` resolver in the `Author` type fetches all books for that author.

### Example Queries

Once your server is running, you can execute the following queries:

1. **Get All Books with Authors**:
   ```graphql
   query {
     books {
       id
       title
       author {
         name
       }
     }
   }
   ```

2. **Get All Authors with Their Books**:
   ```graphql
   query {
     authors {
       id
       name
       books {
         title
       }
     }
   }
   ```

### Summary

Using `async/await` in GraphQL resolvers makes your code cleaner and easier to manage when dealing with asynchronous data fetching. It allows you to handle promises in a more straightforward manner, improving readability and reducing the complexity often associated with callback-based code. This approach is particularly useful in real-world applications where you need to fetch data from databases or external APIs.