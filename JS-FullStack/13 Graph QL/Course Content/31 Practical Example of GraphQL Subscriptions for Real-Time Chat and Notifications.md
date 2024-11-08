### **Practical Example of GraphQL Subscriptions for Real-Time Chat and Notifications**

Let's build a real-time chat application and a notification system using GraphQL subscriptions and WebSockets.

This will involve two main components:
1. **Real-Time Chat**: Users can send and receive messages in real-time.
2. **Real-Time Notifications**: Users will get notifications whenever a new message is posted or a specific event happens.

We will use the following tools:
- **Apollo Server** (for the backend).
- **Apollo Client** (for the frontend).
- **GraphQL WebSocket** for real-time communication.

### **Step 1: Set Up the Server with GraphQL Subscriptions**

#### **1.1 Install Dependencies**

Install the necessary server dependencies:

```bash
npm install apollo-server graphql graphql-ws graphql-subscriptions
```

- **`apollo-server`**: Apollo Server for GraphQL.
- **`graphql`**: The core GraphQL library.
- **`graphql-ws`**: WebSocket implementation for GraphQL subscriptions.
- **`graphql-subscriptions`**: PubSub for managing events in GraphQL subscriptions.

#### **1.2 Create the Apollo Server**

Here’s how to set up an Apollo Server with WebSocket support for subscriptions. We will create a basic chat system where users can send and receive messages in real-time.

```javascript
// server.js
const { ApolloServer, gql } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');
const { createServer } = require('http');
const WebSocket = require('ws');
const { useServer } = require('graphql-ws');

// Create PubSub instance to publish and subscribe to events
const pubsub = new PubSub();

// Sample in-memory data
let messages = [];

// Define the GraphQL schema
const typeDefs = gql`
  type Message {
    id: ID!
    content: String!
    user: String!
    createdAt: String!
  }

  type Subscription {
    messageSent: Message
  }

  type Mutation {
    sendMessage(content: String!, user: String!): Message
  }

  type Query {
    messages: [Message]
  }
`;

// Define resolvers for queries, mutations, and subscriptions
const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    sendMessage: (parent, { content, user }) => {
      const message = {
        id: String(messages.length + 1),
        content,
        user,
        createdAt: new Date().toISOString(),
      };
      messages.push(message);
      // Publish a new message event
      pubsub.publish('MESSAGE_SENT', { messageSent: message });
      return message;
    },
  },
  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterator('MESSAGE_SENT'),
    },
  },
};

// Create an ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: '/subscriptions', // WebSocket endpoint for subscriptions
  },
});

// Set up the HTTP server for Apollo Server
const httpServer = createServer(server);

// Set up WebSocket server for GraphQL subscriptions
const wsServer = new WebSocket.Server({
  server: httpServer,
  path: '/subscriptions',
});

useServer(
  {
    schema: server.schema,
    execute: server.executeOperation,
    subscribe: server.executeOperation,
  },
  wsServer
);

// Start the HTTP server
httpServer.listen(4000, () => {
  console.log(`Server running at http://localhost:4000`);
});
```

#### **Explanation of the Backend Code**:
- **GraphQL Schema**: 
  - `Message`: Represents a message object.
  - `Subscription`: Defines the `messageSent` subscription, which will notify clients when a new message is sent.
  - `Mutation`: The `sendMessage` mutation allows clients to send messages.
  - `Query`: The `messages` query retrieves the list of messages.

- **PubSub**: The `PubSub` instance is used to manage real-time events. When a message is sent, we publish the `MESSAGE_SENT` event, which triggers the subscription for all connected clients.
  
- **WebSocket Server**: We use `graphql-ws` to handle the WebSocket connection for GraphQL subscriptions.

### **Step 2: Set Up Apollo Client to Handle Subscriptions**

#### **2.1 Install Client Dependencies**

To connect the client to the server, we need the following dependencies:

```bash
npm install @apollo/client graphql-ws react react-dom
```

- **`@apollo/client`**: Apollo Client for interacting with GraphQL.
- **`graphql-ws`**: WebSocket client for GraphQL subscriptions.
- **`react` and `react-dom`**: React for building the UI.

#### **2.2 Create the Frontend with Real-Time Chat**

Now we will create a simple React app to display messages in real-time and send new ones.

```javascript
// App.js
import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { createClient } from 'graphql-ws';
import './App.css';

