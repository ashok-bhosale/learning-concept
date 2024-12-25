Common design patterns are essential tools in software architecture, helping architects and developers solve recurring design problems in a structured and efficient way. Here are some common design patterns, along with scenarios, examples, and use cases:

**1. Singleton Pattern**

_Scenario:_ Managing a Global Configuration Object

_Example:_ In a web application, you have a global configuration object that stores application settings. You want to ensure that there's only one instance of this object to prevent redundant memory consumption and maintain consistency in configuration. The Singleton pattern can be applied to ensure a single, globally accessible instance of the configuration object.

**2. Factory Pattern**

_Scenario:_ Object Creation with Dynamic Types

_Example:_ In a video game, you need to create different types of characters, such as warriors, mages, and archers. The Factory pattern can be used to encapsulate the creation logic for these character types, making it easier to instantiate new characters without exposing the details of the creation process.

**3. Observer Pattern**

_Scenario:_ Event Handling and Notification

_Example:_ In a messaging app, when a user receives a new message, multiple UI elements, such as chat bubbles and notification badges, need to be updated. The Observer pattern can be used to notify and update these UI elements whenever a new message is received without tightly coupling them to the message handling logic.

**4. Builder Pattern**

_Scenario:_ Constructing Complex Objects Step by Step

_Example:_ When creating a complex document in a word processing application, you want to build it incrementally, adding paragraphs, images, and formatting. The Builder pattern allows you to create a builder object that assembles the document piece by piece, resulting in a structured and user-friendly way to create complex objects.

**5. Adapter Pattern**

_Scenario:_ Interoperability between Incompatible Interfaces

_Example:_ You're integrating a new payment gateway into your e-commerce platform, but the gateway's API has a different interface than your existing payment processing code. The Adapter pattern can be used to create an adapter class that translates calls between the two interfaces, ensuring seamless integration.

**6. Decorator Pattern**

_Scenario:_ Adding Functionality to Objects Dynamically

_Example:_ In a graphic design application, you want to allow users to apply various filters and effects to images. The Decorator pattern can be used to attach these filters to images dynamically, enabling users to stack multiple effects on a single image without modifying its original structure.

**7. Strategy Pattern**

_Scenario:_ Dynamic Algorithm Selection

_Example:_ In a weather forecasting system, you need to predict weather conditions based on various algorithms, such as historical data analysis, numerical modeling, and machine learning. The Strategy pattern allows you to encapsulate these algorithms as interchangeable components, making it easy to select and switch between them based on specific criteria or data availability.

**8. Composite Pattern**

_Scenario:_ Treating Individual Objects and Compositions Uniformly

_Example:_ In a file management application, you want to organize files and folders in a tree-like structure. The Composite pattern can be used to treat both individual files and folders as "components," allowing users to interact with them in a consistent way, such as copying, moving, or deleting.

**9. Chain of Responsibility Pattern**

_Scenario:_ Handling Requests through a Chain of Handlers

_Example:_ In a web application, you need to process HTTP requests by passing them through a series of middleware components for authentication, logging, and error handling. The Chain of Responsibility pattern allows you to create a chain of handlers, each responsible for a specific aspect of request processing, and pass the request along the chain until it's handled appropriately.

**10. Proxy Pattern**

_Scenario:_ Controlling Access to Objects

_Example:_ In a virtual private network (VPN) application, you want to control access to network resources by checking user permissions and authentication. The Proxy pattern can be used to create a proxy object that enforces access control, ensuring that users can only access authorized resources.

These design patterns provide architectural solutions to common problems, making software systems more maintainable, flexible, and scalable. Architects and developers use them as building blocks when designing and implementing complex software architectures.