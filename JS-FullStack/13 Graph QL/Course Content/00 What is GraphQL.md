GraphQL is a **query language for APIs** and a **runtime** for executing those queries. It was developed by Facebook in 2012 and released as an open-source project in 2015. 

Here are some key points about GraphQL:

1. **Declarative Data Fetching**: Unlike REST, where the structure of the response is determined by the server, GraphQL allows clients to specify exactly what data they need. This reduces over-fetching or under-fetching of data.

2. **Single Endpoint**: GraphQL operates on a single endpoint rather than multiple endpoints like REST. All operations (queries, mutations, and subscriptions) are performed via this one endpoint.

3. **Strongly Typed Schema**: GraphQL APIs are defined by a schema, which clearly describes the types of data the API can return. This schema acts as a contract between the client and server.

4. **Operations**: 
   - **Queries**: For fetching data.
   - **Mutations**: For modifying data (create, update, delete).
   - **Subscriptions**: For real-time data updates via WebSockets.

5. **Hierarchical Nature**: GraphQL queries mimic the shape of the response, making it easy to visualize the structure of the data.

6. **Tooling**: GraphQL comes with powerful tools like **GraphiQL** or **GraphQL Playground**, which allow developers to interact with the API, inspect the schema, and test queries in real-time.

### Example of GraphQL vs REST:
- **REST API**:
   - `/api/users/123`
   - `/api/users/123/posts`

- **GraphQL Query**:
   ```graphql
   {
     user(id: 123) {
       name
       posts {
         title
       }
     }
   }
   ```
In the GraphQL query, both the user details and their posts are fetched in a single request, while REST would require multiple endpoints.

### Benefits of GraphQL:
- **Efficient Data Fetching**: Clients can request exactly what they need, which optimizes network usage.
- **Single Endpoint**: Simplifies API structure and reduces complexity.
- **Self-documenting**: The schema is introspectable, meaning clients can discover what data is available.
- **Real-time Capabilities**: With subscriptions, you can easily implement real-time updates.

GraphQL is widely adopted for building modern, flexible, and efficient APIs, especially in applications requiring rich and dynamic data interactions.