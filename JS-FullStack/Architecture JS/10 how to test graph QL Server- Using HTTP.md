To test your updated GraphQL server using **Postman**, follow these steps:

---

### 1. **Start Your GraphQL Server**
Ensure your server is running by executing the following command:
```bash
node index.js
```
Check the console output to confirm:
```
SYS API (GraphQL) running on http://localhost:3002/graphql
```

---

### 2. **Set Up Postman for GraphQL**
1. Open **Postman**.
2. Create a new request:
   - Click **"New"** > **"Request"**.
   - Select the **POST** method.
3. Enter the GraphQL endpoint:
   ```
   http://localhost:3002/graphql
   ```

---

### 3. **Write Your GraphQL Query**
In Postman:
1. Switch to the **"Body"** tab.
2. Select **raw** and set the type to **JSON**.
3. Write your GraphQL query in the following format:
   ```json
   {
     "query": "query { getItems { id name description } }"
   }
   ```

Example:
- This query fetches all items from your `getItems` resolver.

---

### 4. **Send the Request**
1. Click **Send**.
2. If everything is set up correctly, you should see a response similar to:
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

### 5. **Debugging Common Issues**
- **Server not running**: Ensure the GraphQL server is running on `http://localhost:3002/graphql`.
- **CORS issues**: If you encounter CORS errors, ensure `cors` middleware is correctly implemented.
- **Error in query**: Verify your GraphQL query syntax.

---

### Additional Postman Features:
1. **Explore the Schema**:
   - Add `query { __schema { types { name } } }` in the request body to introspect the schema.
   
2. **Test Invalid Queries**:
   - Try sending an invalid query, e.g., `query { invalidField }`, to see error responses.

Using these steps, you can efficiently test and debug your GraphQL server using Postman!