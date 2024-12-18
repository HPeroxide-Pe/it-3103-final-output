## Installation and Running
1. Clone the project repository
```
git clone https://github.com/HPeroxide-Pe/it-3103-final-output.git
```
2. Go inside the root directory
```
cd it-3103-final-output
```
3. Install all dependencies using Node Package Manager
```
npm install
```
4. Make sure to add your mongoDB connection string into the .env file
```
MONGO_URI="add mongo_uri here"
```
5. Add the secret string for JWT
```
JWT_SECRET = "add secret string here"
```
6. Run the server file in a terminal
```
node server.js
```

## Testing

- How to get an authorization header?
  - Method: POST
  - URL: http://localhost:4000/api/auth/login
  - Body: To register a user, add the "role" attribute. To log in, remove it.
```
{
  "usename": "John Administrator"
  "password": "it'sAdministr8ingTlme"
  "email": "John@adminstration.com"
  "role": "Admin" 
}
```
- Role can either be "Admin", "Customer", "Sales", or "Support"

- After the login, you will be given a JWT for the Authorization header.

Using any API client, send any HTTP Request with these steps

1. Customer 
- POST Request to add a customer
  - Method: POST
  - URL: http://localhost:4000/customers
  - Auth: Add an authorization header with the Bearer prefix to the request
  - Body: The body should be in JSON format 
```
{
  "name": "Hiro",
  "email": "hiro@tanaka.com",
  "number": "0000000000",
  "address": "Tanaka St."
}
```
- You should be able to see a log on the console, as well as see the data reflected in the database.
- GET Request to search for a customer by ID
  - Method: GET
  - URL http://localhost:4000/customers/:id (replace :id with the customer's ID in the database)
  - Auth: Add an authorization header with the Bearer prefix to the request
- PUT Request to update a customer by ID
  - Method: PUT
  - URL http://localhost:4000/customers/:id (replace :id with the customer's ID in the database)
  - Auth: Add an authorization header with the Bearer prefix to the request
  - Body: The body should be in JSON format  
```
{
  "name": "John",
  "email": "john@bloodborne.com",
  "number": "0000000000",
  "address": "Old Yharnam"
}
```
- DELETE Request to delete a customer by ID
  - Method: DELETE
  - URL http://localhost:4000/customers/:id (replace :id with the customer's ID in the database)
  - Auth: Add an authorization header with the Bearer prefix to the request
2. Orders
- POST Request to add an order
  - Method: POST
  - URL: http://localhost:4000/api/orders
  - Auth: Add an authorization header with the Bearer prefix to the request
  - Body: The body should be in JSON format 
```
{
    "customerId": "insert customer id here",
    "products": [
        {
            "productId": "insert product id here",
            "quantity": 2
        },
    ],
    "totalAmount": 150,
}
```
- You should be able to see a log on the console, as well as see the data reflected in the database.
- GET Request to search for an order by ID
  - Method: GET
  - URL http://localhost:4000/api/orders/:id (replace :id with the order's ID in the database)
  - Auth: Add an authorization header with the Bearer prefix to the request
- PUT Request to update an order by ID
  - Method: PUT
  - URL http://localhost:4000/api/orders/:id (replace :id with the order's ID in the database)
  - Auth: Add an authorization header with the Bearer prefix to the request
  - Body: The body should be in JSON format  
```
{
    "customerId": "insert customer id here",
    "products": [
        {
            "productId": "insert product id here",
            "quantity": 8
        },
    ],
    "totalAmount": 25,
}
```
- DELETE Request to delete an order by ID
  - Method: DELETE
  - URL http://localhost:4000/api/orders/:id (replace :id with the order's ID in the database)
  - Auth: Add an authorization header with the Bearer prefix to the request
3. Products
- POST Request to add a Product
  - Method: PUT
  - URL http://localhost:4000/api/products/:id (replace :id with the Product's ID in the database)
  - Auth: Add an authorization header with the Bearer prefix to the request
  - Body: The body should be in JSON format  
```
{
    "name": "Apple iPhone 13",
    "price": 999.99,
    "stock": 100,
    "description": "The latest iPhone model among us."
}
```
- GET Request to search for a Product by ID
  - Method: GET
  - URL http://localhost:4000/api/products/:id (replace :id with the Product's ID in the database)
  - Auth: Add an authorization header with the Bearer prefix to the request
- PUT Request to update a Product by ID
  - Method: PUT
  - URL http://localhost:4000/api/products/:id (replace :id with the Product's ID in the database)
  - Auth: Add an authorization header with the Bearer prefix to the request
  - Body: The body should be in JSON format  
```
{
    "name": "Apple iPhone 13",
    "price": 999.99,
    "stock": 100,
    "description": "The latest iPhone model with advanced features and camera capabilities."
}
```
4. Tickets
- POST Request to add a ticket
  - Method: POST
  - URL: http://localhost:4000/api/tickets
  - Auth: Add an authorization header with the Bearer prefix to the request
  - Body: The body should be in JSON format 
```
{
  "customerId": "insert customer id here",
  "description": "This is a test ticket.",
}
```
- You should be able to see a log on the console, as well as see the data reflected in the database.
- GET Request to search for a ticket by ID
  - Method: GET
  - URL http://localhost:4000/api/tickets/:id (replace :id with the ticket's ID in the database)
  - Auth: Add an authorization header with the Bearer prefix to the request
- PUT Request to update a ticket by ID
  - Method: PUT
  - URL http://localhost:4000/api/tickets/:id (replace :id with the ticket's ID in the database)
  - Auth: Add an authorization header with the Bearer prefix to the request
  - Body: The body should be in JSON format  
```
{
  "customerId": "insert customer id here",
  "description": "This is a test ticket.",
  "status": "Closed",
}
```