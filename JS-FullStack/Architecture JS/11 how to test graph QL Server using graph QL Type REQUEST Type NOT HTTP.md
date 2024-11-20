To test your GraphQL server with **Postman** specifically using the GraphQL request type (built-in feature), follow these steps:

---

### 1. **Start Your Server**
Make sure your GraphQL server is running and accessible at:
```plaintext
http://localhost:3002/graphql
```

---

### 2. **Create a GraphQL Request in Postman**
1. Open **Postman**.
2. Click **"New"** > **"Request"**.
3. In the dropdown for request types (e.g., GET, POST), select **GraphQL**.

---

### 3. **Enter the GraphQL Endpoint**
1. In the request URL, type the endpoint:
   ```plaintext
   http://localhost:3002/graphql
   ```

---

### 4. **Write Your GraphQL Query**
1. In the **GraphQL tab** below the URL, you'll find two sections: **Query** and **Variables**.
2. Write your GraphQL query in the **Query** field. For example:
   ```graphql
   query {
     getItems {
       id
       name
       description
     }
   }
   ```

   **Example Query Explanation**:
   - Fetches the `id`, `name`, and `description` fields from the `getItems` resolver.

---

### 5. **Add Optional Variables (if needed)**
If your query uses variables, you can define them in the **Variables** section in JSON format. For example:
- Query:
  ```graphql
  query GetItemById($id: ID!) {
    getItemById(id: $id) {
      id
      name
      description
    }
  }
  ```
- Variables:
  ```json
  {
    "id": "1"
  }
  ```

---

### 6. **Send the Request**
1. Click **Send**.
2. If your server is correctly configured, you'll receive a response similar to:
   ```json
   {
     "data": {
       "getItems": [
         {
           "id": "1",
           "name": "Item 1",
           "description": "Description for Item 1"
         },
         {
           "id": "2",
           "name": "Item 2",
           "description": "Description for Item 2"
         }
       ]
     }
   }
   ```

---

### 7. **Handle Authentication (Optional)**
If your GraphQL server uses authentication (e.g., JWT, API Key):
1. Go to the **Headers** tab in Postman.
2. Add a header field for authentication:
   - Example: `Authorization: Bearer <your_token>`

---

### Benefits of Using GraphQL Request Type:
- **Syntax Highlighting:** Postman provides syntax highlighting for GraphQL queries.
- **Schema Introspection:** Postman can introspect your schema, allowing you to auto-complete field names.
- **Variable Management:** Easily pass variables for dynamic queries.

---

### Example Queries for Testing:
1. **Simple Query**:
   ```graphql
   query {
     getItems {
       id
       name
       description
     }
   }
   ```

2. **Query with Variables**:
   ```graphql
   query GetItemById($id: ID!) {
     getItemById(id: $id) {
       id
       name
       description
     }
   }
   ```
   **Variables**:
   ```json
   {
     "id": "1"
   }
   ```

3. **Introspect Schema**:
   ```graphql
   query {
     __schema {
       types {
         name
       }
     }
   }
   ```

Using these steps, you can efficiently perform GraphQL-specific testing in Postman!