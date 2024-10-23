
Unit testing is crucial for ensuring the reliability and correctness of your Express.js application. Mocha and Chai are popular libraries for writing and running unit tests in JavaScript applications. Let's see how you can write and run unit tests for Express routes using Mocha and Chai, and how to mock dependencies in tests:

**1. Installation:**

First, install Mocha, Chai, and any other necessary testing dependencies:

```
npm install mocha chai supertest sinon --save-dev
```

- `mocha`: Test framework for running tests.
- `chai`: Assertion library for writing clear and expressive tests.
- `supertest`: Library for making HTTP requests in tests.
- `sinon`: Library for mocking and stubbing functions in tests.

**2. Writing Unit Tests:**

Create a test file for your Express routes. Here's an example test file (`test/routes.test.js`):

```javascript
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../app'); // Your Express app
const { expect } = chai;

chai.use(chaiHttp);

describe('Express routes', () => {
  describe('GET /users', () => {
    it('should return a list of users', async () => {
      // Mocking database call
      const getUsersStub = sinon.stub(db, 'getUsers').resolves([{ id: 1, name: 'John' }]);
      
      // Make request to the route
      const res = await chai.request(app).get('/users');
      
      // Assert response
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(1);
      expect(res.body[0]).to.have.property('name').equal('John');
      
      // Restore the stub
      getUsersStub.restore();
    });
  });
});
```

In this test:
- We use Chai's assertion functions to make assertions about the response from the `/users` route.
- We use Sinon to stub the `getUsers` function from the database layer to return mock data for testing.

**3. Running Tests:**

Add a test script to your `package.json`:

```json
"scripts": {
  "test": "mocha"
}
```

Then, run your tests:

```
npm test
```

**4. Mocking Dependencies:**

To mock dependencies like database calls or external API requests in your tests, you can use Sinon to stub or mock these dependencies. Here's an example of how to stub a database call:

```javascript
const sinon = require('sinon');
const db = require('../db'); // Your database module

describe('Express routes', () => {
  describe('GET /users', () => {
    it('should return a list of users', async () => {
      // Mocking database call
      const getUsersStub = sinon.stub(db, 'getUsers').resolves([{ id: 1, name: 'John' }]);
      
      // Test logic
      
      // Restore the stub
      getUsersStub.restore();
    });
  });
});
```

By writing unit tests for your Express routes and mocking dependencies as needed, you can ensure that your application functions correctly and reliably under different scenarios, reducing the risk of bugs and regressions.