// Create a WebSocket client for subscriptions
const wsClient = createClient({
  url: 'ws://localhost:4000/subscriptions', // WebSocket URL
});

// Apollo Client setup
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: wsClient,
});

// Define the GraphQL queries and subscriptions
const MESSAGE_SENT_SUBSCRIPTION = gql`
  subscription onMessageSent {
    messageSent {
      id
      content
      user
      createdAt
    }
  `;

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($content: String!, $user: String!) {
    sendMessage(content: $content, user: $user) {
      id
      content
      user
      createdAt
    }
  }
`;

function App() {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [user, setUser] = useState('User');

  // Subscribe to the messageSent event
  useEffect(() => {
    const unsubscribe = wsClient.subscribe(
      { query: MESSAGE_SENT_SUBSCRIPTION },
      {
        next: ({ data }) => {
          setMessages((prevMessages) => [...prevMessages, data.messageSent]);
        },
        error: (err) => console.error('Subscription error', err),
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Send a new message via mutation
  const sendMessage = async () => {
    if (messageContent.trim() === '') return;

    const response = await client.mutate({
      mutation: SEND_MESSAGE_MUTATION,
      variables: { content: messageContent, user },
    });

    // Clear the message input
    setMessageContent('');
  };

  return (
    <div className="App">
      <h1>Real-Time Chat</h1>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <strong>{message.user}:</strong> {message.content}
            <br />
            <small>{new Date(message.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

// Wrap the App with ApolloProvider
export default function WrappedApp() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}
```

#### **Explanation of the Frontend Code**:
- **Apollo Client**: We use Apollo Client to manage GraphQL operations (queries, mutations, and subscriptions).
- **WebSocket Client**: We create a WebSocket client (`graphql-ws`) to handle real-time subscriptions.
- **Subscriptions**: The `MESSAGE_SENT_SUBSCRIPTION` subscribes to real-time messages, so whenever a new message is sent, the client automatically updates the UI.
- **Sending Messages**: The `sendMessage` function uses the `SEND_MESSAGE_MUTATION` to send new messages to the server, which then triggers the `messageSent` subscription.

### **Step 3: Testing the Real-Time Chat Application**

1. **Start the Server**: Run the Apollo Server.

```bash
node server.js
```

2. **Start the Frontend**: Run the React frontend.

```bash
npm start
```

3. **Use the Chat**: Open the app in a browser. Type messages into the input and click **Send**. New messages will appear in real-time as soon as they are sent, and other clients connected to the WebSocket will also see the messages as they are published by the server.

---

### **Step 4: Expanding to Notifications**

You can also use the same subscription mechanism to implement notifications. For example, when a new message is sent, you could trigger a notification to all online users:

1. **Define a Notification Subscription**:

```graphql
type Subscription {
  messageSent: Message
  notificationReceived: String
}
```

2. **Trigger Notifications in the Mutation**:

Modify the mutation resolver to send notifications:

```javascript
const resolvers = {
  Mutation: {
    sendMessage: (parent, { content, user }) => {
      const message = {
        id: String(messages.length + 1),
       

 content,
        user,
        createdAt: new Date().toISOString(),
      };
      messages.push(message);

      // Publish the message to the subscriptions
      pubsub.publish('MESSAGE_SENT', { messageSent: message });

      // Send notification to all users
      pubsub.publish('NOTIFICATION_RECEIVED', { notificationReceived: `New message from ${user}` });

      return message;
    },
  },
  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterator('MESSAGE_SENT'),
    },
    notificationReceived: {
      subscribe: () => pubsub.asyncIterator('NOTIFICATION_RECEIVED'),
    },
  },
};
```

3. **Client Side Notifications**:
   - Subscribe to `notificationReceived` and display real-time notifications to users.

With this setup, you can create a real-time notification system, sending messages to the client immediately when new messages are created.

---

### **Conclusion**

By using **GraphQL Subscriptions** over **WebSockets**, we can easily build real-time features like chat and notifications. The server pushes updates to the client as soon as events occur, and the client receives these updates in real-time without having to manually poll the server.