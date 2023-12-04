# Fele Fashions
Server side logic for fele fashions

## Table of Contents

1. [Installation](#installation)
2. [Documentation and Testing](#documentation-and-testing)
3. [Usage](#usage)
   - [Development](#usage-for-development)
   - [Production](#usage-for-production)
4. [How to Use PDF Slice Master](#how-to-use-pdf-slice-master)
4. [Key Features](#key-features)
5. [Error Handling](#error-handling)
6. [APIs](#apis)
7. [Detailed API Documentation](#detailed-api-documentation)
8. [Database Schema](#database-schema)
9. [Architecture and Technologies](#architecture-and-technologies)
10. [Tools and Stack](#tools-and-stack)
11. [Contact](#contact)


## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/abinth11/Fele-Fashions.git 
   ```

2. Navigate to the project directory:

   ```shell
   cd Fele-Fashions
   ```

3. Install the dependencies using your preferred package manager in both the server and client directories:

   ```shell
    yarn install  # or npm install
   ```

4. Set up the required environment variables by renaming the `.env.example` file to `.env` and providing the necessary values for your environment.

## Documentation and Testing

Explore the Swagger documentation at [http://localhost:4000/docs](http://localhost:4000/docs) after starting the server. You can also access a JSON version of the documentation at [http://localhost:4000/docs.json](http://localhost:4000/docs.json).

## Usage for Development

1. Start the development server:

   ```shell
   yarn run dev  # or npm run dev
   ```

2. Access the server at [http://localhost:4000](http://localhost:4000).

3. Explore the Swagger documentation at [http://localhost:4000/docs](http://localhost:4000/docs).


## Usage for Production

1. Build the code for production:

   ```shell
    yarn run build  # or npm run build
   ```

2. Start the production server:

   ```shell
    yarn run start  # or npm run start
   ```

3. Access the server at [http://localhost:4000](http://localhost:4000).

4. Explore the Swagger documentation at [http://localhost:4000/docs](http://localhost:4000/docs).



## How to Use Fele-Fashions

Here's a step-by-step guide on how to use the api's:

1. Start the server as mentioned above
2. Access the api's with swagger docs at [http://localhost:4000/docs](http://localhost:4000/docs)
3. Provide the api key to access the api's 

   ```shell
    abcd-efgh-ijlk-1234
   ```


## Key Features

- Add Category.
- Fetch available categories.
- Add products.
- List products based on category.

## Error Handling

### AppError Class

A custom `AppError` class is used for error handling:

```javascript
class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    keyValue: any;
    constructor(message: string, statusCode: HttpStatusCodes) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
}
```

### Error Handling Middleware

The error handling middleware catches errors and sends appropriate error messages with their status code, reducing the need for extensive try-catch blocks:

```javascript
const errorHandlingMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (err.statusCode === 404) {
    res.status(err.statusCode).json({ errors: err.status, errorMessage: err.message });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};
```

## Detailed API Documentation 

For detailed documentation on available API endpoints and their usage, please refer to the [API Documentation](https://documenter.getpostman.com/view/23308654/2s9YeLWorE).

## Database Schema

### Category Schema

```javascript
export interface ICategory{
    categoryId:string,
    categoryName:string,
}
```
Explanation:

- `categoryId`: unique identifier for the category.
- `categoryName`: Name of the category.

### Product Schema

```javascript
 export interface IProduct{
    productId:string;
    productName: string;
    price: number
    productImage: string
    brand: string,
    categoryId: string
}
```

Explanation:

- `productId`: Unique identifier of the product
- `productName`: Name of the product
- `price`: product price
- `productImage`: Product image url
- `brand`: brand of the product
- `categoryId`: category id where the product belongs to 

## Architecture and Technologies

The project follows a clean architecture and utilizes the following technologies:

- Node.js
- Express.js
- Dynamodb
- TypeScript
- Redis for caching

## Tools and Stack

### Framework (Express.js)

Express.js is a fast, minimalist, and flexible Node.js web application framework that simplifies the development of server-side applications, making it ideal for building RESTful APIs, web applications, and microservices.

### Database (DynamoDb)

DynamoDb is a popular NoSQL database known for its flexibility and scalability, making it suitable for a wide range of data types and structures.

### Documentation (Swagger)

Swagger is employed for designing, building, and documenting RESTful APIs, simplifying API development and integration.

### Other Third-Party Libraries

- express-rate-limit: A middleware for rate limiting requests to an Express.js application, which helps protect your server from abuse or malicious attacks by limiting the number of requests a client can make in a specified time frame.

- uuid: A library for generating universally unique identifiers (UUIDs). These are unique 128-bit values often used to identify resources or entities in distributed systems or databases.

- cors: A middleware for enabling Cross-Origin Resource Sharing (CORS) in your Express.js application. It allows you to control which domains or origins can access your server resources, which is essential for web security and integrating with other domains.

- helmet: Helmet is a middleware for securing Express.js applications by setting various HTTP headers related to security. It helps protect against common web vulnerabilities, such as cross-site scripting (XSS) attacks, cross-site request forgery (CSRF) attacks, and other security threats. Helmet makes it easy to configure and enable essential security headers for your Express.js application.

- express-async-handler: express-async-handler is a utility library for handling asynchronous operations in Express.js middleware and route handlers. It simplifies error handling and enables you to write cleaner, more concise code by allowing you to use async/await syntax directly in your Express.js route handlers. This library helps streamline error handling and makes it easier to write asynchronous code in Express.js applications.


## Contact

For any questions, feedback, or inquiries, please reach out to:

- Abin T H
  - Email: abinth250@example.com
  - LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/abin-th-170676245/)

