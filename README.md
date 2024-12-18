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
- PUT Request to update via customer by ID
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
- DELETE Request to delete via customer by ID
  - Method: DELETE
  - URL http://localhost:4000/customers/:id (replace :id with the customer's ID in the database)
  - Auth: Add an authorization header with the Bearer prefix to the request